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
    if (window.Keybar && window.Keybar.init) window.Keybar.init();
    if (window.Router && window.Router.start) window.Router.start();
    if (window.Terminal && window.Terminal.init) window.Terminal.init();
    startClock();
    startIdentity();
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

  /* The one element on the site that is about the reader. It does nothing
     but change what the archive calls you — which is the whole point. */
  function startIdentity() {
    var KEY = "rubicon.registered";
    var line = document.getElementById("identity-line");
    var btn = document.getElementById("identity-toggle");
    if (!line || !btn) return;

    function registered() {
      try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; }
    }

    function render() {
      var on = registered();
      line.textContent = on ? "YOU ARE C4-621." : "YOU ARE UNREGISTERED.";
      btn.textContent = on ? "[ GO DARK ]" : "[ REGISTER ]";
    }

    btn.addEventListener("click", function () {
      try { localStorage.setItem(KEY, registered() ? "0" : "1"); } catch (e) {}
      render();
    });

    render();
  }

  /* ── go ───────────────────────────────────────────────────────────── */

  if (!bootEl || !logEl || !shellEl) return;

  // Painted immediately: the backdrop belongs to the boot screen too.
  if (window.Portrait) window.Portrait.backdrop(document.getElementById("backdrop"));

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
