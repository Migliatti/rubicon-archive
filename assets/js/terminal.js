/* ══════════════════════════════════════════════════════════════════════
   terminal.js — the command prompt.
   Everything here is a shortcut for something you can also click; the
   prompt is flavour, never the only way to reach a page.
   ══════════════════════════════════════════════════════════════════════ */

window.Terminal = (function () {
  "use strict";

  var input, logEl, panelEl, toggleEl;
  var history = [];
  var histPos = -1;      // -1 = not browsing history
  var inited = false;

  var OPEN_KEY = "rubicon.console";
  var DESKTOP = "(min-width: 901px)";

  function esc(s) { return window.Render.esc(s); }

  /* Output lands in the console's own scrollback, not in the page —
     the panel is a transcript you can scroll back through while the
     view beside it keeps navigating. */
  function push(html) {
    if (!logEl) return;
    var block = document.createElement("div");
    block.innerHTML = html;
    while (block.firstChild) logEl.appendChild(block.firstChild);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function out(lines) {
    push("<div class=\"term-out\">" + lines.join("\n") + "</div>");
  }

  function echo(line) {
    push("<p class=\"term-echo\">" + esc(line) + "</p>");
  }

  function err(msg) {
    out(["<span class=\"t-err\">" + esc(msg) + "</span>"]);
  }

  /* Fuzzy-ish lookup: exact id, then id prefix, then substring of the
     display name. Lets `boss balt` find AAP07: BALTEUS. */
  function find(list, needle, nameKey) {
    var q = needle.toLowerCase();
    var i;
    for (i = 0; i < list.length; i++) if (list[i].id === q) return list[i];
    for (i = 0; i < list.length; i++) if (list[i].id.indexOf(q) === 0) return list[i];
    for (i = 0; i < list.length; i++) {
      if (String(list[i][nameKey] || "").toLowerCase().indexOf(q) !== -1) return list[i];
    }
    return null;
  }

  /* ── commands ─────────────────────────────────────────────────────── */

  var COMMANDS = {

    help: function () {
      out([
        "<span class=\"t-key\">AVAILABLE COMMANDS</span>",
        "",
        /* Kept inside ~40 columns: the console is a narrow panel, and
           wrapped help defeats the alignment it depends on. */
        "  <span class=\"t-cmd\">help</span>             this list",
        "  <span class=\"t-cmd\">list targets</span>     boss dossiers",
        "  <span class=\"t-cmd\">list records</span>     archive records",
        "  <span class=\"t-cmd\">boss &lt;name&gt;</span>      open a dossier",
        "  <span class=\"t-cmd\">lore &lt;name&gt;</span>      open a record",
        "  <span class=\"t-cmd\">doctrine</span>         the six tenets",
        "  <span class=\"t-cmd\">spoilers on|off</span>  seal / unseal",
        "  <span class=\"t-cmd\">home</span>             back to the top",
        "  <span class=\"t-cmd\">clear</span>            clear this output",
        "  <span class=\"t-cmd\">phosphor</span>         cycle the colour",
        "",
        "e.g. <span class=\"t-cmd\">boss balteus</span> / <span class=\"t-cmd\">lore coral</span>",
        "",
        "<span class=\"t-key\">Arrow Up / Down</span> walks your command history.",
        "<span class=\"t-key\">Esc</span> closes this console, <span class=\"t-key\">/</span> reopens it."
      ]);
    },

    list: function (arg) {
      var what = (arg || "").toLowerCase();

      if (what === "records" || what === "lore" || what === "archive") {
        window.Router.go("/lore");
        return;
      }
      if (what === "targets" || what === "bosses" || what === "" ) {
        window.Router.go("/bosses");
        return;
      }
      err("list: don't know how to list \"" + arg + "\". Try: list targets | list records");
    },

    boss: function (arg) {
      if (!arg) { err("boss: needs a name. e.g. boss balteus"); return; }
      var b = find(window.AC6_BOSSES || [], arg, "designation");
      if (!b) {
        err("boss: no dossier matching \"" + arg + "\". Try: list targets");
        return;
      }
      window.Router.go("/boss/" + b.id);
    },

    lore: function (arg) {
      if (!arg) { window.Router.go("/lore"); return; }
      var e = find(window.AC6_LORE || [], arg, "title");
      if (!e) {
        err("lore: no record matching \"" + arg + "\". Try: list records");
        return;
      }
      window.Router.go("/lore/" + e.id);
    },

    doctrine: function () { window.Router.go("/creed"); },
    creed:    function () { window.Router.go("/creed"); },
    home:     function () { window.Router.go("/"); },

    spoilers: function (arg) {
      var a = (arg || "").toLowerCase();
      if (a === "on" || a === "open" || a === "unlock") {
        window.Render.setSpoilers(true);
      } else if (a === "off" || a === "lock" || a === "seal") {
        window.Render.setSpoilers(false);
      } else {
        err("spoilers: use \"spoilers on\" or \"spoilers off\".");
        return;
      }
      out(["<span class=\"t-key\">SPOILERS " +
           (window.Render.spoilersUnlocked() ? "OPEN" : "LOCKED") + "</span>"]);
      // The nav chip and the key bar both carry this state.
      window.Router.syncToggle();
      window.Router.paint();
    },

    clear: function () {
      if (logEl) logEl.innerHTML = "";
    },

    /* Same action as F8 — the key bar and the console must never disagree
       about what the machine can do. */
    phosphor: function () {
      var key = document.querySelector("[data-act=\"phosphor\"]");
      if (key) key.click();
    },

    /* ── easter eggs ────────────────────────────────────────────────── */

    raven: function () {
      out([
        "<span class=\"t-cmd\">IDENTITY CHECK</span>",
        "",
        "  handle .......... RAVEN",
        "  registry ........ NONE",
        "  prior holder .... deceased",
        "",
        "The name was already used. You are wearing it anyway."
      ]);
    },

    ayre: function () {
      out([
        "<span class=\"t-cmd\">... signal ...</span>",
        "",
        "  Can you hear me? Good.",
        "  I've been with you since the ice."
      ]);
    },

    "621": function () {
      out(["<span class=\"t-key\">C4-621</span> — augmented human, unregistered.",
           "Say nothing. Take the contract."]);
    },

    burn: function () {
      out(["<span class=\"t-err\">COMMAND WITHHELD</span>",
           "That choice is not the archive's to make."]);
    }
  };

  /* ── input handling ───────────────────────────────────────────────── */

  function run(line) {
    var trimmed = line.trim();
    if (!trimmed) return;

    history.push(trimmed);
    histPos = -1;
    echo(trimmed);

    var space = trimmed.indexOf(" ");
    var name = (space === -1 ? trimmed : trimmed.slice(0, space)).toLowerCase();
    var arg = space === -1 ? "" : trimmed.slice(space + 1).trim();

    if (COMMANDS[name]) COMMANDS[name](arg);
    else err(name + ": command not found. Type help.");

    // Router.paint() moves focus to the view; the prompt should keep it so
    // you can chain commands without reaching for the mouse.
    if (input && isOpen()) input.focus();
  }

  /* ── panel open / close ───────────────────────────────────────────── */

  function desktop() {
    return !window.matchMedia || window.matchMedia(DESKTOP).matches;
  }

  function isOpen() {
    return !!panelEl && panelEl.classList.contains("is-open");
  }

  function remember(open) {
    try { localStorage.setItem(OPEN_KEY, open ? "1" : "0"); } catch (e) {}
  }

  function recall() {
    try { return localStorage.getItem(OPEN_KEY) !== "0"; }   // open by default
    catch (e) { return true; }
  }

  /* `focus === false` means this is a layout sync rather than a choice the
     reader made, so it neither steals focus nor overwrites the preference. */
  function setOpen(open, focus) {
    if (!panelEl) return;
    panelEl.classList.toggle("is-open", open);
    document.body.classList.toggle("console-open", open);
    if (toggleEl) toggleEl.setAttribute("aria-pressed", open ? "true" : "false");
    if (focus !== false) {
      remember(open);
      // Deferred: the click that opened the panel focuses its own button
      // afterwards, and would otherwise steal the caret back.
      if (open && input) setTimeout(function () { input.focus(); }, 0);
    }
  }

  function onKey(e) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "Enter") {
      run(input.value);
      input.value = "";
      return;
    }
    if (e.key === "ArrowUp") {
      if (!history.length) return;
      e.preventDefault();
      histPos = histPos === -1 ? history.length - 1 : Math.max(0, histPos - 1);
      input.value = history[histPos];
      return;
    }
    if (e.key === "ArrowDown") {
      if (histPos === -1) return;
      e.preventDefault();
      histPos++;
      if (histPos >= history.length) { histPos = -1; input.value = ""; }
      else input.value = history[histPos];
    }
  }

  function init() {
    if (inited) return;
    inited = true;

    input   = document.getElementById("cmd");
    logEl   = document.getElementById("console-log");
    panelEl = document.getElementById("console");
    toggleEl = document.getElementById("console-toggle");
    if (!input || !panelEl) return;

    input.addEventListener("keydown", onKey);

    if (toggleEl) {
      toggleEl.addEventListener("click", function () { setOpen(!isOpen()); });
    }
    var closeEl = document.getElementById("console-close");
    if (closeEl) closeEl.addEventListener("click", function () { setOpen(false); });

    out([
      "<span class=\"t-key\">RUBICON ARCHIVE</span> command link established.",
      "Type <span class=\"t-cmd\">help</span> for the command list."
    ]);

    // Restore the last state, but never open the panel on a narrow screen —
    // CSS hides it there and a stale flag shouldn't shift the layout.
    setOpen(desktop() && recall(), false);

    // Crossing the breakpoint mid-session should land you in the state that
    // width implies, not the one you left behind.
    if (window.matchMedia) {
      var mq = window.matchMedia(DESKTOP);
      var onChange = function () { setOpen(mq.matches && recall(), false); };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }

    // "/" opens and focuses the prompt, the way it does in every tool
    // worth using.
    document.addEventListener("keydown", function (e) {
      if (e.key !== "/" || document.activeElement === input) return;
      var tag = (document.activeElement.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (!desktop()) return;
      e.preventDefault();
      setOpen(true);
    });
  }

  /* For other modules that need to report into the transcript without
     pretending a command was typed. */
  function say(text) {
    out(["<span class=\"t-key\">" + esc(text) + "</span>"]);
  }

  return { init: init, run: run, say: say, setOpen: setOpen, isOpen: isOpen };
})();
