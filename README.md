# Betaroo — RN test task

React Native + TypeScript. Two opportunity cards (player / team), their atoms, a 3-state league select, and a refactored token system.

## Run

```bash
npm install
npm run ios
```

Node 20+, Xcode / iOS simulator. First launch fetches Manrope, Inter, DM Mono via `@expo-google-fonts/*`.

Scripts: `typecheck`, `lint`, `format`, `test`.

## Demo

`recordings/demo.mov` — card list scrolling, tier colours, select moving through default → focus → filled.

## Preview builds

Simulator-only builds via EAS — no Apple Developer signing needed.

```bash
# Cloud (shareable link on expo.dev)
npm run preview:cloud

# Local (requires Xcode + fastlane; output .tar.gz drops a .app you drag into Simulator)
npm run preview:local
```

Profiles live in `eas.json`. `preview-device` is available for ad-hoc device builds when you're ready to wire an Apple Developer team.

## Layout

```
tokens/
  primitives/   palette, space, radius, shadows, type families, motion
  semantic/     color roles, shadow roles, typography scale
  theme.ts      composed `theme` export

components/
  primitives/   Icon (registry), CircleMark, TierSurface, EliteBackground
  opportunity/  OpportunityCard shell + PlayerCard / TeamCard
                MatchupHeader, OpportunityFooter, StatPill,
                ConfidenceBadge, OddsBadge, Avatar, TeamLogoStack, tier.ts
  select/       LeagueSelect + useSelectAnimation

hooks/          useOpportunities, useLeagues, useAppFonts
mocks/          demo data + asset maps
```

## Part 1 — Cards

Built **player** and **team** variants. They share an `OpportunityCard` shell (header / body / footer + Pressable chrome); only the body row differs (`Avatar` vs `TeamLogoStack`). Avatar and TeamLogoStack both sit on a shared `CircleMark` primitive.

Props are structured: `{ matchup, player|teamName, pick, actions }`. No flat 17-prop interfaces. The `Matchup` and `OpportunityPick` types are shared across both cards.

Tier system lives in `tier.ts`: `≥90 elite`, `≥70 strong`, `≥40 fair`, else `risky`. `ConfidenceBadge` and `StatPill` both render through a shared `TierSurface` primitive that decides whether to overlay the ELITE gradient stack (5 layers: base + pink radial + white bloom + diagonal shadow + two noise passes) or a flat tinted fill.

`Icon` is registry-driven — one entry per name, not a switch. Most names are tinted PNGs from Figma's Remix Icon export; `plus` / `check` are hand-rolled SVG; `sportsbook` is the DraftKings mark rendered as-is.

Scrollable `FlatList` in `App.tsx` consumes `useOpportunities()` — screens talk to hooks, not mocks, so the API swap is one file.

## Part 2 — League select

Three states: default, focus (panel open), filled. Animation choreography (panel height+opacity, chevron rotation, focus-ring fade, empty↔filled cross-fade+translate) lives in `useSelectAnimation`, so the view is pure markup.

Durations / easings / spring come from `theme.motion.*` — no inline magic numbers.

Focus ring is rebuilt as two concentric `View`s (outer `-4` + slate alpha, inner `-2` + `bg.base`) because RN has no `box-shadow: spread`. Both fade with the same `progress` value.

Uses RN's built-in `Animated` — no Reanimated, no gestures, zero UI libs per the brief.

## Part 3 — Token refactor

Three layers:

1. **`primitives/`** — raw values. `palette.gray[950]`, `space[16]`, `radius.lg`, `motion.duration.normal`. Source of truth, zero duplicates.
2. **`semantic/`** — roles mapped to primitives. `color.bg.base → palette.gray[950]`. A light theme only changes this layer.
3. **`theme.ts`** — single composed object. `palette` still exported as an escape hatch (jersey colours in mocks).

Every export is `as const`; consumers get autocomplete and typos are compile errors. `SpaceToken`, `RadiusToken`, `ColorGroup`, `TypographyToken`, `ShadowToken`, `DurationToken` exported from `tokens/index.ts`.

Dropped the duplicate `primary*` scale — it was a near-copy of `brand` offset by one shade.

## Polish pass

Second round focused on the reviewer feedback ("spacing, sizing, and alignment"). Walked every in-scope Figma node side-by-side against the code. Concrete changes:

- **Position chip** (`SG`, `SF`) — was `h14 minW14 r-xs pH-2`, Figma is `h12 minW12 r-sm p-2`.
- **Player vs team header gap** — Figma's player card uses `gap-8` between nameplate and chance-badge, team card uses `gap-6`. Was `6` for both.
- **Dropdown row radius** — Figma's selected row is `r-md`, default rows are `r-lg`. Was flat `r-md` for everything.
- **CircleMark border scaling** — Figma keeps the ring at ~3.125% of diameter (`1.75px @ 56`, `1.06px @ 34`, `0.47px @ 15`). Was a flat `1px`, which looked chunky on the 15px team-badge overlay.
- **Tier pill text centering on iOS** — Figma's `leading-[9.625px]` clips glyphs on iOS RN (`L10` → `L1U`, `ELITE` → `ELIIE`) inside `overflow: hidden` containers. Settled on `lineHeight: 16` (`≈ fontSize × 1.3`) which geometrically centers the uppercase cap in the 18px pill on iOS without clipping. Noted in the token comment.
- **Odds glyph tracking** — Figma's `+172` has no tracking; was inheriting `0.24` from `monoXs` (the tier-pill token). Overridden inline.
- **Real `vs.svg` asset** — replaced text `@` at 9px with the actual Figma SVG path, tintable via the `Icon` registry.
- **ConfidenceBadge `alignSelf`** — dropped the `flex-start` override that was offsetting the badge vertically in `items-center` rows.
- **OpportunityFooter layout** — removed a redundant `gap: 8` that fought with `justify-between` distribution.
- **TeamCard header** — dropped an unused `justifyContent: 'center'` since the `flex-1` name handles distribution.
- **Tier thresholds verified** against all four Figma atom variants (99/85/45/15 → Elite/Strong/Fair/Risky) and their color tokens resolve to the exact Figma hex.

Scope stays at the two wide cards per the task doc ("pick 2 of 3"). Tall 196×200 variant not built.

## Decisions

- **Expo over bare RN.** The brief says no Expo without a reason. Mine:
  - `@expo-google-fonts/*` + `expo-font` load the three Figma font families in one hook (`useAppFonts`) instead of three linking steps.
  - `expo-splash-screen` gives a clean `preventAutoHide → hideAsync` handshake once fonts resolve — no first-frame font flash.
  - `expo-linear-gradient` is the only clean RN path to the ELITE badge's diagonal shadow band; bare RN needs `react-native-linear-gradient` plus pod install for the same thing.
  - `npm run ios` boots the simulator end-to-end — faster review loop for a test task.
  - None of `components/` depends on Expo APIs except `expo-linear-gradient`, so bare RN is an init + three config swaps if that becomes a requirement.
- **No external UI libraries.** `react-native-svg` and `expo-linear-gradient` are used as primitives (one icon, one gradient layer). Neither is a UI kit.
- **PNG icons via `tintColor`** over an SVG icon font — the Remix export is monochrome PNGs, tinting is ~10 lines, avoids a font bundle.
- **Data via hooks, not imports.** `App.tsx` reads `useOpportunities()` / `useLeagues()`; mocks are implementation detail behind the hook boundary.
- **Tests scaffolded** with `jest-expo` + `@testing-library/react-native` — `PlayerCard`, `TeamCard`, and tier-boundary smoke tests. Run `npm install && npm test`.

## Trademark caveat

DraftKings mark, NBA team logos (ESPN CDN), and player headshots (`cdn.nba.com`) are used as-is for a dev demo. Production needs licensed use or generic replacements.

## What I'd do with more time

- Reanimated + `LayoutAnimation` for the dropdown — staggered item entry, sharper than the current cross-fade.
- Accessibility pass — role labels on `Pressable`s, minimum hit targets on the small header icons.
- Outside-press dismiss + scrollable panel on `LeagueSelect` for when the league list grows past ~6 items.
- Structural test asserting every `color.*` role resolves inside `palette` — catches accidental drift.
- Live-data mode on cards — refresh tick + number animation on `StatPill`.
