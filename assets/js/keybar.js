/* ══════════════════════════════════════════════════════════════════════
   keybar.js — the function key bar.

   The bar at the bottom of the screen is not decoration: F1–F6 and F8 do
   exactly what they say, and clicking an entry does the same thing as
   pressing the key. Browsers reserve some F-keys, so the plain digits
   1–6 and 8 are bound to the same actions as an escape hatch.

   F8 cycles the phosphor. The whole stylesheet hangs off three custom
   properties, and portrait.js reads --phos at draw time, so swapping
   them repaints the artwork too.
   ══════════════════════════════════════════════════════════════════════ */

window.Keybar = (function () {
  "use strict";

  var PHOS_KEY = "rubicon.phosphor";

  var PHOSPHORS = [
    { id: "coral", phos: "#ff5a3c", dim: "#8a2f1e", glow: "rgba(255, 90, 60, 0.35)" },
    { id: "amber", phos: "#ffb000", dim: "#a06c00", glow: "rgba(255, 176, 0, 0.35)" },
    { id: "green", phos: "#33ff77", dim: "#1c8a41", glow: "rgba(51, 255, 119, 0.35)" }
  ];

  var barEl;
  var inited = false;

  /* ── phosphor ─────────────────────────────────────────────────────── */

  function storedPhosphor() {
    var id;
    try { id = localStorage.getItem(PHOS_KEY); } catch (e) {}
    for (var i = 0; i < PHOSPHORS.length; i++) {
      if (PHOSPHORS[i].id === id) return i;
    }
    return 0;
  }

  function applyPhosphor(index, repaint) {
    var p = PHOSPHORS[index % PHOSPHORS.length];
    var root = document.documentElement;
    root.style.setProperty("--phos", p.phos);
    root.style.setProperty("--phos-dim", p.dim);
    root.style.setProperty("--phos-glow", p.glow);
    try { localStorage.setItem(PHOS_KEY, p.id); } catch (e) {}

    // The artwork is quantised to the phosphor ramp, so it has to be
    // redrawn or the page ends up two colours at once.
    if (repaint && window.Portrait && window.Portrait.repaint) {
      window.Portrait.repaint();
    }
    return p.id;
  }

  function cyclePhosphor() {
    var next = (storedPhosphor() + 1) % PHOSPHORS.length;
    var id = applyPhosphor(next, true);
    if (window.Terminal && window.Terminal.say) {
      window.Terminal.say("PHOSPHOR: " + id.toUpperCase());
    }
  }

  /* ── actions ──────────────────────────────────────────────────────── */

  var ACTIONS = {
    spoilers: function () {
      var toggle = document.getElementById("spoiler-toggle");
      if (toggle) toggle.click();
    },
    console: function () {
      if (!window.Terminal || !window.Terminal.setOpen) return;
      window.Terminal.setOpen(!window.Terminal.isOpen());
    },
    phosphor: cyclePhosphor
  };

  /* F1 … F8 and the bare digits, in bar order. */
  var KEYS = {
    "F1": "#/", "1": "#/",
    "F2": "#/bosses", "2": "#/bosses",
    "F3": "#/lore", "3": "#/lore",
    "F4": "#/creed", "4": "#/creed",
    "F5": "spoilers", "5": "spoilers",
    "F6": "console", "6": "console",
    "F8": "phosphor", "8": "phosphor"
  };

  function fire(target) {
    if (!target) return;
    if (ACTIONS[target]) ACTIONS[target]();
    else if (window.Router) window.Router.go(target);
  }

  function onKey(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    // Digits are only shortcuts when you are not typing a command.
    var el = document.activeElement;
    var tag = (el && el.tagName ? el.tagName : "").toLowerCase();
    var typing = tag === "input" || tag === "textarea";
    if (typing && e.key.length === 1) return;

    var target = KEYS[e.key];
    if (!target) return;
    e.preventDefault();
    fire(target);
  }

  /* ── public ───────────────────────────────────────────────────────── */

  /* Mirrors the router's current section onto the bar. */
  function mark(name) {
    if (!barEl) return;
    var keys = barEl.querySelectorAll("a[data-nav]");
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].getAttribute("data-nav") === name) {
        keys[i].setAttribute("aria-current", "page");
      } else {
        keys[i].removeAttribute("aria-current");
      }
    }
  }

  function init() {
    if (inited) return;
    inited = true;

    barEl = document.getElementById("keybar");
    applyPhosphor(storedPhosphor(), false);

    if (barEl) {
      barEl.addEventListener("click", function (e) {
        var btn = e.target.closest ? e.target.closest("[data-act]") : null;
        if (!btn) return;
        e.preventDefault();
        fire(btn.getAttribute("data-act"));
      });
    }

    document.addEventListener("keydown", onKey);
    measure();
  }

  /* The bar is fixed and wraps to two rows on a phone, so its height is not
     knowable from CSS. Publish it so the slab and console can reserve it. */
  function measure() {
    if (!barEl) return;
    var h = Math.ceil(barEl.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--keybar-h", h + "px");
  }

  window.addEventListener("resize", function () { measure(); });

  return { init: init, mark: mark, measure: measure };
})();
