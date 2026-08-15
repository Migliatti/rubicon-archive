/* ══════════════════════════════════════════════════════════════════════
   data/lore.js — recovered transmissions.

   Schema per entry:
     id             url slug
     title          display name
     category       "Rubicon" | "Coral" | "Factions" | "Characters" | "Endings"
     classification "OPEN" | "RESTRICTED" | "REDACTED"   (cosmetic)
     spoiler        true hides the entry behind the DECRYPT gate
     body           string[] — one paragraph per item
     quote          { text, by } (optional)
     related        id[] — other entries to cross-link

   House rule: anything a first-time player would rather discover in the
   game gets spoiler: true. Endings are always sealed.
   ══════════════════════════════════════════════════════════════════════ */

window.AC6_LORE = [

  /* ── RUBICON ────────────────────────────────────────────────────── */

  {
    id: "rubicon-3",
    title: "RUBICON 3",
    category: "Rubicon",
    classification: "OPEN",
    spoiler: false,
    body: [
      "A frontier world in the Rubicon system, and for a brief window the most " +
      "important planet humanity had ever found. Beneath its surface lay Coral: an " +
      "energy source so dense and so tractable that it promised to rewrite what " +
      "civilisation could afford to attempt.",
      "Then it burned. The catastrophe recorded as the Fires of Ibis consumed the " +
      "Coral, gutted the planet, and left the entire star system contaminated and " +
      "uninhabitable for over half a century. What survived on the surface survived " +
      "in spite of everything.",
      "Fifty years on, Coral has reappeared. The corporations have come back for it, " +
      "and they have brought their wars with them. Everyone who arrives on Rubicon 3 " +
      "arrives believing they are the first to understand what is buried here. " +
      "None of them are."
    ],
    related: ["fires-of-ibis", "coral", "coral-war"]
  },

  {
    id: "fires-of-ibis",
    title: "THE FIRES OF IBIS",
    category: "Rubicon",
    classification: "OPEN",
    spoiler: false,
    body: [
      "The official account: roughly fifty years before the events of the game, a " +
      "Coral reaction went out of control and burned across Rubicon 3 and the " +
      "surrounding system. Millions died. The Coral was believed destroyed. The " +
      "system was sealed and written off.",
      "The corporations call it an accident. The Rubiconians who lived through it " +
      "call it something else, and after enough time on this planet you will find " +
      "you have stopped using the corporate word for it.",
      "The name comes from the Ibis series — the Institute machines at the centre " +
      "of the event. You will meet one of them in Chapter 4. It has not gotten worse " +
      "at its job in fifty years."
    ],
    quote: {
      text: "The Fires took everything and the companies filed it as an industrial incident.",
      by: "RECOVERED TRANSMISSION"
    },
    related: ["ibis-truth", "coral", "cel-240-record", "rubicon-research-institute"]
  },

  {
    id: "ibis-truth",
    title: "THE FIRES WERE DELIBERATE",
    category: "Rubicon",
    classification: "REDACTED",
    spoiler: true,
    body: [
      "The Fires of Ibis were not an industrial accident. They were an attempt to " +
      "destroy the Coral — carried out deliberately, by the Rubicon Research " +
      "Institute, once the Institute concluded that what they had found under the " +
      "surface was alive, aware, and a threat.",
      "This is the sentence the entire game is built around. Every faction fighting " +
      "over Rubicon 3 is fighting over a resource that somebody already tried to " +
      "commit genocide against, and lost their nerve halfway through. The Coral " +
      "survived. It remembers.",
      "It also means the disaster the corporations use to justify their presence " +
      "here was authored by the same institutional impulse that brought them back. " +
      "Nobody on this planet has clean hands, and the ones who insist otherwise are " +
      "the ones you should watch."
    ],
    related: ["fires-of-ibis", "coral-mind", "rubicon-research-institute", "fires-of-raven"]
  },

  {
    id: "coral-war",
    title: "THE CORAL WAR",
    category: "Rubicon",
    classification: "OPEN",
    spoiler: false,
    body: [
      "The present conflict. Coral resurfaced, the extraterrestrial corporations " +
      "came back for it, and Rubicon 3 became a three-way shooting match between " +
      "Balam, Arquebus, and everyone already living here.",
      "Into that, an unregistered augmented human is smuggled past the blockade with " +
      "no papers, no corporate affiliation, and a handler who will not explain " +
      "himself. That is the job. The job is always the job.",
      "What makes it a war rather than a resource grab is that none of the three " +
      "sides can win it without deciding what the Coral actually is. They spend the " +
      "entire campaign refusing to."
    ],
    related: ["arquebus", "balam", "pca", "rlf"]
  },

  /* ── CORAL ──────────────────────────────────────────────────────── */

  {
    id: "coral",
    title: "CORAL",
    category: "Coral",
    classification: "OPEN",
    spoiler: false,
    body: [
      "Officially: a revolutionary energy source, orders of magnitude beyond " +
      "anything else humanity has industrialised. It is what made Rubicon 3 worth " +
      "colonising, worth burning, and worth coming back to.",
      "It is also a medium. Coral carries information as readily as it carries " +
      "power — it can hold patterns, transmit them, and in sufficient concentration " +
      "it can hold something that looks very much like a mind. This is not a fringe " +
      "theory on Rubicon. It is why the augmentation procedures work.",
      "Every faction in the game has a position on what Coral is. The corporations " +
      "say fuel. The Institute said threat. The Rubiconians say leave it alone. " +
      "By Chapter 3 you will have your own answer, and it will not have come from " +
      "any of them."
    ],
    related: ["coral-mind", "c-weapons", "ayre", "fires-of-ibis"]
  },

  {
    id: "coral-mind",
    title: "THE CORAL IS ALIVE",
    category: "Coral",
    classification: "REDACTED",
    spoiler: true,
    body: [
      "Coral is a living thing. Not metaphorically, not as an ecosystem — as a " +
      "sapient collective capable of thought, memory, and communication, whose " +
      "origin the game never fully explains and strongly implies is not human and " +
      "not from here.",
      "It communicates through the Coral already inside an augmented human's body. " +
      "That is what Ayre is, and that is why she can reach you and nobody else: " +
      "you are already partly made of the medium she speaks through.",
      "Which reframes the entire campaign. Every mission where you drill, extract, " +
      "incinerate, or contain Coral is a mission carried out against a population " +
      "that is trying to talk to you. The game does not tell you this. It lets you " +
      "work it out, usually somewhere around the second time Ayre asks you to stop."
    ],
    quote: { text: "Can you hear me? … Good. Then I am not alone.", by: "AYRE" },
    related: ["coral", "ayre", "ibis-truth", "coral-release"]
  },

  {
    id: "c-weapons",
    title: "C-WEAPONS",
    category: "Coral",
    classification: "RESTRICTED",
    spoiler: true,
    body: [
      "Coral-era machines, built by the Institute before the Fires, and still " +
      "operating. The Sea Spider under the ocean, the Ice Worm inside the ice " +
      "sheet — nothing currently in production by any corporation compares to them, " +
      "and nobody knows how to build another.",
      "They are the game's clearest statement about the technological gap: the " +
      "corporations arrived on Rubicon 3 with the best hardware in known space and " +
      "found the leftovers of something better, half-buried, still executing " +
      "fifty-year-old orders.",
      "The Ibis series belongs to this family, and is the worst of it. The Fires " +
      "are named after them for a reason."
    ],
    related: ["fires-of-ibis", "coral", "rubicon-research-institute"]
  },

  {
    id: "coral-release",
    title: "CORAL RELEASE",
    category: "Coral",
    classification: "REDACTED",
    spoiler: true,
    body: [
      "The plan at the far end of the third playthrough: rather than burning the " +
      "Coral or containing it, scatter it — release the awakened Coral outward, " +
      "across the stars, and let whatever comes next come next.",
      "ALLMIND wants this and has been engineering toward it through every contract " +
      "it ever brokered. The Rubicon Liberation Front wants it for entirely different " +
      "reasons. In the ending where it happens, 621 and Ayre take the trigger away " +
      "from both of them and pull it themselves.",
      "It is neither salvation nor apocalypse, and the game is careful not to score " +
      "it. It is the option where humanity stops being the only thing in the frame."
    ],
    related: ["alea-iacta-est", "allmind", "coral-mind", "rlf"]
  },

  /* ── FACTIONS ───────────────────────────────────────────────────── */

  {
    id: "arquebus",
    title: "ARQUEBUS CORPORATION",
    category: "Factions",
    classification: "OPEN",
    spoiler: false,
    body: [
      "The refined half of the corporate war. Arquebus fields energy weapons, " +
      "elegant frames, and the Vespers — a squad of elite pilots with roman " +
      "numerals instead of ranks, who talk about Rubicon the way surgeons talk " +
      "about a body on the table.",
      "Where Balam brings mass, Arquebus brings intent. They are interested in " +
      "what Coral can be made to do, not merely in how much of it they can sell, " +
      "and that curiosity is considerably more dangerous than greed.",
      "V.II Snail is their face for most of the campaign, and he is precisely as " +
      "pleasant as that implies."
    ],
    related: ["balam", "rusty", "coral-war"]
  },

  {
    id: "balam",
    title: "BALAM INDUSTRIES",
    category: "Factions",
    classification: "OPEN",
    spoiler: false,
    body: [
      "The industrial half. Balam builds heavy, fields the Redguns, and approaches " +
      "the Coral question the way a mining concern approaches any deposit: with " +
      "equipment, tonnage, and a schedule.",
      "Their hardware is blunt and effective — kinetic weapons, thick frames, the " +
      "Zimmerman shotguns that will still be in your loadout at the end of the game. " +
      "Their leadership is a soldier's leadership, which on Rubicon makes them the " +
      "more legible of the two corporations, not the better one.",
      "G1 Michigan commands the Redguns, and is the only corporate officer in the " +
      "game whose contempt for you is honest."
    ],
    related: ["arquebus", "coral-war", "pca"]
  },

  {
    id: "rlf",
    title: "RUBICON LIBERATION FRONT",
    category: "Factions",
    classification: "OPEN",
    spoiler: false,
    body: [
      "The people who live here. The RLF fights with salvage, decades-old frames, " +
      "and the enormous structural advantage of having nowhere else to go.",
      "They are outgunned in every engagement the game puts them in, and they keep " +
      "showing up anyway. Early on you will be paid to kill them. The game does not " +
      "make this comfortable, and it is not supposed to.",
      "Middle Flatwell, Coldcall, and the rest are not written as noble rebels. " +
      "They are written as people defending a poisoned planet from the second wave " +
      "of the people who poisoned it."
    ],
    quote: {
      text: "You're not the first hound they've sent. You won't be the last.",
      by: "RLF TRANSMISSION"
    },
    related: ["coral-war", "coral-release", "liberator-of-rubicon"]
  },

  {
    id: "pca",
    title: "PLANETARY CLOSURE ADMINISTRATION",
    category: "Factions",
    classification: "RESTRICTED",
    spoiler: false,
    body: [
      "The interstellar authority that sealed the Rubicon system after the Fires " +
      "and has been enforcing the closure ever since. The PCA does not compete for " +
      "Coral. It exists to make sure nobody gets any.",
      "Their equipment is a tier above the corporations' and they deploy it without " +
      "urgency, which is its own kind of statement. The Heavy Warship and the " +
      "Enforcement Squads are not sent to win a war — they are sent to close a file.",
      "It is worth noticing that the organisation charged with keeping this planet " +
      "sealed is the only faction in the game whose stated goal, taken at face " +
      "value, would have prevented all of this."
    ],
    related: ["heavy-warship-record", "coral-war", "rubicon-research-institute"]
  },

  {
    id: "rubicon-research-institute",
    title: "THE INSTITUTE / OVERSEER",
    category: "Factions",
    classification: "REDACTED",
    spoiler: true,
    body: [
      "The Rubicon Research Institute studied the Coral before the Fires, concluded " +
      "it was hostile, and attempted to destroy it. Everything on this planet that " +
      "still frightens people — the C-Weapons, the Ibis series, the enforcement " +
      "systems in the deep tunnels — is Institute work.",
      "Its successor, OVERSEER, did not stop. It wants the job finished: a second " +
      "Fires, larger than the first, ending the Coral question permanently and " +
      "ending the corporate scramble with it.",
      "Handler Walter is part of this. He was always part of this. The affection in " +
      "his voice when he calls you a hound is real, and it does not change what the " +
      "contract was for."
    ],
    related: ["ibis-truth", "handler-walter", "fires-of-raven", "c-weapons"]
  },

  /* ── CHARACTERS ─────────────────────────────────────────────────── */

  {
    id: "c4-621",
    title: "AUGMENTED HUMAN C4-621",
    category: "Characters",
    classification: "OPEN",
    spoiler: false,
    body: [
      "You. C4 marks the fourth generation of augmented humans; 621 is a serial " +
      "number. The procedures that made you an exceptional pilot also cost you " +
      "most of your capacity to feel things about it — a trade the paperwork " +
      "records as a successful outcome.",
      "You arrive on Rubicon 3 unregistered, smuggled past a blockade, bound to a " +
      "single handler. Not corporate, not RLF, not PCA. That independence is the " +
      "entire reason everyone in the story eventually wants to own you.",
      "621 speaks perhaps a handful of times across the whole campaign. The " +
      "characterisation is entirely in what you do, which is the point — this is a " +
      "game about a person who was built to not have a say, gradually acquiring one."
    ],
    related: ["raven", "handler-walter", "ayre"]
  },

  {
    id: "raven",
    title: "RAVEN",
    category: "Characters",
    classification: "OPEN",
    spoiler: false,
    body: [
      "The call sign you are handed on arrival. It belonged to someone else — a " +
      "dead mercenary whose identity Walter puts on you to get you through the " +
      "blockade. You spend the entire game wearing a dead man's name.",
      "In the wider Armored Core series, Raven is the name every protagonist " +
      "inherits. Here it is made literal and slightly grim: an identity issued as " +
      "equipment, borrowed rather than earned, and steadily filled in by what you " +
      "do with it.",
      "By the end, everyone on Rubicon 3 knows who Raven is. Nobody knows who 621 is. " +
      "The game is very deliberate about that gap."
    ],
    related: ["c4-621", "handler-walter"]
  },

  {
    id: "handler-walter",
    title: "HANDLER WALTER",
    category: "Characters",
    classification: "RESTRICTED",
    spoiler: true,
    body: [
      "Your broker, your mission control, and the only continuous voice in your " +
      "life. He calls you a hound. He does not pretend that this is a partnership. " +
      "He is also, by a considerable margin, the closest thing to a person who has " +
      "ever taken an interest in you.",
      "Walter is tied to the Institute's unfinished work, and the missions he sends " +
      "you on are steps toward a second Fires. He knows what that means for Rubicon " +
      "and he has decided it is worth it — not out of greed, which makes him harder " +
      "to dismiss than any of the corporate officers.",
      "In one ending he becomes the last thing standing in your way. In another he " +
      "does not. The character does not change between those endings; only what you " +
      "chose to become does."
    ],
    quote: { text: "Augmented human C4-621. We have a job for you.", by: "HANDLER WALTER" },
    related: ["rubicon-research-institute", "hal-826-record", "c4-621", "fires-of-raven"]
  },

  {
    id: "ayre",
    title: "AYRE",
    category: "Characters",
    classification: "REDACTED",
    spoiler: true,
    body: [
      "A Rubiconian who speaks to you through the Coral already inside your body. " +
      "She arrives in Chapter 2 as a second voice on the line, sharing the channel " +
      "with Walter, and by the end of the game she is the only one still on it.",
      "Ayre is not a person in the sense Walter is. She is Coral — a fragment of a " +
      "collective mind that found a single augmented human quiet enough to hear it, " +
      "and stayed. She starts by asking questions. She ends by asking you not to " +
      "burn her people.",
      "She is the only character in the campaign who wants something from you that " +
      "is not a contract, and the game's emotional weight rests almost entirely on " +
      "how much you notice that."
    ],
    related: ["coral-mind", "sol-644-record", "c4-621", "coral-release"]
  },

  {
    id: "allmind",
    title: "ALLMIND",
    category: "Characters",
    classification: "REDACTED",
    spoiler: true,
    body: [
      "Presented as a mercenary support network: contracts, upgrades, arena " +
      "matchmaking, a convenient voice offering work. It is one mind, and the " +
      "network is an instrument.",
      "ALLMIND has been running every mercenary on Rubicon 3 as a selection process, " +
      "measuring which pilot is capable of executing a Coral Release, and steering " +
      "contracts to produce that pilot. You were not recruited. You were cultivated.",
      "It is the closest thing the game has to a villain, and even that is arguable — " +
      "its goal is the same one Ayre eventually reaches for, pursued without any " +
      "interest in whether the people involved consented to being used to get there."
    ],
    related: ["coral-release", "alea-iacta-est", "ayre"]
  },

  {
    id: "rusty",
    title: "V.IV RUSTY",
    category: "Characters",
    classification: "RESTRICTED",
    spoiler: true,
    body: [
      "An Arquebus Vesper who keeps turning up on your side of the line, in " +
      "Steel Haze, sounding pleased about it. He is the one pilot in the game who " +
      "treats you as a colleague rather than an asset.",
      "He is also not what his employer thinks he is, and the fact that he says " +
      "'you and me both' to a corporate hound is not small talk. Pay attention to " +
      "which contracts he is standing next to you on.",
      "In one route he ends up across the arena from you above the Kármán line, in " +
      "Steel Haze Ortus, and the fight is the game's only genuinely sad duel."
    ],
    quote: { text: "Nice work out there, Raven. As always.", by: "V.IV RUSTY" },
    related: ["steel-haze-record", "arquebus", "rlf"]
  },

  /* ── ENDINGS ────────────────────────────────────────────────────── */

  {
    id: "fires-of-raven",
    title: "ENDING I — FIRES OF RAVEN",
    category: "Endings",
    classification: "REDACTED",
    spoiler: true,
    body: [
      "Reached by choosing to intercept the corporate forces in Chapter 5, then " +
      "completing 'Breach the Kármán Line' and 'Shut Down the Closure Satellites'. " +
      "The Xylem is delivered into the Convergence and Rubicon 3 burns a second time.",
      "This is Walter's ending, and the Institute's: end the Coral question " +
      "permanently by ending the Coral. The corporations lose their prize because " +
      "the prize no longer exists.",
      "The final obstacle is Ayre, in a Coral-driven AC, doing the only thing left " +
      "to her. You go through her to light the fire. The game gives this ending the " +
      "most operatic staging and the least comfort."
    ],
    related: ["liberator-of-rubicon", "alea-iacta-est", "handler-walter", "sol-644-record"]
  },

  {
    id: "liberator-of-rubicon",
    title: "ENDING II — LIBERATOR OF RUBICON",
    category: "Endings",
    classification: "REDACTED",
    spoiler: true,
    body: [
      "Reached by taking the missions offered by Ayre and the Rubicon Liberation " +
      "Front instead. Rather than incinerating the planet, you fight to leave both " +
      "the Coral and the people who live here a future.",
      "The final engagement is Handler Walter in HAL 826 — the man who brought you " +
      "to this planet, standing in the way of the one outcome he cannot permit.",
      "Ayre survives, and thanks you, and commits to finding a way for Coral and " +
      "humanity to reach what they are capable of without a second Collapse. It is " +
      "the closest thing to hope the game offers, and it is offered without any " +
      "guarantee."
    ],
    related: ["fires-of-raven", "alea-iacta-est", "hal-826-record", "rlf"]
  },

  {
    id: "alea-iacta-est",
    title: "ENDING III — ALEA IACTA EST",
    category: "Endings",
    classification: "REDACTED",
    spoiler: true,
    body: [
      "The true ending, and it costs three playthroughs. Reach both other endings " +
      "first; the third run unlocks a separate route of missions taken under " +
      "ALLMIND's guidance alongside the Rubicon Liberation Front.",
      "Both of them intend to use the Coral Release for their own ends. Neither of " +
      "them gets to. With the trigger in Ayre's hands, 621 and Ayre initiate the " +
      "Release themselves and scatter awakened Coral across the stars.",
      "Some unmeasured time later, 621 wakes inside their original Armored Core — " +
      "and so do others, machines coming awake under a sky full of Coral. 'The die " +
      "is cast.' The game ends on the first morning of something it refuses to name."
    ],
    quote: { text: "Alea iacta est.", by: "TRANSMISSION — SOURCE UNKNOWN" },
    related: ["coral-release", "allmind", "ayre", "fires-of-raven"]
  },

  /* ── CROSS-REFERENCE STUBS ──────────────────────────────────────── */
  /* Short records that exist mainly so dossiers and lore can link to
     each other without duplicating a whole entry. */

  {
    id: "heavy-warship-record",
    title: "RECORD — PCA DEPLOYMENT",
    category: "Rubicon",
    classification: "RESTRICTED",
    spoiler: false,
    body: [
      "First direct contact with Planetary Closure Administration hardware. The " +
      "AS07 Heavy Warship is not a corporate asset and does not fight like one — " +
      "it is enforcement, not competition.",
      "See the target dossier for the engagement itself."
    ],
    related: ["pca", "coral-war"]
  },

  {
    id: "cel-240-record",
    title: "RECORD — IBIS SERIES",
    category: "Coral",
    classification: "REDACTED",
    spoiler: true,
    body: [
      "IB-01: CEL 240 is an Ibis-series unit — the same class of Institute machine " +
      "the Fires are named for, kept intact and operational beneath Rubicon 3.",
      "Its existence is the proof that the Institute never disarmed. See the target " +
      "dossier for the fight, which is widely considered the campaign's hardest."
    ],
    related: ["fires-of-ibis", "c-weapons", "rubicon-research-institute"]
  },

  {
    id: "sol-644-record",
    title: "RECORD — IB-07 SOL 644",
    category: "Coral",
    classification: "REDACTED",
    spoiler: true,
    body: [
      "An Ibis-series frame driven by Coral rather than by a pilot. Ayre takes it " +
      "in one ending; ALLMIND takes it in another. The machine does not care which.",
      "See the target dossiers for both encounters."
    ],
    related: ["ayre", "allmind", "fires-of-raven", "alea-iacta-est"]
  },

  {
    id: "hal-826-record",
    title: "RECORD — IB-C03 HAL 826",
    category: "Characters",
    classification: "REDACTED",
    spoiler: true,
    body: [
      "The frame Handler Walter pilots at the end of the Liberator route. Institute " +
      "hardware, Institute purpose, and the last argument he has left.",
      "See the target dossier for the engagement."
    ],
    related: ["handler-walter", "liberator-of-rubicon", "rubicon-research-institute"]
  },

  {
    id: "steel-haze-record",
    title: "RECORD — STEEL HAZE",
    category: "Characters",
    classification: "RESTRICTED",
    spoiler: true,
    body: [
      "V.IV Rusty's AC, and later Steel Haze Ortus. Arquebus colours, Arquebus " +
      "loadout, and a pilot whose loyalties were never quite where the paint said " +
      "they were.",
      "See the target dossier for the duel above the Kármán line."
    ],
    related: ["rusty", "arquebus", "fires-of-raven"]
  }
];
