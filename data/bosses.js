/* ══════════════════════════════════════════════════════════════════════
   data/bosses.js — target dossiers.

   Schema per entry:
     id            url slug, lowercase, no spaces
     designation   in-game unit designation (shown as the title)
     alias         pilot / callsign, if any
     chapter       1-5
     mission       mission the fight occurs in
     type          "MT" | "AC" | "Weapon"
     threat        1-5, editorial: how hard it hits a blind first-timer
     summary       2-3 sentences, in-world voice
     phases        [{ name, behavior, counter }]
     weaknesses    string[]
     loadoutHints  string[]  — archetype level, not full builds (that's Phase 2)
     quote         { text, by } (optional)
     verified      false marks claims not corroborated across two sources
     sources       URLs consulted

   Threat scores are this archive's opinion. Everything else is sourced.
   ══════════════════════════════════════════════════════════════════════ */

window.AC6_BOSSES = [

  /* ── CHAPTER 1 ──────────────────────────────────────────────────── */

  {
    id: "hc-helicopter",
    designation: "AH12: HC HELICOPTER",
    alias: "",
    chapter: 1,
    mission: "Illegal Entry",
    type: "MT",
    threat: 1,
    summary:
      "The planet's first answer to an unregistered pilot: a gunship, and the " +
      "assumption that a gunship is enough. It is not a hard fight. It is a " +
      "grammar lesson — this is what a boss looks like, this is what a stagger " +
      "bar does, this is how little the corporations think of you.",
    phases: [
      {
        name: "SINGLE PHASE — STANDOFF",
        behavior:
          "Holds altitude, rakes the ground with autocannon fire and salvos of " +
          "missiles, and repositions whenever you close.",
        counter:
          "Boost straight underneath it. From directly below, most of its fire " +
          "angles are dead, and it has to reposition before it can shoot you again."
      }
    ],
    weaknesses: [
      "It commits fully to each reposition — the drift after a move is your free window.",
      "Its missile salvos track slowly; a single quick boost sideways breaks the lock.",
      "It has no shield and no phase change. Sustained fire simply ends it."
    ],
    loadoutHints: [
      "Your starting kit is sufficient. This fight is not a gear check.",
      "Missiles trivialise it if you would rather not learn the altitude game yet.",
      "Practise quick boost timing here. Balteus will ask for it and will not be patient."
    ],
    quote: { text: "Take it down. Consider it your entrance exam.", by: "HANDLER WALTER" },
    verified: true,
    sources: [
      "https://game8.co/games/armored-core-6/archives/424842",
      "https://armoredcore6.wiki.fextralife.com/Bosses"
    ]
  },

  {
    id: "strider",
    designation: "EB-0309 STRIDER",
    alias: "Weaponized Mining Ship",
    chapter: 1,
    mission: "Destroy the Weaponized Mining Ship",
    type: "Weapon",
    threat: 2,
    summary:
      "A walking city with guns bolted to it. Rubicon's industry never stopped " +
      "after the Fires — it just learned to walk away from whatever it had finished " +
      "eating. Strider is less a duel than a demolition contract with a timer and " +
      "a very large amount of return fire.",
    phases: [
      {
        name: "APPROACH",
        behavior:
          "Point-defence turrets and missile batteries cover the hull while you " +
          "cross open ground toward the legs.",
        counter:
          "Do not fight the escorts. Assault boost through the flak, get inside " +
          "the silhouette, and start on the leg generators."
      },
      {
        name: "DEMOLITION",
        behavior:
          "With generators destroyed the ship keeps firing while you work the " +
          "structure down. Damage output rises as you strip the plating.",
        counter:
          "Explosive and kinetic weapons chew structure far faster than energy. " +
          "Stay under the hull where the heavy batteries cannot depress."
      }
    ],
    weaknesses: [
      "Structural targets, not a stagger contest — bring damage, not finesse.",
      "The underside is a blind spot for most of its armament.",
      "Escort MTs respawn; killing them is a waste of ammunition and clock."
    ],
    loadoutHints: [
      "Bazookas, grenade launchers, and missiles. Anything with splash.",
      "Ammunition economy matters more than usual — there is a lot of hull here.",
      "Reverse-joint or tetrapod legs help you hold position under the ship."
    ],
    verified: true,
    sources: [
      "https://armoredcore6.wiki.fextralife.com/EB-0309_STRIDER",
      "https://game8.co/games/armored-core-6/archives/424842"
    ]
  },

  {
    id: "juggernaut",
    designation: "HA-T-102 JUGGERNAUT",
    alias: "",
    chapter: 1,
    mission: "Operation Wallclimber",
    type: "MT",
    threat: 2,
    summary:
      "A wall that charges. The Juggernaut is armoured to absurdity across the " +
      "front and completely uninterested in your existence behind it. It is the " +
      "game explaining, without words, that a target's geometry is a weapon you " +
      "can take away from it.",
    phases: [
      {
        name: "SINGLE PHASE — THE CHARGE",
        behavior:
          "Faces you and rushes in a straight line. Frontal plating shrugs off " +
          "almost everything you own.",
        counter:
          "Dodge laterally, then attack the exposed rear. It must complete the " +
          "charge and turn around before it can threaten you again."
      }
    ],
    weaknesses: [
      "The rear is effectively unarmoured. The whole fight is about being behind it.",
      "It cannot turn mid-charge — every rush hands you several free seconds.",
      "Explosive damage and plasma bypass the frontal armour problem entirely.",
      "Fighting from the air removes most of its threat profile."
    ],
    loadoutHints: [
      "Plasma missiles and bazookas are the classic answer.",
      "Vertical missiles hit the top plating, which is far softer than the face.",
      "Do not stand in front of it. There is no version of that plan that works."
    ],
    verified: true,
    sources: [
      "https://game8.co/games/armored-core-6/archives/424842",
      "https://armoredcore6.wiki.fextralife.com/Bosses"
    ]
  },

  {
    id: "sulla",
    designation: "ENTANGLE",
    alias: "G6 Sulla",
    chapter: 1,
    mission: "Attack the Watchpoint",
    type: "AC",
    threat: 2,
    summary:
      "Your first real AC duel against a pilot who thinks he outranks you. He is " +
      "fast, arrogant, and functionally a warm-up act — the mission puts him in " +
      "front of Balteus specifically so you arrive at the real fight already tired.",
    phases: [
      {
        name: "SINGLE PHASE — DUEL",
        behavior:
          "Circles at speed, fires from range, and closes to melee when you hold " +
          "still. Uses the terrain to break your lock.",
        counter:
          "Keep distance and keep moving. Punish the recovery after his approach " +
          "rather than trading with him at knife range."
      }
    ],
    weaknesses: [
      "Predictable approach pattern — he telegraphs the close.",
      "Staggers quickly for an AC; one committed burst opens him up.",
      "Cover breaks his fire more reliably than it breaks yours."
    ],
    loadoutHints: [
      "Whatever you intend to bring to Balteus. Sulla is the dress rehearsal.",
      "Do not burn repair kits here that you will want ninety seconds from now."
    ],
    verified: true,
    sources: [
      "https://game8.co/games/armored-core-6/archives/424842",
      "https://armoredcore6.wiki.fextralife.com/Bosses"
    ]
  },

  {
    id: "balteus",
    designation: "AAP07: BALTEUS",
    alias: "The Wall",
    chapter: 1,
    mission: "Attack the Watchpoint",
    type: "MT",
    threat: 5,
    summary:
      "The most famous filter in the game. Balteus is a floating fortress wrapped " +
      "in a regenerating pulse shield, and it exists to find out whether you have " +
      "actually learned the systems or merely survived them. Most of the people " +
      "who quit AC6 quit here. Most of the people who love AC6 love it because of here.",
    phases: [
      {
        name: "PHASE 1 — THE SHIELD",
        behavior:
          "A pulse shield absorbs damage before it reaches the hull, backed by " +
          "enormous tracking missile salvos and shotgun-range bursts.",
        counter:
          "Pulse damage strips the shield far faster than kinetic or explosive. " +
          "Stay mid-range, airborne, strafing. When the shield fails, assault boost " +
          "in and dump everything — you have roughly a minute before it rebuilds one."
      },
      {
        name: "PHASE 2 — BELOW 40%",
        behavior:
          "Adds sweeping flamethrower attacks that cover a huge arc of the arena, " +
          "and mixes them into the missile pattern.",
        counter:
          "Stop shooting during the flame sweeps and during full missile salvos — " +
          "greed is what kills here. Get underneath it while it commits to slashing " +
          "attacks; melee lands cleanly from below."
      }
    ],
    weaknesses: [
      "Pulse weapons shred the shield. A pulse gun in each hand changes the entire fight.",
      "Once staggered, an assault-boosted pulse blade takes a brutal chunk of health.",
      "The missile phase is not a damage window. Quick boost, do not counterattack.",
      "It rebuilds the shield on a timer — damage inside the window, not around it."
    ],
    loadoutHints: [
      "Dual pulse guns for the shield, then something heavy for the staggered window.",
      "Return to the garage before this fight. Balteus is a genuine build check.",
      "Boost tuning and energy management matter more than raw damage numbers."
    ],
    quote: {
      text: "You have got to be kidding me. That's an AAP07.",
      by: "RECOVERED COMMS FRAGMENT"
    },
    verified: true,
    sources: [
      "https://www.pcgamer.com/armored-core-6-balteus-boss-how-to-beat-best-build/",
      "https://armoredcore6.wiki.fextralife.com/AAP07:_BALTEUS",
      "https://gamerant.com/armored-core-6-ac6-fires-of-rubicon-how-beat-balteus-best-build-tips-strategies/"
    ]
  },

  /* ── CHAPTER 2 ──────────────────────────────────────────────────── */

  {
    id: "smart-cleaner",
    designation: "EC-0804 SMART CLEANER",
    alias: "",
    chapter: 2,
    mission: "Infiltrate Grid 086",
    type: "MT",
    threat: 3,
    summary:
      "An industrial disposal unit that was never told the facility was abandoned, " +
      "still grinding through a corridor it has cleaned ten thousand times. It does " +
      "not hate you. It has simply classified you.",
    phases: [
      {
        name: "SINGLE PHASE — THE GRINDER",
        behavior:
          "Charges down the corridor with a rotating crusher, backed by flame and " +
          "close-range sweeps. The arena is narrow and punishes bad positioning.",
        counter:
          "Fight it from above. Hover legs — or any airtime you can hold — put you " +
          "outside its entire threat envelope while you work the two weak points."
      }
    ],
    weaknesses: [
      "Two exposed weak points; hitting them is dramatically faster than hitting hull.",
      "Everything it does is ground-plane. Altitude is close to an off switch.",
      "Its charge locks it into a straight line down the corridor."
    ],
    loadoutHints: [
      "Hover or tetrapod legs to strike from above and stay there.",
      "Anything with reach — you want to be shooting it from where it cannot answer."
    ],
    verified: true,
    sources: [
      "https://game8.co/games/armored-core-6/archives/424842",
      "https://armoredcore6.wiki.fextralife.com/Bosses"
    ]
  },

  {
    id: "sea-spider",
    designation: "IA-13: SEA SPIDER",
    alias: "C-Weapon",
    chapter: 2,
    mission: "Ocean Crossing",
    type: "Weapon",
    threat: 5,
    summary:
      "The first thing you meet that was not built by anyone still alive. Sea Spider " +
      "is an Institute C-Weapon — Coral-era technology, dug up and still running its " +
      "last order. It has no weak point and no mercy, and it is where a lot of " +
      "second playthroughs actually begin.",
    phases: [
      {
        name: "PHASE 1 — GROUNDED",
        behavior:
          "Anchors to the deck and works a massive charged laser cannon across the " +
          "arena, layered with double-beam sweeps and melee slams. This is the harder half.",
        counter:
          "The cannon mouth glows red before it fires. When it does, close the " +
          "distance and orbit tight — the turret cannot track a fast target at " +
          "point-blank. On the double-beep audio cue, dodge sideways twice."
      },
      {
        name: "PHASE 2 — BELOW 50%",
        behavior:
          "Lifts off and fights airborne, converting the whole arena into its range.",
        counter:
          "Go up with it and stay up. Manage boost so you always have a quick boost " +
          "in reserve; running dry in the air is how this phase kills you."
      }
    ],
    weaknesses: [
      "Extremely vulnerable to ACS strain — it staggers far more readily than it looks.",
      "The charged cannon is slow to traverse; speed beats it outright.",
      "Its heaviest attacks are all announced, by light or by sound, before they land."
    ],
    loadoutHints: [
      "Songbirds grenade launchers or a 10-cell missile launcher on the shoulders to build stagger.",
      "Explosive in the right hand; melee for the staggered window.",
      "Legs that let you keep firing while moving. Standing still is not survivable here."
    ],
    quote: {
      text: "That thing predates every flag flying on this planet.",
      by: "ARCHIVE ANNOTATION"
    },
    verified: true,
    sources: [
      "https://www.pcgamer.com/armored-core-sea-spider-how-to-beat-best-build/",
      "https://gamerant.com/armored-core-6-vi-fires-of-rubicon-how-beat-sea-spider-best-build-ac6/",
      "https://segmentnext.com/armored-core-6-sea-spider/"
    ]
  },

  /* ── CHAPTER 3 ──────────────────────────────────────────────────── */

  {
    id: "heavy-warship",
    designation: "AS07: HEAVY WARSHIP",
    alias: "",
    chapter: 3,
    mission: "Steal the Survey Data",
    type: "Weapon",
    threat: 3,
    summary:
      "A PCA capital ship, and the moment the Planetary Closure Administration stops " +
      "being a rumour in a briefing and becomes a shape in the sky. Everything Balam " +
      "and Arquebus have thrown at each other, the PCA parks in orbit and forgets about.",
    phases: [
      {
        name: "SINGLE PHASE — BROADSIDE",
        behavior:
          "Saturates the airspace with turret fire and missile batteries while " +
          "holding altitude over the map.",
        counter:
          "Close to the hull and stay tucked against it. The heavy batteries " +
          "cannot depress far enough to reach a target sitting on top of them."
      }
    ],
    weaknesses: [
      "Turret clusters are destructible — thinning them thins the incoming fire.",
      "Point-blank is safer than mid-range. Its armament is built for distance.",
      "It is a structure fight, not a stagger fight. Raw damage wins."
    ],
    loadoutHints: [
      "Sustained-fire weapons over burst — there is a great deal of hull to remove.",
      "Legs that hold altitude comfortably; falling out of the sky is the main hazard."
    ],
    verified: true,
    sources: [
      "https://armoredcore6.wiki.fextralife.com/AS07:+HEAVY+WARSHIP",
      "https://game8.co/games/armored-core-6/archives/424842"
    ]
  },

  {
    id: "ice-worm",
    designation: "IA-02: ICE WORM",
    alias: "C-Weapon",
    chapter: 3,
    mission: "Destroy the Ice Worm",
    type: "Weapon",
    threat: 4,
    summary:
      "A C-Weapon the size of a district, swimming through the ice sheet. This is the " +
      "one fight the game refuses to let you take alone — independent mercenaries, " +
      "corporate pilots, and a stolen railgun, all pointed at the same thing. For one " +
      "mission Rubicon agrees on something.",
    phases: [
      {
        name: "PHASE 1 — SURFACING",
        behavior:
          "Breaches, sweeps the field with its body and beam, and submerges again. " +
          "Its shield has to come down before the railgun can do anything.",
        counter:
          "Strip the shield, and your allies fire the railgun to bring the head down. " +
          "The face is the only thing that takes real damage — put everything into it " +
          "while it is grounded."
      },
      {
        name: "PHASE 2 — DRONES",
        behavior: "Deploys support drones that harass you during the approach.",
        counter:
          "Ignore what you can, clear what you cannot. Clock is the real enemy — " +
          "the railgun has a limited number of shots."
      },
      {
        name: "PHASE 3 — DISCHARGE",
        behavior:
          "Throws out sweeping gouts of red electrical discharge across the field.",
        counter:
          "Keep moving through the whole phase. Two stun needle hits are enough to " +
          "put it down again here — but if you fail the final railgun window, " +
          "the mission ends."
      }
    ],
    weaknesses: [
      "Only the face takes meaningful damage, and only while it is downed.",
      "Stun needles bring it down efficiently; the launcher is handed to you beforehand.",
      "Damage per stagger window is what decides this fight — the railgun will not wait."
    ],
    loadoutHints: [
      "VE-60SNA stun needle launchers on the shoulders — this is what they are for.",
      "Dual gatling guns can end it inside a single downed window.",
      "If you are not killing it in the windows you have, the problem is damage output, not skill."
    ],
    quote: {
      text: "Every gun on this planet, aimed at the same thing. Enjoy it. It won't last.",
      by: "ARCHIVE ANNOTATION"
    },
    verified: true,
    sources: [
      "https://www.gamespot.com/articles/armored-core-6-ice-worm-boss-fight-guide/1100-6517153/",
      "https://www.powerpyx.com/armored-core-6-vi-ice-worm-boss-guide/",
      "https://gamerant.com/armored-core-6-ac6-fires-of-rubicon-how-to-beat-ice-worm-best-build/"
    ]
  },

  /* ── CHAPTER 4 ──────────────────────────────────────────────────── */

  {
    id: "enforcer",
    designation: "AAP03: ENFORCER",
    alias: "Enforcement System",
    chapter: 4,
    mission: "Underground Exploration — Depth 2",
    type: "MT",
    threat: 3,
    summary:
      "Down here the Institute left caretakers, and they have been enforcing a " +
      "quarantine for fifty years against nobody at all. The Enforcer does not " +
      "negotiate and does not report. It simply resumes.",
    phases: [
      {
        name: "SINGLE PHASE — ENFORCEMENT",
        behavior:
          "Aggressive close-range pressure in a confined chamber, with heavy " +
          "energy attacks that punish standing still.",
        counter:
          "Build stagger fast with grenade cannons, then convert the window with " +
          "sustained fire. Light treads give you the stability to hold the line."
      }
    ],
    weaknesses: [
      "Staggers well under explosive pressure.",
      "The arena is enclosed — its ranged options matter less than its melee ones.",
      "Its openings are long relative to its damage; patience is affordable here."
    ],
    loadoutHints: [
      "Grenade cannons to stagger, gatling guns to cash in.",
      "Light treads are the community-standard answer for this stretch of Chapter 4."
    ],
    verified: true,
    sources: [
      "https://game8.co/games/armored-core-6/archives/424842",
      "https://armoredcore6.wiki.fextralife.com/Bosses"
    ]
  },

  {
    id: "ephemera",
    designation: "IA C01: EPHEMERA",
    alias: "Enforcement System",
    chapter: 4,
    mission: "Underground Exploration — Depth 3",
    type: "Weapon",
    threat: 4,
    summary:
      "Deeper still, and the caretakers stop looking like machinery. Ephemera moves " +
      "like something that was designed by people who had already stopped thinking " +
      "of machines as tools. The fight is on a timer — the chamber will not hold.",
    phases: [
      {
        name: "SINGLE PHASE — TWO MINUTES",
        behavior:
          "Extremely mobile, with fast energy attacks, under a hard two-minute " +
          "mission clock.",
        counter:
          "You cannot play this defensively. Stun launchers to force the stagger, " +
          "shotguns to delete health inside it. Two clean stagger windows is the plan."
      }
    ],
    weaknesses: [
      "Stun weapons cut through its mobility advantage.",
      "Enormous damage taken while staggered — the whole fight is stagger economy.",
      "The clock cuts both ways: it forces aggression, which is the correct play anyway."
    ],
    loadoutHints: [
      "Stun needle launchers plus shotguns. This is the Chapter 4 workhorse pairing.",
      "Do not bring a slow build. There is no time to reposition twice."
    ],
    verified: true,
    sources: [
      "https://game8.co/games/armored-core-6/archives/424842",
      "https://armoredcore6.wiki.fextralife.com/Bosses"
    ]
  },

  {
    id: "cel-240",
    designation: "IB-01: CEL 240",
    alias: "Ibis Series",
    chapter: 4,
    mission: "Reach the Coral Convergence",
    type: "Weapon",
    threat: 5,
    summary:
      "An Ibis-series unit — the same family of machine that set this planet on fire " +
      "half a century ago. It is widely held to be the hardest fight in the campaign, " +
      "and it earns that by killing you in one attack, twice, from full health.",
    phases: [
      {
        name: "PHASE 1 — THE OPENER",
        behavior:
          "Always opens identically: a rain of lasers, followed immediately by a " +
          "sweeping melee attack. Then relentless energy pressure at every range.",
        counter:
          "Move hard left or right for the lasers, then fly or jump straight up for " +
          "the sweep. Stay close-to-mid and orbit it; stun it as fast as you can and " +
          "empty everything into the window."
      },
      {
        name: "PHASE 2 — IT GETS BACK UP",
        behavior:
          "Dying once does not end it. It rises with new moves: multiple sword " +
          "swipes and an energy beam, both effectively one-shot kills.",
        counter:
          "Back off to distance and run the same loop. From range you can see both " +
          "new attacks coming; up close you cannot."
      }
    ],
    weaknesses: [
      "Stun needles bring it down consistently despite its speed.",
      "Its opening sequence never varies — the first ten seconds are free if you know them.",
      "Both phase-2 killers are heavily telegraphed at distance."
    ],
    loadoutHints: [
      "VE-60SNA stun needle launchers on both back slots.",
      "Shotguns in both hands — WR-0777 Sweet Sixteen is the common pick.",
      "Keep hard lock-on engaged. Losing it against something this fast loses the fight."
    ],
    quote: {
      text: "Ibis. They kept one. Of course they kept one.",
      by: "ARCHIVE ANNOTATION"
    },
    verified: true,
    sources: [
      "https://www.gamesradar.com/how-to-beat-the-armored-core-6-ib-01-cel-240-boss-in-chapter-4/",
      "https://game8.co/games/armored-core-6/archives/425356",
      "https://www.pushsquare.com/guides/armored-core-6-how-to-beat-ib-01-cel-240"
    ]
  },

  /* ── CHAPTER 5 ──────────────────────────────────────────────────── */

  {
    id: "steel-haze-ortus",
    designation: "STEEL HAZE ORTUS",
    alias: "V.IV Rusty",
    chapter: 5,
    mission: "Breach the Kármán Line",
    type: "AC",
    threat: 4,
    summary:
      "He told you, more than once, that he hoped you would be worth fighting. " +
      "Steel Haze Ortus is that hope cashed in. Of every AC on Rubicon this is the " +
      "one that fights you like an equal, and it is the only duel in the game that " +
      "hurts to win.",
    phases: [
      {
        name: "SINGLE PHASE — THE DUEL",
        behavior:
          "Constant high-speed pressure with laser weaponry and committed melee " +
          "approaches. He does not give you a rhythm to settle into.",
        counter:
          "Fight him in the air. Dodge the melee, then punish the recovery — that " +
          "is the window, and it is the only reliable one."
      }
    ],
    weaknesses: [
      "Every melee commitment is a recovery you can punish.",
      "He is fast but not durable; a full stagger window is close to decisive.",
      "Holding altitude denies him half his approach options."
    ],
    loadoutHints: [
      "A light, agile build. Matching his speed matters more than out-damaging him.",
      "Missiles to interrupt his approaches and build stagger from range."
    ],
    quote: { text: "Show me what you've got, Raven.", by: "V.IV RUSTY" },
    verified: true,
    sources: [
      "https://game8.co/games/armored-core-6/archives/424842",
      "https://armoredcore6.wiki.fextralife.com/Bosses"
    ]
  },

  {
    id: "arquebus-balteus",
    designation: "AAP07A: ARQUEBUS BALTEUS",
    alias: "V.II Snail",
    chapter: 5,
    mission: "Destroy the Drive Block",
    type: "MT",
    threat: 3,
    summary:
      "Arquebus took the thing that nearly ended your career in Chapter 1, put a " +
      "Vesper in the seat, and expected the same result. The rematch is the clearest " +
      "measurement the game offers of how much you have actually changed.",
    phases: [
      {
        name: "SINGLE PHASE — REMATCH",
        behavior:
          "The Balteus pattern — pulse shield, missile salvos, close-range bursts — " +
          "under a pilot who mixes in his own aggression.",
        counter:
          "Same answer as before: strip the shield, then convert. It staggers far " +
          "more readily than the original did. Respect the big attacks and take the rest."
      }
    ],
    weaknesses: [
      "Easily staggered compared to the Chapter 1 encounter.",
      "The pattern is one you already know. Trust the Chapter 1 muscle memory.",
      "Pulse damage still does what pulse damage did."
    ],
    loadoutHints: [
      "Whatever carried you through Chapter 4. This is not a build check.",
      "Pulse options remain the cleanest shield answer if you still run them."
    ],
    quote: { text: "So you're still breathing. How disappointing.", by: "V.II SNAIL" },
    verified: true,
    sources: [
      "https://game8.co/games/armored-core-6/archives/424842",
      "https://armoredcore6.wiki.fextralife.com/Bosses"
    ]
  },

  {
    id: "sol-644-ayre",
    designation: "IB-07: SOL 644",
    alias: "Ayre",
    chapter: 5,
    mission: "Shut Down the Closure Satellites",
    type: "Weapon",
    threat: 5,
    summary:
      "The voice that has been in your head since the ice, in a body at last, on the " +
      "other side of the arena. This is the fight at the end of the road where you " +
      "chose the fire. She is the fastest thing in the game and she is asking you, " +
      "with everything she has, not to do this.",
    phases: [
      {
        name: "SINGLE PHASE — RESONANCE",
        behavior:
          "Overwhelming speed. Ranged sword slashes that throw projectiles, plus a " +
          "charged slash that cannot be dodged laterally.",
        counter:
          "Do not try to match her speed — you will lose. Build for resilience and " +
          "damage instead. Jump over the charged slash; sidestepping it does not work."
      }
    ],
    weaknesses: [
      "Her charged slash has exactly one answer — vertical. Learn it and the fight opens up.",
      "She strafes in predictable arcs between approaches; that is your shot.",
      "Heavy stagger damage from needle-type weapons ends her strings outright."
    ],
    loadoutHints: [
      "Tank or heavy build. Take the hits you cannot avoid and answer with weight.",
      "Needle cannons to punish the strafe.",
      "Trying to out-fly her is the single most common way this fight is lost."
    ],
    quote: { text: "Even now, I would rather have gone with you.", by: "AYRE" },
    verified: true,
    sources: [
      "https://www.thegamer.com/armored-core-6-ib07-sol-644-ayre-boss-guide/",
      "https://www.pcgamesn.com/armored-core-6/bosses"
    ]
  },

  {
    id: "hal-826-walter",
    designation: "IB-C03: HAL 826",
    alias: "Handler Walter",
    chapter: 5,
    mission: "Bring Down the Xylem",
    type: "AC",
    threat: 5,
    summary:
      "He called you a hound for the whole war and meant it as something close to " +
      "kindness. At the end of the Liberator road the Institute has him, and the " +
      "last thing standing between Rubicon and a future is the man who gave you " +
      "every order you ever followed.",
    phases: [
      {
        name: "SINGLE PHASE — HAL 826",
        behavior:
          "Constant movement with consecutive heavy laser attacks and Coral beams, " +
          "escalating into a solar beam that covers the arena.",
        counter:
          "Stay close and match his mobility. Dodge the solar beam by flying " +
          "vertically — lateral movement does not clear it. His laser attack is the " +
          "opening: stagger him from behind while he commits to it."
      }
    ],
    weaknesses: [
      "Less mobile than the alternative final boss — you can actually stay on him.",
      "The Coral beams are slow and readable; only the solar beam demands respect.",
      "Missiles interrupt his basic attacks and build stagger for free."
    ],
    loadoutHints: [
      "Lightweight, agile AC — he is always moving and you must go with him.",
      "Missiles on cooldown to disrupt and build stagger.",
      "Zimmerman shotguns to fill the stagger bar and finish the window."
    ],
    quote: { text: "Show me. What did you become out there?", by: "HANDLER WALTER" },
    verified: true,
    sources: [
      "https://www.thegamer.com/armored-core-6-handler-walter-boss-walkthrough-guide/",
      "https://armoredcore6.wiki.fextralife.com/IB-C03:+HAL+826+Handler+Walter",
      "https://www.pcgamesn.com/armored-core-6/bosses"
    ]
  },

  {
    id: "sol-644-allmind",
    designation: "IB-07: SOL 644 / ALLMIND",
    alias: "ALLMIND — third playthrough only",
    chapter: 5,
    mission: "NG++ exclusive route (Alea Iacta Est)",
    type: "Weapon",
    threat: 5,
    summary:
      "The mercenary support network was never a network. It was one mind, running " +
      "every contract you ever took as an experiment, and this is where it stops " +
      "pretending. Only reachable on a third playthrough, after both other endings " +
      "have been earned.",
    phases: [
      {
        name: "SINGLE PHASE — CONVERGENCE",
        behavior:
          "The SOL 644 frame driven by ALLMIND — the same overwhelming speed and " +
          "sword pressure as the Ayre encounter, with its own attack additions.",
        counter:
          "Play it as you played SOL 644: resilience over speed, vertical evasion " +
          "for the charged slash, punish the strafe."
      }
    ],
    weaknesses: [
      "Shares the SOL 644 chassis — the movement vocabulary is one you have already fought.",
      "Charged slash still answers to vertical evasion."
    ],
    loadoutHints: [
      "Bring the NG++ arsenal. By this point the parts pool is fully open.",
      "The same heavy, resilient approach that beat SOL 644 applies."
    ],
    verified: false,
    sources: [
      "https://armoredcore6.wiki.fextralife.com/Bosses",
      "https://armoredcore.fandom.com/wiki/ARMORED_CORE_VI_FIRES_OF_RUBICON/Endings"
    ]
  }
];
