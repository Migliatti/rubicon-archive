/* ══════════════════════════════════════════════════════════════════════
   router.js — hash routing.
   URLs stay real and shareable (#/boss/balteus); nothing here depends on
   a server, so it works straight off the filesystem.
   ══════════════════════════════════════════════════════════════════════ */

window.Router = (function () {
  "use strict";

  var viewEl, navEl, toggleEl, stateEl;
  var started = false;

  var TITLE = "RUBICON ARCHIVE";

  /* ── route parsing ────────────────────────────────────────────────── */

  function parse() {
    var raw = location.hash.replace(/^#\/?/, "");
    var parts = raw.split("/").filter(Boolean).map(decodeURIComponent);
    return { section: parts[0] || "", id: parts[1] || "" };
  }

  function resolve(route) {
    switch (route.section) {
      case "":
        return { html: window.Render.home(), title: TITLE, nav: "home" };
      case "bosses":
        return { html: window.Render.bossIndex(), title: "TARGETS // " + TITLE, nav: "bosses" };
      case "boss":
        return { html: window.Render.bossDetail(route.id),
                 title: route.id.toUpperCase() + " // " + TITLE, nav: "bosses" };
      case "lore":
        return route.id
          ? { html: window.Render.loreDetail(route.id),
              title: route.id.toUpperCase() + " // " + TITLE, nav: "lore" }
          : { html: window.Render.loreIndex(), title: "ARCHIVE // " + TITLE, nav: "lore" };
      case "creed":
        return { html: window.Render.doctrine(), title: "DOCTRINE // " + TITLE, nav: "creed" };
      default:
        return { html: window.Render.notFound("Unknown path: /" + route.section),
                 title: "404 // " + TITLE, nav: "" };
    }
  }

  /* ── rendering ────────────────────────────────────────────────────── */

  function paint() {
    var view = resolve(parse());

    viewEl.innerHTML = view.html;

    document.title = view.title;
    markNav(view.nav);
    if (window.Keybar) window.Keybar.mark(view.nav);
    wireDecrypt();
    if (window.Portrait) window.Portrait.hydrate(viewEl);

    window.scrollTo(0, 0);
    viewEl.focus({ preventScroll: true });
  }

  function markNav(name) {
    var links = navEl.querySelectorAll("a[data-nav]");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("data-nav") === name) {
        links[i].setAttribute("aria-current", "page");
      } else {
        links[i].removeAttribute("aria-current");
      }
    }
  }

  /* Per-entry DECRYPT buttons unlock spoilers globally — a per-entry
     unlock would mean re-deciding on every page, which is just friction. */
  function wireDecrypt() {
    var btns = viewEl.querySelectorAll("[data-decrypt]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        window.Render.setSpoilers(true);
        syncToggle();
        paint();
      });
    }
  }

  /* ── spoiler toggle ───────────────────────────────────────────────── */

  function syncToggle() {
    var on = window.Render.spoilersUnlocked();
    if (toggleEl) toggleEl.setAttribute("aria-pressed", on ? "true" : "false");
    if (stateEl) stateEl.textContent = on ? "OPEN" : "LOCKED";
    // The key bar carries the same state — on a phone it is the only copy.
    var keyState = document.getElementById("key-spoiler-state");
    if (keyState) keyState.textContent = on ? "OPEN" : "LOCKED";
  }

  function wireToggle() {
    if (!toggleEl) return;
    toggleEl.addEventListener("click", function () {
      window.Render.setSpoilers(!window.Render.spoilersUnlocked());
      syncToggle();
      paint();
    });
  }

  /* ── public ───────────────────────────────────────────────────────── */

  /* Navigate. If the hash is unchanged, hashchange won't fire — repaint
     directly so commands like `home` typed twice still respond. */
  function go(path) {
    var next = path.charAt(0) === "#" ? path : "#" + path;
    if (location.hash === next) paint();
    else location.hash = next;
  }

  function start() {
    if (started) return;
    started = true;

    viewEl   = document.getElementById("view");
    navEl    = document.querySelector(".nav");
    toggleEl = document.getElementById("spoiler-toggle");
    stateEl  = document.getElementById("spoiler-state");

    syncToggle();
    wireToggle();
    window.addEventListener("hashchange", paint);
    paint();
  }

  return { start: start, go: go, paint: paint, syncToggle: syncToggle };
})();
