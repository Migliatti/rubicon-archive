/* ══════════════════════════════════════════════════════════════════════
   portrait.js — boss imagery, two sources, one look.

   1. If a boss has `portrait: "assets/img/bosses/x.jpg"`, the image is
      drawn into a small canvas (PIXEL_W wide) and quantised to the
      phosphor ramp. CSS then upscales it with image-rendering: pixelated,
      which is what actually produces the chunky pixels — the canvas is
      genuinely that small, it is not a filter faking it.

   2. If it has no portrait, a symmetric sprite is generated from the
      boss id. Same seed always yields the same sprite, so a given boss
      looks consistent across reloads and machines.

   Both end up on the same phosphor ramp, so a page mixing real
   screenshots and generated sprites still reads as one set.
   ══════════════════════════════════════════════════════════════════════ */

window.Portrait = (function () {
  "use strict";

  var PIXEL_W = 152;   // internal canvas width for photographic sources

  /* 4x4 Bayer matrix. Ordered dithering is what makes a 5-colour image
     still read as a photograph — without it, quantising a busy game
     screenshot collapses the subject into flat unreadable blobs. */
  var BAYER = [
    [ 0,  8,  2, 10],
    [12,  4, 14,  6],
    [ 3, 11,  1,  9],
    [15,  7, 13,  5]
  ];
  var GRID_W = 32;     // generated sprite grid
  var GRID_H = 24;

  var LABEL_PHOTO = "VISUAL RECORD";
  var LABEL_GENERATED = "SCAN SIGNATURE — RECONSTRUCTED";

  /* ── colour ───────────────────────────────────────────────────────── */

  /* Read the phosphor straight off :root so swapping the palette in
     terminal.css carries through to the artwork. */
  function phosphorRGB() {
    var raw = "";
    try {
      raw = getComputedStyle(document.documentElement)
              .getPropertyValue("--phos").trim();
    } catch (e) {}
    var m = /^#?([0-9a-f]{6})$/i.exec(raw);
    if (!m) return [255, 90, 60];
    var n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  /* Five steps from near-black up through the phosphor to a hot
     highlight. Anything drawn here lands on one of these. */
  function ramp() {
    var p = phosphorRGB();
    function step(k, white) {
      return [
        Math.min(255, Math.round(p[0] * k + 255 * white)),
        Math.min(255, Math.round(p[1] * k + 255 * white)),
        Math.min(255, Math.round(p[2] * k + 255 * white))
      ];
    }
    return [step(0.14, 0), step(0.34, 0), step(0.62, 0), step(0.92, 0), step(0.9, 0.28)];
  }

  /* ── deterministic randomness ─────────────────────────────────────── */

  function hashString(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    return h >>> 0;
  }

  /* mulberry32 — small, fast, good enough for sprite noise. */
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), 1 | t);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ── generated sprite ─────────────────────────────────────────────── */

  /* Builds a left half and mirrors it. Symmetry is what makes an
     otherwise random blob read as a machine rather than static. */
  function buildSprite(boss) {
    var rand = rng(hashString(boss.id));
    var half = GRID_W >> 1;
    var grid = [];
    var x, y;

    for (y = 0; y < GRID_H; y++) {
      grid[y] = [];
      for (x = 0; x < GRID_W; x++) grid[y][x] = 0;
    }

    /* Silhouette proportions differ per class, so an AC does not come
       out the same shape as a C-Weapon. */
    var type = boss.type || "MT";
    var wide = type === "Weapon" ? 1.7 : (type === "MT" ? 1.25 : 0.85);
    var legged = type === "AC" || type === "MT";

    function plot(cx, cy, v) {
      if (cy < 0 || cy >= GRID_H) return;
      var lx = Math.round(cx);
      if (lx < 0 || lx >= half) return;
      grid[cy][half - 1 - lx] = v;
      grid[cy][half + lx] = v;
    }

    function band(y0, y1, w0, w1, density) {
      for (var yy = y0; yy <= y1; yy++) {
        var t = (y1 === y0) ? 0 : (yy - y0) / (y1 - y0);
        var w = (w0 + (w1 - w0) * t) * wide;
        for (var xx = 0; xx <= w; xx++) {
          if (rand() < density) {
            plot(xx, yy, 1 + Math.floor(rand() * 3));
          }
        }
      }
    }

    /* head */
    band(2, 4, 1.2, 2.0, 0.85);
    /* core */
    band(5, 11, 2.4, 3.6, 0.95);
    /* shoulders and arms */
    band(5, 9, 4.5, 7.0, 0.55);
    /* skirt / lower mass */
    band(12, 15, 3.2, 2.2, 0.8);
    /* legs, or a hover skirt for things that do not walk */
    if (legged) {
      for (var yy = 16; yy < GRID_H - 1; yy++) {
        for (var k = 1; k <= 2; k++) {
          if (rand() < 0.85) plot(1 + k * 0.9, yy, 1 + Math.floor(rand() * 2));
        }
      }
    } else {
      band(16, 19, 5.0, 1.5, 0.6);
    }

    /* Hot pixels — more of them the nastier the target. */
    var accents = 2 + Math.round((boss.threat || 3) * 1.4);
    for (var i = 0; i < accents; i++) {
      plot(Math.floor(rand() * half * 0.7), 3 + Math.floor(rand() * 13), 4);
    }

    return grid;
  }

  function drawSprite(canvas, boss) {
    canvas.width = GRID_W;
    canvas.height = GRID_H;
    var ctx = canvas.getContext("2d");
    var grid = buildSprite(boss);
    var pal = ramp();
    var img = ctx.createImageData(GRID_W, GRID_H);

    for (var y = 0; y < GRID_H; y++) {
      for (var x = 0; x < GRID_W; x++) {
        var v = grid[y][x];
        var o = (y * GRID_W + x) * 4;
        if (!v) { img.data[o + 3] = 0; continue; }
        var c = pal[v];
        img.data[o] = c[0];
        img.data[o + 1] = c[1];
        img.data[o + 2] = c[2];
        img.data[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    canvas.setAttribute("data-source", "generated");
  }

  /* ── photographic source ──────────────────────────────────────────── */

  function quantise(ctx, w, h) {
    /* getImageData taints under file:// — that is expected, not a bug.
       We keep the pixelated downscale and skip the duotone. */
    var img;
    try {
      img = ctx.getImageData(0, 0, w, h);
    } catch (e) {
      return false;
    }
    var pal = ramp();
    var d = img.data;
    var n = w * h;
    var lums = new Float32Array(n);
    var i, p;

    for (i = 0, p = 0; p < n; i += 4, p++) {
      lums[p] = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255;
    }

    /* Contrast stretch across the 2nd–98th percentile. Game screenshots
       are often fogged or low-contrast (Strider in the dust storm, Balteus
       against snow); without this they quantise to one or two levels. */
    var sorted = Float32Array.from(lums);
    Array.prototype.sort.call(sorted, function (a, b) { return a - b; });
    var lo = sorted[Math.floor(n * 0.02)];
    var hi = sorted[Math.floor(n * 0.98)];
    var span = (hi - lo) || 1;

    var levels = pal.length;
    for (p = 0, i = 0; p < n; p++, i += 4) {
      var lum = (lums[p] - lo) / span;
      if (lum < 0) lum = 0; else if (lum > 1) lum = 1;

      var bx = (p % w) & 3;
      var by = ((p / w) | 0) & 3;
      var threshold = (BAYER[by][bx] + 0.5) / 16;

      var idx = Math.floor(lum * (levels - 1) + threshold);
      if (idx < 0) idx = 0; else if (idx > levels - 1) idx = levels - 1;

      d[i] = pal[idx][0];
      d[i + 1] = pal[idx][1];
      d[i + 2] = pal[idx][2];
    }
    ctx.putImageData(img, 0, 0);
    return true;
  }

  function setCaption(canvas, text) {
    var fig = canvas.closest ? canvas.closest(".portrait") : null;
    var cap = fig && fig.querySelector("figcaption");
    if (cap) cap.textContent = text;
  }

  /* Downscale hard, then quantise. Shared by portraits and the page
     backdrop — same ramp, same dither, so they read as one image set. */
  function paint(canvas, img, width) {
    var w = width;
    var h = Math.max(1, Math.round(w * (img.height / img.width)));
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;   // smooth on the way DOWN
    ctx.drawImage(img, 0, 0, w, h);
    var ok = quantise(ctx, w, h);
    canvas.setAttribute("data-source", ok ? "photo" : "photo-untinted");
    return ok;
  }

  function drawImageSource(canvas, boss, src, width) {
    var img = new Image();
    var PW = width || PIXEL_W;
    img.onload = function () {
      paint(canvas, img, PW);
      canvas.classList.remove("portrait-pending");
      setCaption(canvas, LABEL_PHOTO);
    };
    img.onerror = function () {
      // Missing or unreadable file: fall back rather than leaving a hole.
      // This is the normal state for a boss whose screenshot hasn't been
      // added yet, so it must degrade silently.
      if (canvas.getAttribute("data-kind") === "emblem") {
        var fig = canvas.closest ? canvas.closest(".emblem") : null;
        if (fig) fig.style.display = "none";
        canvas.setAttribute("data-source", "missing");
        return;
      }
      drawSprite(canvas, boss);
      canvas.classList.remove("portrait-pending");
      // The caption was written optimistically; correct it so the page
      // never claims a screenshot it failed to load.
      setCaption(canvas, LABEL_GENERATED);
    };
    img.src = src;
  }

  /* ── public ───────────────────────────────────────────────────────── */

  /* Markup only — drawing happens in hydrate(), after the node is live. */
  function markup(boss) {
    var label = boss.portrait ? LABEL_PHOTO : LABEL_GENERATED;
    return "<figure class=\"portrait\">" +
             "<div class=\"portrait-frame\">" +
               "<canvas class=\"portrait-canvas portrait-pending\" " +
               "data-portrait=\"" + window.Render.esc(boss.id) + "\" " +
               "role=\"img\" aria-label=\"" +
               window.Render.esc(boss.designation) + "\"></canvas>" +
             "</div>" +
             "<figcaption>" + label + "</figcaption>" +
           "</figure>";
  }

  /* An emblem is optional decoration, not a portrait — so it gets no
     generated fallback. If the file is absent the whole badge is removed
     rather than replaced with a meaningless sprite. */
  function emblemMarkup(boss) {
    if (!boss.emblem) return "";
    return "<figure class=\"emblem\">" +
             "<canvas class=\"emblem-canvas\" " +
             "data-portrait=\"" + window.Render.esc(boss.id) + "\" " +
             "data-kind=\"emblem\" role=\"img\" aria-label=\"Emblem of " +
             window.Render.esc(boss.alias || boss.designation) + "\"></canvas>" +
             "<figcaption>UNIT INSIGNIA</figcaption>" +
           "</figure>";
  }

  function hydrate(root) {
    var nodes = (root || document).querySelectorAll("[data-portrait]");
    for (var i = 0; i < nodes.length; i++) {
      var canvas = nodes[i];
      if (canvas.getAttribute("data-source")) continue;   // already drawn
      var boss = window.Render.byId(window.AC6_BOSSES || [],
                                    canvas.getAttribute("data-portrait"));
      if (!boss) continue;

      if (canvas.getAttribute("data-kind") === "emblem") {
        if (boss.emblem) drawImageSource(canvas, boss, boss.emblem, 72);
        continue;
      }

      if (boss.portrait) {
        drawImageSource(canvas, boss, boss.portrait, PIXEL_W);
      } else {
        drawSprite(canvas, boss);
        canvas.classList.remove("portrait-pending");
      }
    }
  }

  /* ── page backdrop ────────────────────────────────────────────────── */

  var BACKDROP_W = 190;   // wider than a portrait: it is displayed huge
  var backdropPick = null;   // held so a repaint keeps the same machine

  /* Paints one boss portrait, chosen at random per visit, into the
     full-page backdrop canvas. Decoration with no fallback: if the file
     is missing or the list is empty, the canvas simply stays empty. */
  function backdrop(canvas) {
    if (!canvas) return;
    var pool = (window.AC6_BOSSES || []).filter(function (b) { return b.portrait; });
    if (!pool.length) { canvas.style.display = "none"; return; }

    var pick = backdropPick || pool[Math.floor(Math.random() * pool.length)];
    backdropPick = pick;
    var img = new Image();
    img.onload = function () {
      paint(canvas, img, BACKDROP_W);
      canvas.setAttribute("data-backdrop", pick.id);
    };
    img.onerror = function () { canvas.style.display = "none"; };
    img.src = pick.portrait;
  }

  /* Redraw everything on the current ramp. Called when the phosphor is
     swapped: the artwork is quantised, not tinted, so CSS alone cannot
     follow a palette change. */
  function repaint() {
    var nodes = document.querySelectorAll("[data-portrait]");
    for (var i = 0; i < nodes.length; i++) nodes[i].removeAttribute("data-source");
    hydrate(document);
    backdrop(document.getElementById("backdrop"));
  }

  return {
    markup: markup,
    emblemMarkup: emblemMarkup,
    hydrate: hydrate,
    backdrop: backdrop,
    repaint: repaint
  };
})();
