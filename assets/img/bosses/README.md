# Boss portraits

**The filename must match the boss `id`** in `data/bosses.js`, and the
`portrait` path there must include the right extension. Currently present:

| file | boss id |
|---|---|
| `hc-helicopter.webp` | `hc-helicopter` |
| `strider.webp` | `strider` |
| `juggernaut.webp` | `juggernaut` |
| `sulla.png` | `sulla` |
| `sulla-emblem.png` | `sulla` (emblem) |
| `balteus.webp` | `balteus` |

To add another, drop the file here and point at it:

```js
{
  id: "sea-spider",
  portrait: "assets/img/bosses/sea-spider.webp",
  ...
}
```

A boss with no `portrait` field gets a generated scan-signature sprite
instead, and so does one whose file fails to load — nothing breaks and no
dossier is left with a hole in it. Add images one at a time, in any order.

## Emblems

`emblem:` is a second, optional image for a unit insignia, shown as a small
badge beside the portrait. Unlike portraits it has **no generated fallback**:
if the file is missing the badge is removed entirely, because an invented
insignia would be a lie rather than a placeholder.

## What to save

The canvas downscales whatever you give it to 152px wide, so **resolution
is mostly wasted**. Around 600–1000px wide and under ~150KB is plenty.

**Crop tight on the machine.** This is the one thing that actually decides
whether a portrait reads. A wide arena shot leaves the subject a few dozen
pixels across after the downscale. The silhouette is all that survives, so
make the silhouette the frame.

## How the look is produced

Three steps, all in `assets/js/portrait.js`:

1. **Downscale** to 152px — the pixelation is real, not a CSS filter.
2. **Contrast stretch** across the 2nd–98th percentile, because game
   screenshots are often fogged or backlit and would otherwise quantise
   down to two flat levels.
3. **Ordered dithering** (4×4 Bayer) into a 5-colour phosphor ramp. This is
   what keeps detail legible at five colours; without it busy screenshots
   collapse into unreadable blobs.

## Formats

`.webp`, `.jpg`, `.png` all work. Keep whatever the source gave you.

## One caveat

The duotone quantisation reads pixels back off the canvas, which browsers
block for local images under `file://`. Opening `index.html` by double-click
will still show the pixelated portrait, just without the coral tint. Served
over http (`tools/serve.ps1`, or the live site) it tints correctly. Generated
sprites are unaffected either way.

## Rights

Screenshots from ARMORED CORE VI are FromSoftware / Bandai Namco material.
This is an unofficial fan archive and says so in the footer. Keep them
self-hosted here rather than hotlinked, and don't present them as your own.
