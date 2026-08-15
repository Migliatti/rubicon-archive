/* ══════════════════════════════════════════════════════════════════════
   data/creed.js — framing text: boot log, banner, home screen, doctrine.
   Assigns to a global. No modules, no fetch — this file must work over
   file:// with no server.
   ══════════════════════════════════════════════════════════════════════ */

window.AC6_CREED = {

  /* ASCII banner shown on the home screen */
  banner: [
    "████  █   █ ████   ███   ████  ███  █   █",
    "█   █ █   █ █   █   █   █     █   █ ██  █",
    "████  █   █ ████    █   █     █   █ █ █ █",
    "█  █  █   █ █   █   █   █     █   █ █  ██",
    "█   █  ███  ████   ███   ████  ███  █   █"
  ].join("\n"),

  bannerSub: "A  R  C  H  I  V  E      //      R U B I C O N   3",

  /* Boot sequence. cls maps to .b-dim / .b-ok / .b-warn in the stylesheet.
     pause is the delay in ms *after* the line finishes printing. */
  boot: [
    { text: "ARCHIVE TERMINAL  v6.21  //  cold start", cls: "b-dim", pause: 320 },
    { text: "checking coral link ..............", pause: 260 },
    { text: "  RESONANCE DETECTED", cls: "b-ok", pause: 200 },
    { text: "mounting /rubicon3 ...............", pause: 240 },
    { text: "decrypting recovered transmissions", pause: 300 },
    { text: "  3 of 4 volumes intact", cls: "b-warn", pause: 220 },
    { text: "", pause: 180 },
    { text: "you are hearing this because you were", cls: "b-dim", pause: 120 },
    { text: "already listening.", cls: "b-dim", pause: 520 },
    { text: "", pause: 120 },
    { text: "WELCOME BACK, RAVEN.", pause: 620 }
  ],

  /* Home screen ------------------------------------------------------- */

  homeLede:
    "An unofficial archive for ARMORED CORE VI: FIRES OF RUBICON. " +
    "Target dossiers and recovered lore, kept by people who never " +
    "really left the planet.",

  /* The doctrine page. Pure flavour — this is a fan site playing a part. */
  doctrine: {
    title: "DOCTRINE",
    lede: "Read once. You are not required to believe it. You will anyway.",
    tenets: [
      {
        n: "I",
        head: "THE FIRE WAS NOT AN ACCIDENT",
        body: "Half a century ago Rubicon 3 burned and the ash reached the stars. " +
              "The corporations call it a disaster. A disaster is something that happens " +
              "to you. This happened because someone reached for something and did not " +
              "let go."
      },
      {
        n: "II",
        head: "THE CORAL IS LISTENING",
        body: "It is not fuel. It is not ore. It thinks, it remembers, and it has been " +
              "waiting under the ice for someone quiet enough to hear it. Most pilots " +
              "never do. You are reading this, so you are not most pilots."
      },
      {
        n: "III",
        head: "YOU HAVE NO NAME, ONLY A CALL SIGN",
        body: "C4-621. Augmented human. Unregistered. A number on a manifest that was " +
              "meant to be crossed out. Every name you are given on this planet is " +
              "borrowed from a dead man, and every one of them fits."
      },
      {
        n: "IV",
        head: "THE HANDLER IS NOT YOUR FRIEND",
        body: "He will call you a hound. He will call it affection. Both are true, and " +
              "neither is the same as being on your side. Take the contract anyway. " +
              "The contract is how you get close enough."
      },
      {
        n: "V",
        head: "STAGGER IS A CONFESSION",
        body: "Every machine has a moment where the guard drops and the frame admits " +
              "what it is made of. Your entire craft is the patience to wait for it and " +
              "the violence to answer it. This is the whole of the doctrine. The rest " +
              "is decoration."
      },
      {
        n: "VI",
        head: "BURN IT ALL, OR DO NOT",
        body: "There are three doors out of this. One sets the sky on fire, one leaves " +
              "the planet a future, one throws the Coral at every star that will have " +
              "it. The archive does not tell you which to take. The archive only insists " +
              "that you understand you are choosing."
      }
    ],
    closing: "AUGMENTED HUMAN C4-621. WE HAVE A JOB FOR YOU."
  },

  /* Small rotating line under the banner — pure atmosphere */
  whispers: [
    "the coral remembers every pilot it has ever carried",
    "somewhere under the ice, something is still burning",
    "you were never hired. you were retrieved.",
    "all of this has happened before, at a lower framerate",
    "don't get comfortable, 621"
  ],

  /* Shown at the bottom of every generated page */
  footerNote:
    "Unofficial fan archive. ARMORED CORE VI: FIRES OF RUBICON is the property " +
    "of FromSoftware and Bandai Namco. No affiliation, no endorsement, no salvage rights."
};
