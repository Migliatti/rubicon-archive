/* ══════════════════════════════════════════════════════════════════════
   terminal.js — the command prompt.
   Everything here is a shortcut for something you can also click; the
   prompt is flavour, never the only way to reach a page.
   ══════════════════════════════════════════════════════════════════════ */

window.Terminal = (function () {
  "use strict";

  var input;
  var history = [];
  var histPos = -1;      // -1 = not browsing history
  var inited = false;

  function esc(s) { return window.Render.esc(s); }

  function out(lines) {
    window.Router.notice("<div class=\"term-out\">" + lines.join("\n") + "</div>");
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
        "  <span class=\"t-cmd\">help</span>              this list",
        "  <span class=\"t-cmd\">list targets</span>      every boss dossier",
        "  <span class=\"t-cmd\">list records</span>      every archive record",
        "  <span class=\"t-cmd\">boss &lt;name&gt;</span>       open a dossier   e.g. boss balteus",
        "  <span class=\"t-cmd\">lore &lt;name&gt;</span>       open a record    e.g. lore coral",
        "  <span class=\"t-cmd\">doctrine</span>          the six tenets",
        "  <span class=\"t-cmd\">spoilers on|off</span>   seal or unseal restricted records",
        "  <span class=\"t-cmd\">home</span>              back to the terminal",
        "  <span class=\"t-cmd\">clear</span>             clear this output",
        "",
        "<span class=\"t-key\">Arrow Up / Down</span> walks your command history."
      ]);
      window.Router.paint();
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
      window.Router.paint();
    },

    boss: function (arg) {
      if (!arg) { err("boss: needs a name. e.g. boss balteus"); window.Router.paint(); return; }
      var b = find(window.AC6_BOSSES || [], arg, "designation");
      if (!b) {
        err("boss: no dossier matching \"" + arg + "\". Try: list targets");
        window.Router.paint();
        return;
      }
      window.Router.go("/boss/" + b.id);
    },

    lore: function (arg) {
      if (!arg) { window.Router.go("/lore"); return; }
      var e = find(window.AC6_LORE || [], arg, "title");
      if (!e) {
        err("lore: no record matching \"" + arg + "\". Try: list records");
        window.Router.paint();
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
        window.Router.paint();
        return;
      }
      out(["<span class=\"t-key\">SPOILERS " +
           (window.Render.spoilersUnlocked() ? "OPEN" : "LOCKED") + "</span>"]);
      // Re-run start-of-page wiring so the nav chip updates too.
      var toggle = document.getElementById("spoiler-toggle");
      var state = document.getElementById("spoiler-state");
      if (toggle) toggle.setAttribute("aria-pressed",
        window.Render.spoilersUnlocked() ? "true" : "false");
      if (state) state.textContent =
        window.Render.spoilersUnlocked() ? "OPEN" : "LOCKED";
      window.Router.paint();
    },

    clear: function () {
      window.Router.notice(null);
      window.Router.paint();
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
      window.Router.paint();
    },

    ayre: function () {
      out([
        "<span class=\"t-cmd\">... signal ...</span>",
        "",
        "  Can you hear me? Good.",
        "  I've been with you since the ice."
      ]);
      window.Router.paint();
    },

    "621": function () {
      out(["<span class=\"t-key\">C4-621</span> — augmented human, unregistered.",
           "Say nothing. Take the contract."]);
      window.Router.paint();
    },

    burn: function () {
      out(["<span class=\"t-err\">COMMAND WITHHELD</span>",
           "That choice is not the archive's to make."]);
      window.Router.paint();
    }
  };

  /* ── input handling ───────────────────────────────────────────────── */

  function run(line) {
    var trimmed = line.trim();
    if (!trimmed) return;

    history.push(trimmed);
    histPos = -1;

    var space = trimmed.indexOf(" ");
    var name = (space === -1 ? trimmed : trimmed.slice(0, space)).toLowerCase();
    var arg = space === -1 ? "" : trimmed.slice(space + 1).trim();

    if (COMMANDS[name]) COMMANDS[name](arg);
    else {
      err(name + ": command not found. Type help.");
      window.Router.paint();
    }
  }

  function onKey(e) {
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
    input = document.getElementById("cmd");
    if (!input) return;
    input.addEventListener("keydown", onKey);

    // "/" focuses the prompt, the way it does in every tool worth using.
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
      }
    });
  }

  return { init: init, run: run };
})();
