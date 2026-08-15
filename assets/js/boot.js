/* ══════════════════════════════════════════════════════════════════════
   boot.js — the cold-start animation.
   Runs once per browser session, is always skippable, and is bypassed
   entirely for users who asked for reduced motion.
   Loaded last: it hands control to Router.start() when it finishes.
   ══════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  var SESSION_KEY = "rubicon.booted";
  var CHAR_MS = 12;           // per-character typing speed
  var creed = window.AC6_CREED || {};
  var lines = creed.boot || [];

  var bootEl = document.getElementById("boot");
  var logEl = document.getElementById("boot-log");
  var shellEl = document.getElementById("shell");

  var finished = false;
  var timers = [];

  function reducedMotion() {
    return window.matchMedia &&
           window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function alreadyBooted() {
    try { return sessionStorage.getItem(SESSION_KEY) === "1"; }
    catch (e) { return false; }   // private mode / storage disabled
  }

  function markBooted() {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
  }

  function clearTimers() {
    for (var i = 0; i < timers.length; i++) clearTimeout(timers[i]);
    timers = [];
  }

  /* Escape before injecting: boot lines are authored data, but they flow
     through innerHTML to get the per-line colour class. */
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function finish() {
    if (finished) return;
    finished = true;
    clearTimers();
    document.removeEventListener("keydown", onSkip);
    document.removeEventListener("pointerdown", onSkip);
    markBooted();

    bootEl.hidden = true;
    shellEl.hidden = false;
    if (window.Router && window.Router.start) window.Router.start();
    if (window.Terminal && window.Terminal.init) window.Terminal.init();
    startClock();
  }

  function onSkip(e) {
    // Let people use modifier combos (copy, devtools) without nuking the boot.
    if (e.type === "keydown" && (e.ctrlKey || e.metaKey || e.altKey)) return;
    finish();
  }

  /* Types one line, then schedules the next. */
  function typeLine(index) {
    if (finished) return;

    if (index >= lines.length) {
      timers.push(setTimeout(finish, 420));
      return;
    }

    var line = lines[index];
    var text = line.text || "";
    var span = document.createElement("span");
    if (line.cls) span.className = line.cls;
    logEl.appendChild(span);

    var pos = 0;

    function tick() {
      if (finished) return;
      pos++;
      span.innerHTML = esc(text.slice(0, pos)) + '<span class="caret"></span>';

      if (pos < text.length) {
        timers.push(setTimeout(tick, CHAR_MS));
      } else {
        span.innerHTML = esc(text);
        logEl.appendChild(document.createTextNode("\n"));
        timers.push(setTimeout(function () { typeLine(index + 1); },
                               line.pause == null ? 200 : line.pause));
      }
    }

    if (text === "") {
      logEl.appendChild(document.createTextNode("\n"));
      timers.push(setTimeout(function () { typeLine(index + 1); },
                             line.pause == null ? 200 : line.pause));
    } else {
      tick();
    }
  }

  /* Cosmetic clock in the top bar. */
  function startClock() {
    var el = document.getElementById("clock");
    if (!el) return;
    function pad(n) { return n < 10 ? "0" + n : String(n); }
    function tick() {
      var d = new Date();
      el.textContent = pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ── go ───────────────────────────────────────────────────────────── */

  if (!bootEl || !logEl || !shellEl) return;

  // A deep link should never make you sit through the boot.
  var deepLink = location.hash && location.hash !== "#/" && location.hash !== "#";

  if (reducedMotion() || alreadyBooted() || deepLink || !lines.length) {
    finish();
  } else {
    document.addEventListener("keydown", onSkip);
    document.addEventListener("pointerdown", onSkip);
    typeLine(0);
  }
})();
