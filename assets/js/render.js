/* ══════════════════════════════════════════════════════════════════════
   render.js — every view the router can show.
   Each renderer returns an HTML string; the router injects it into #view.
   All authored text goes through esc() on the way in.
   ══════════════════════════════════════════════════════════════════════ */

window.Render = (function () {
  "use strict";

  var SPOILER_KEY = "rubicon.spoilers";

  var creed  = window.AC6_CREED  || {};
  var bosses = window.AC6_BOSSES || [];
  var lore   = window.AC6_LORE   || [];

  /* ── helpers ──────────────────────────────────────────────────────── */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function byId(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function paras(arr) {
    return (arr || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  }

  function bullets(arr) {
    if (!arr || !arr.length) return "";
    return "<ul class=\"bullets\">" +
      arr.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") +
      "</ul>";
  }

  function threatMeter(n) {
    var lvl = Math.max(0, Math.min(5, n || 0));
    var on = "";
    var off = "";
    for (var i = 0; i < lvl; i++) on += "■";
    for (var j = lvl; j < 5; j++) off += "□";
    return "<span class=\"threat\">" + on +
           "<span class=\"off\">" + off + "</span></span>";
  }

  function footer() {
    return "<hr><p class=\"notice notice-dim\">" + esc(creed.footerNote || "") + "</p>";
  }

  /* ── spoiler state ────────────────────────────────────────────────── */

  function spoilersUnlocked() {
    try { return localStorage.getItem(SPOILER_KEY) === "1"; }
    catch (e) { return false; }
  }

  function setSpoilers(on) {
    try { localStorage.setItem(SPOILER_KEY, on ? "1" : "0"); } catch (e) {}
  }

  /* Wraps content in the blur gate unless spoilers are unlocked.
     aria-hidden matters here: a purely visual blur would still read the
     spoiler aloud to anyone using a screen reader. */
  function seal(html, label) {
    if (spoilersUnlocked()) return html;
    return "<div class=\"sealed\">" +
             "<div class=\"sealed-body\" aria-hidden=\"true\">" + html + "</div>" +
             "<div class=\"sealed-overlay\">" +
               "<p>" + esc(label || "ENCRYPTED — CONTAINS SPOILERS") + "</p>" +
               "<button class=\"decrypt-btn\" type=\"button\" data-decrypt>DECRYPT</button>" +
             "</div>" +
           "</div>";
  }

  /* ── HOME ─────────────────────────────────────────────────────────── */

  function home() {
    var whispers = creed.whispers || [];
    var whisper = whispers.length
      ? whispers[Math.floor(Math.random() * whispers.length)]
      : "";

    return "" +
      "<pre class=\"banner\" role=\"img\" aria-label=\"Rubicon Archive\">" +
        esc(creed.banner || "RUBICON ARCHIVE") + "</pre>" +
      "<p class=\"eyebrow\">" + esc(creed.bannerSub || "") + "</p>" +
      (whisper ? "<p class=\"eyebrow\">// " + esc(whisper) + "</p>" : "") +

      "<p class=\"lede\">" + esc(creed.homeLede || "") + "</p>" +

      "<p class=\"rule-label\">SECTIONS</p>" +
      "<ul class=\"rows\">" +
        "<li><a class=\"row\" href=\"#/bosses\">" +
          "<span class=\"row-head\">" +
            "<span class=\"row-name\">TARGETS</span>" +
            "<span class=\"row-meta\">" + bosses.length + " DOSSIERS</span>" +
          "</span>" +
          "<p class=\"row-summary\">Every story-critical machine on Rubicon 3 — what it does, " +
          "which phase it dies in, and what to bring.</p>" +
        "</a></li>" +
        "<li><a class=\"row\" href=\"#/lore\">" +
          "<span class=\"row-head\">" +
            "<span class=\"row-name\">ARCHIVE</span>" +
            "<span class=\"row-meta\">" + lore.length + " RECORDS</span>" +
          "</span>" +
          "<p class=\"row-summary\">Recovered transmissions: the Coral, the Fires of Ibis, " +
          "the corporations, the people who lied to you, and the three ways out.</p>" +
        "</a></li>" +
        "<li><a class=\"row\" href=\"#/creed\">" +
          "<span class=\"row-head\">" +
            "<span class=\"row-name\">DOCTRINE</span>" +
            "<span class=\"row-meta\">READ ONCE</span>" +
          "</span>" +
          "<p class=\"row-summary\">Six tenets. You do not have to accept them. " +
          "You will keep coming back to them.</p>" +
        "</a></li>" +
      "</ul>" +

      "<p class=\"rule-label\">TERMINAL</p>" +
      "<p class=\"lede\">This page takes typed commands. Try <code>help</code>, " +
      "<code>list targets</code>, or <code>boss balteus</code> in the bar at the bottom.</p>" +

      footer();
  }

  /* ── BOSS INDEX ───────────────────────────────────────────────────── */

  function bossRow(b) {
    return "<li><a class=\"row\" href=\"#/boss/" + esc(b.id) + "\">" +
      "<span class=\"row-head\">" +
        "<span class=\"row-name\">" + esc(b.designation) + "</span>" +
        (b.alias ? "<span class=\"row-alias\">" + esc(b.alias) + "</span>" : "") +
        "<span class=\"row-meta\">" + threatMeter(b.threat) + "</span>" +
      "</span>" +
      "<p class=\"row-summary\">" + esc(b.mission) + "</p>" +
    "</a></li>";
  }

  function bossIndex() {
    var chapters = {};
    var order = [];

    bosses.forEach(function (b) {
      var key = b.chapter;
      if (!chapters[key]) { chapters[key] = []; order.push(key); }
      chapters[key].push(b);
    });
    order.sort(function (a, b) { return a - b; });

    var body = order.map(function (ch) {
      return "<p class=\"rule-label\">CHAPTER " + esc(ch) + "</p>" +
             "<ul class=\"rows\">" + chapters[ch].map(bossRow).join("") + "</ul>";
    }).join("");

    return "" +
      "<p class=\"eyebrow\">TARGET DOSSIERS</p>" +
      "<h1>TARGETS</h1>" +
      "<p class=\"lede\">Story-critical engagements, in the order Rubicon throws them at you. " +
      "Threat is scored on how hard the fight hits an unprepared first-timer, " +
      "not on how hard it is once you know the answer.</p>" +
      "<p class=\"notice notice-dim\">Mission names are spoilers by nature. " +
      "Nothing past Chapter 1 is safe to browse blind.</p>" +
      body +
      footer();
  }

  /* ── BOSS DETAIL ──────────────────────────────────────────────────── */

  function bossDetail(id) {
    var b = byId(bosses, id);
    if (!b) return notFound("No dossier matches “" + id + "”.");

    var phases = (b.phases || []).map(function (p) {
      return "<div class=\"phase\">" +
        "<h3 class=\"phase-name\">" + esc(p.name) + "</h3>" +
        "<p>" + esc(p.behavior) + "</p>" +
        (p.counter ? "<p class=\"counter\">" + esc(p.counter) + "</p>" : "") +
      "</div>";
    }).join("");

    var sources = (b.sources || []).length
      ? "<p class=\"rule-label\">SOURCES</p><ul class=\"bullets\">" +
        b.sources.map(function (u) {
          return "<li><a href=\"" + esc(u) + "\" target=\"_blank\" rel=\"noopener noreferrer\">" +
                 esc(u) + "</a></li>";
        }).join("") + "</ul>"
      : "";

    var body = "" +
      "<p class=\"eyebrow\">TARGET DOSSIER // CHAPTER " + esc(b.chapter) + "</p>" +
      "<h1>" + esc(b.designation) + "</h1>" +
      (b.alias ? "<p class=\"lede\">" + esc(b.alias) + "</p>" : "") +
      (window.Portrait
        ? "<div class=\"visuals\">" + window.Portrait.markup(b) +
          window.Portrait.emblemMarkup(b) + "</div>"
        : "") +

      "<ul class=\"chips\">" +
        "<li class=\"chip chip-hot\">" + esc(b.type) + "</li>" +
        "<li class=\"chip\">CH " + esc(b.chapter) + "</li>" +
        "<li class=\"chip\">THREAT " + esc(b.threat) + "/5</li>" +
        (b.verified === false
          ? "<li class=\"chip chip-warn\">UNVERIFIED</li>" : "") +
      "</ul>" +

      (b.verified === false
        ? "<p class=\"notice\">Parts of this dossier could not be corroborated across " +
          "two independent sources. Treat the specifics as field hearsay.</p>"
        : "") +

      "<dl class=\"dl\">" +
        "<dt>MISSION</dt><dd>" + esc(b.mission) + "</dd>" +
        "<dt>CLASS</dt><dd>" + esc(b.type) + "</dd>" +
        "<dt>THREAT</dt><dd>" + threatMeter(b.threat) + "</dd>" +
      "</dl>" +

      "<p>" + esc(b.summary) + "</p>" +

      (phases ? "<p class=\"rule-label\">ENGAGEMENT PHASES</p>" + phases : "") +
      (b.weaknesses && b.weaknesses.length
        ? "<p class=\"rule-label\">EXPLOITS</p>" + bullets(b.weaknesses) : "") +
      (b.loadoutHints && b.loadoutHints.length
        ? "<p class=\"rule-label\">LOADOUT NOTES</p>" + bullets(b.loadoutHints) : "") +
      (b.quote
        ? "<div class=\"transmission\"><p>" + esc(b.quote.text) + "</p>" +
          "<cite>" + esc(b.quote.by) + "</cite></div>" : "") +
      sources;

    return "<a class=\"back\" href=\"#/bosses\">ALL TARGETS</a>" +
           (b.chapter > 1 ? seal(body, "DOSSIER SEALED — CHAPTER " + esc(b.chapter) + " SPOILERS") : body) +
           footer();
  }

  /* ── LORE INDEX ───────────────────────────────────────────────────── */

  var LORE_ORDER = ["Rubicon", "Coral", "Factions", "Characters", "Endings"];

  function loreRow(entry) {
    var sealedNow = entry.spoiler && !spoilersUnlocked();
    return "<li><a class=\"row\" href=\"#/lore/" + esc(entry.id) + "\">" +
      "<span class=\"row-head\">" +
        "<span class=\"row-name\">" + esc(entry.title) + "</span>" +
        "<span class=\"row-meta\">" + esc(entry.classification) + "</span>" +
      "</span>" +
      "<p class=\"row-summary\">" +
        (sealedNow
          ? "██████ REDACTED — unlock spoilers to read ██████"
          : esc((entry.body && entry.body[0] ? entry.body[0] : "").slice(0, 160) + "…")) +
      "</p>" +
    "</a></li>";
  }

  function loreIndex() {
    var groups = {};
    lore.forEach(function (e) {
      (groups[e.category] = groups[e.category] || []).push(e);
    });

    var cats = LORE_ORDER.filter(function (c) { return groups[c]; })
      .concat(Object.keys(groups).filter(function (c) {
        return LORE_ORDER.indexOf(c) === -1;
      }));

    var body = cats.map(function (c) {
      return "<p class=\"rule-label\">" + esc(c.toUpperCase()) + "</p>" +
             "<ul class=\"rows\">" + groups[c].map(loreRow).join("") + "</ul>";
    }).join("");

    return "" +
      "<p class=\"eyebrow\">RECOVERED TRANSMISSIONS</p>" +
      "<h1>ARCHIVE</h1>" +
      "<p class=\"lede\">What we could pull off the planet before the link degraded. " +
      "Entries marked RESTRICTED or REDACTED stay sealed until you unlock spoilers " +
      "in the bar above.</p>" +
      body +
      footer();
  }

  /* ── LORE DETAIL ──────────────────────────────────────────────────── */

  function loreDetail(id) {
    var e = byId(lore, id);
    if (!e) return notFound("No record matches “" + id + "”.");

    var related = (e.related || []).map(function (rid) {
      var r = byId(lore, rid);
      return r ? "<li><a href=\"#/lore/" + esc(r.id) + "\">" + esc(r.title) + "</a></li>" : "";
    }).join("");

    var body = "" +
      "<p class=\"eyebrow\">" + esc(e.category.toUpperCase()) +
        " // " + esc(e.classification) + "</p>" +
      "<h1>" + esc(e.title) + "</h1>" +
      paras(e.body) +
      (e.quote
        ? "<div class=\"transmission\"><p>" + esc(e.quote.text) + "</p>" +
          "<cite>" + esc(e.quote.by) + "</cite></div>" : "") +
      (related ? "<p class=\"rule-label\">CROSS-REFERENCE</p><ul class=\"bullets\">" +
                 related + "</ul>" : "");

    return "<a class=\"back\" href=\"#/lore\">ALL RECORDS</a>" +
           (e.spoiler ? seal(body) : body) +
           footer();
  }

  /* ── DOCTRINE ─────────────────────────────────────────────────────── */

  function doctrine() {
    var d = creed.doctrine || { tenets: [] };
    var tenets = (d.tenets || []).map(function (t) {
      return "<div class=\"phase\">" +
        "<h3 class=\"phase-name\">" + esc(t.n) + ". " + esc(t.head) + "</h3>" +
        "<p>" + esc(t.body) + "</p>" +
      "</div>";
    }).join("");

    return "" +
      "<p class=\"eyebrow\">FOR INITIATES</p>" +
      "<h1>" + esc(d.title || "DOCTRINE") + "</h1>" +
      "<p class=\"lede\">" + esc(d.lede || "") + "</p>" +
      tenets +
      (d.closing
        ? "<div class=\"transmission\"><p>" + esc(d.closing) + "</p>" +
          "<cite>HANDLER WALTER</cite></div>" : "") +
      footer();
  }

  /* ── 404 ──────────────────────────────────────────────────────────── */

  function notFound(msg) {
    return "" +
      "<p class=\"eyebrow\">SIGNAL LOST</p>" +
      "<h1>404 // NO SUCH RECORD</h1>" +
      "<p class=\"lede\">" + esc(msg || "That path is not in the archive.") + "</p>" +
      "<div class=\"transmission\"><p>The link dropped. Whatever was here, " +
      "the corporations got to it first.</p><cite>ARCHIVE DAEMON</cite></div>" +
      "<ul class=\"bullets\">" +
        "<li><a href=\"#/\">Return to the terminal</a></li>" +
        "<li><a href=\"#/bosses\">Target dossiers</a></li>" +
        "<li><a href=\"#/lore\">Recovered transmissions</a></li>" +
      "</ul>" +
      footer();
  }

  return {
    esc: esc,
    byId: byId,
    home: home,
    bossIndex: bossIndex,
    bossDetail: bossDetail,
    loreIndex: loreIndex,
    loreDetail: loreDetail,
    doctrine: doctrine,
    notFound: notFound,
    spoilersUnlocked: spoilersUnlocked,
    setSpoilers: setSpoilers
  };
})();
