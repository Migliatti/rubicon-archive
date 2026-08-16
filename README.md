# RUBICON ARCHIVE

An unofficial **Armored Core VI: Fires of Rubicon** fan site, styled as a terminal
you boot into. Phase 1 ships two sections: **target dossiers** (boss guides) and
the **archive** (lore), plus a doctrine page for the cult framing.

## Running it

Double-click `index.html`. That's the whole procedure.

There is no build step, no `npm install`, and no dev server. The site is plain
HTML, CSS, and ES5-compatible JavaScript.

**Why no modules or JSON:** ES modules and `fetch()` are both blocked by CORS
under the `file://` protocol. All data ships as classic `<script src>` files that
assign to globals (`window.AC6_BOSSES`, `window.AC6_LORE`, `window.AC6_CREED`).
Keep it that way and the site will always open by double-click.

### Serving it over http (optional)

Some browser tooling refuses `file://` URLs. There's no Node or Python on this
machine, so `tools/serve.ps1` is a ~40-line PowerShell static server:

```bash
powershell -ExecutionPolicy Bypass -File tools/serve.ps1
```

Then open <http://localhost:8765/>. You do not need this for normal use.

## Layout

```
index.html                  the shell — script order matters, see below
assets/css/terminal.css     all styling; palette lives in :root
assets/js/boot.js           boot animation, runs last, hands off to the router
assets/js/router.js         hash routing (#/bosses, #/boss/balteus, #/lore/coral)
assets/js/render.js         every view; each renderer returns an HTML string
assets/js/portrait.js       boss imagery — pixelation, dithering, fallback sprites
assets/js/terminal.js       the side console: commands, scrollback, open/close
assets/js/keybar.js         function key bar: F1-F6, F8 phosphor, key bindings
assets/img/bosses/          portraits + emblems (see the README in there)
data/bosses.js              window.AC6_BOSSES
data/lore.js                window.AC6_LORE
data/creed.js               window.AC6_CREED — boot log, banner, doctrine
tools/serve.ps1             optional local http server (no Node required)
.claude/launch.json         preview config pointing at that server
```

Scripts must load in this order: `data/*` (globals only) → `render` → `portrait`
→ `router` → `terminal` → `keybar` → `boot`. `boot.js` calls `Keybar.init()`,
`Router.start()` and `Terminal.init()` when the animation finishes; the router
calls `Portrait.hydrate()` and `Keybar.mark()` after every paint.

## Keys

`F1` home · `F2` targets · `F3` archive · `F4` doctrine · `F5` spoilers ·
`F6` console · `F8` phosphor. The bare digits `1`–`6` and `8` are bound to the
same actions, because browsers reserve parts of the function row. Every key is
also a button in the bar at the bottom of the screen, and every action it
performs is reachable by clicking something else.

`F8` cycles coral → amber → green. The choice is stored in `localStorage`
(`rubicon.phosphor`) and the artwork is redrawn, not re-tinted — `portrait.js`
quantises to the phosphor ramp at draw time, so `Portrait.repaint()` runs on
every swap.

Below 700px the key bar becomes the whole navigation: the function labels are
hidden (a phone has no function row) and the top nav is removed rather than
duplicated.

## Adding a boss

Append an object to the array in `data/bosses.js`. The full schema is documented
in the comment at the top of that file. The minimum viable entry:

```js
{
  id: "some-slug",
  designation: "XX-00: NAME",
  alias: "",
  chapter: 3,
  mission: "Mission Name",
  type: "MT",            // "MT" | "AC" | "Weapon"
  threat: 3,             // 1-5, editorial
  summary: "Two or three sentences.",
  phases: [{ name: "PHASE 1", behavior: "...", counter: "..." }],
  weaknesses: ["..."],
  loadoutHints: ["..."],
  verified: true,
  sources: ["https://..."],

  // optional
  portrait: "assets/img/bosses/some-slug.webp",
  emblem: "assets/img/bosses/some-slug-emblem.png"
}
```

It appears automatically at `#/boss/some-slug`, grouped under its chapter, and
becomes reachable via `boss some-slug` at the prompt. Nothing else to wire up.

Set `verified: false` for anything you could not corroborate across two sources —
the entry then renders an UNVERIFIED chip and a warning banner. Please keep using
this rather than quietly asserting shaky numbers.

## Adding a lore record

Append to `data/lore.js`. Categories are `Rubicon`, `Coral`, `Factions`,
`Characters`, `Endings` (that's also the display order; unknown categories sort to
the end). `related` takes an array of other entry ids and renders as
cross-reference links.

**Spoilers:** set `spoiler: true` on anything a first-time player would rather
find in the game. Sealed entries render blurred behind a DECRYPT button until the
reader unlocks spoilers. All ending entries must stay sealed. Boss dossiers from
Chapter 2 onward are sealed automatically — that's driven by `chapter`, not by a
per-entry flag.

The reader's choice is stored in `localStorage` under `rubicon.spoilers`.

## Terminal commands

`help` · `list targets` · `list records` · `boss <name>` · `lore <name>` ·
`doctrine` · `spoilers on|off` · `home` · `clear`

Commands live in a console docked to the right edge, with its own scrollback: you
type on one side and the page navigates on the other. `CONSOLE` in the nav toggles
it, `/` opens and focuses it from anywhere, `Esc` closes it. The open/closed
choice is stored in `localStorage` under `rubicon.console`.

Lookup is forgiving: exact id, then id prefix, then a substring of the display
name — so `boss balt` finds `AAP07: BALTEUS`. Arrow Up/Down walks command history.

There are a few undocumented commands. Finding them is the point.

Every command is a shortcut for something that is also clickable. The console does
not exist below 900px — no room to dock it, no keyboard to enjoy it — so it must
never be the only route to a page.

## The look

Six rules hold the whole thing together. Break them deliberately or not at all.

0. **It is an application, not a document.** Layout unit is the `.panel` —
   framed, with an inverse-video title bar carrying a label and a readout.
   Indexes are `.grid` tables, one line per record, tabular numerals, columns
   that scroll sideways rather than wrap. Tight leading, no tracking on body
   copy. A key bar states what the keys do, always.
1. **The page is an object on a wall.** The content sits in a bordered slab
   (`.crt`) inset by `--frame`, with a hatched field showing around it. The
   console is a second slab on the same wall, not a browser drawer.
2. **Two colours, two voices.** Coral (`--phos`) is the archive talking. Ice
   (`--ice`) is the machine talking about itself — counts, classifications,
   the clock, the identity strip. Nothing else gets a colour.
   Within coral: **dim is for lines, bright is for fills.** `--phos-dim` is
   borders and rails only. Anything with the ground knocked out of it — the
   status strip, section stamps, phase labels, a hovered row — fills with
   `--phos`, because black on `--phos-dim` is 1.9:1 and nobody can read it.
3. **Hard edges only.** No soft gradients, no blur, no vignette. Shadows are
   flat offsets (`7px 7px 0 #000`); redaction is hazard tape, not a blur;
   section labels are solid stamps. Striped patterns with hard colour stops
   are fine — they read as flat ink, not as a fade.
4. **One image, enormous and unexplained.** `#backdrop` is a boss portrait
   picked at random per visit, dithered by `portrait.js` at ~190px and
   upscaled behind everything. The slab is translucent (`--bg-slab`) so it
   bleeds through the text. It is texture, never illustration.
5. **The beam scans the display type too.** Exactly two things are allowed
   off the character grid: the page title (`.title`, via `Render.title()`)
   and the doctrine numerals. The title is struck through with hard
   phosphor stripes via `background-clip: text` — not a gradient, hard
   stops, the same flat ink as the hazard tape. Everything else is on the
   grid at one of four sizes (`--t-xs`/`--t-sm`/`--t-md`/`--t-lg`); if you
   reach for a fifth, the thing you are styling probably wants an existing
   one.

The palette is CSS custom properties on `:root` in `terminal.css`. Swapping the
phosphor is three values:

```css
--phos:      #ffb000;             /* amber */
--phos-dim:  #a06c00;
--phos-glow: rgba(255,176,0,0.35);
```

Green (`#33ff77` / `#1c8a41`) is the other obvious option. The portraits and the
backdrop read `--phos` off `:root` at draw time, so the artwork follows.

The boot sequence is data, not code — edit the `boot` array in `data/creed.js`.
It runs once per browser session (`sessionStorage`), is skipped entirely on deep
links and under `prefers-reduced-motion`, and any key or click aborts it.

## Deploying

It's a static site, so anything works:

- **GitHub Pages** — push the folder, enable Pages on the branch root.
- **Netlify / Vercel** — drag the folder in. No build command, no output directory.

Hash routing means there are no server rewrite rules to configure.

## Not yet built

Builds catalogue, parts database, and search. The boss schema already carries
`loadoutHints` so build entries can link back to dossiers without a migration.

## Legal

Unofficial fan project. ARMORED CORE VI: FIRES OF RUBICON is the property of
FromSoftware and Bandai Namco. No affiliation, no endorsement.
