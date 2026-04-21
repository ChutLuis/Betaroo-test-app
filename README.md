# Betaroo — RN test task

React Native + TypeScript implementation. Two opportunity cards (player + team) with their atoms, a 3-state league select, and a restructured token system.

## Run

```bash
npm install
npm run ios
```

Node 20+, Xcode / iOS simulator. First launch fetches Manrope, Inter and DM Mono via `@expo-google-fonts/*`.

## Layout

```
tokens/
  primitives/    palette, space, radius, shadows, type families
  semantic/      color roles, shadow roles, typography scale
  theme.ts       single composed `theme` export
  index.ts       public API + exported token types

components/
  atoms/         ConfidenceBadge, L5Pill, Icon, EliteBackground
  cards/         PlayerCard, TeamCard
    parts/       Avatar, CardHeader, CardFooter, OddsBadge, TeamLogoStack
  select/        LeagueSelect

mocks/           demo data for App.tsx
scripts/         generate-noise.js (noise texture for the ELITE badge)
```

## Part 1 — Opportunity cards

Built the player + team wide variants. The brief says pick 2 of 3; the narrow card was structurally the odd one out, so shipping the two that share atoms felt like the right trade.

Each card is three stacked sections (header / body / footer) separated by 1px `#202020` dividers. Outer radius 8, no outer padding — each section owns its own padding. This matches the Figma shell and keeps new variants easy to slot in later: swap the body, keep header and footer.

Atoms:

- `ConfidenceBadge` accepts either a `tier` (`elite | strong | fair | risky`) or a raw `value` percentage. Thresholds live in `components/atoms/confidence.ts` (`≥90 / ≥70 / ≥40`). ELITE renders through `EliteBackground`, a 5-layer replica of the Figma gradient (base pink → radial pink highlight → white radial bloom → diagonal dark overlay → two noise passes). The other three tiers use the `alpha/*` tokens + tier-coloured text pattern.
- `L5Pill` uses the same tier logic. Percentage text stays white; only the pill carries the tier colour. Matches Figma and reads better when scanning a list.
- `OddsBadge` is the pill at the footer. Not a streak / fire badge — it's a sportsbook odds pill: dark-grey background, sportsbook mark on the left, American odds in `DM Mono Medium 12` on the right. The mark is a generic SVG placeholder; the Figma source uses the DraftKings logo, which is proprietary.
- `Icon` is an inline `react-native-svg` component. ~11 marks, small footprint, no font files.

The list uses `FlatList` for windowed scrolling.

## Part 2 — League select

Three states in one component driven by two animated values:

- `progress` (0 → 1, 220ms, cubic-out) drives dropdown height, opacity, chevron rotation, and focus-ring fade-in.
- `countProgress` (spring) cross-fades the empty placeholder with the filled summary. There's a small vertical offset on both so the change reads as motion, not a blink.

Selected rows get a `bg.secondary` fill and a brand-coloured check. Rows are individually rounded (`radius.lg`) inside the panel — not one long list with dividers — matching the Figma.

Used RN's built-in `Animated` rather than Reanimated. These are timing / spring animations, not gesture-driven; Animated has no native-link step and keeps the component library-free per the brief. Reanimated is not in `package.json`.

The focus ring in Figma is a double `box-shadow: 0 0 0 2px #171717, 0 0 0 4px alpha/slate/alpha-16`. RN has no spread shadows, so it's an absolutely-positioned `View` offset `-4px` on each side with matching stroke and alpha, faded in via `progress`.

## Part 3 — Token refactor

The original `tokens.ts` mixed three concerns in one file (raw palette, semantic roles, typography scale), with inconsistent casing — `bg_base`, `bgDark`, `BG_OTHER`, `backgroundWeak` — near-duplicate `brand` and `primary` scales, and some semantic roles hard-coded to hex while others used palette refs for the same colour. No exported const was narrowed, so typos were silent until runtime.

Split into three layers:

1. `primitives/` — raw values only. `palette.gray[950]`, `space[16]`, `radius.lg`, `fontFamily.heading`. Source of truth. Nothing in here should ever be a duplicate.
2. `semantic/` — roles mapped to primitives. `color.bg.base → palette.gray[950]`, `color.state.success.dark → palette.green[400]`. If we ever add a light theme, this is the only layer that changes.
3. `theme.ts` — composes everything into a single `theme` object. `palette` is still exported as an escape hatch for one-off needs (team jersey colours, etc.).

Every export is `as const`, so consumers get autocomplete on `theme.color.state.success.dark` and a compile error on a typo. `SpaceToken`, `RadiusToken`, `ColorGroup`, `TypographyToken`, `ShadowToken` are exported from `tokens/index.ts` so component props can constrain themselves to valid keys.

I dropped the duplicate `primary*` scale outright — it was a near-copy of `brand` offset by one shade. If "primary" becomes a product-distinct concept later it lives as a semantic alias on top of `brand`, not a parallel palette.

A grep over the components confirms every colour resolves through `theme.*`. Ad-hoc team colours (jerseys in `mocks/opportunities.ts`) are passed in as props — those shouldn't be tokenised.

## Notes from the Figma pass

A few things worth flagging because they changed the shape of the code:

- The "+172" pill is an odds pill, not a streak / fire badge. Renamed `FireBadge` → `OddsBadge`; mock data carries real odds strings (`+172`, `-135`, `EVEN`).
- Header meta is three colours, not one: team-1 in `text.tertiary` (the active team), team-2 and the time in `text.disabled`. The design uses tonal contrast to telegraph which team the opportunity is on.
- Typography now matches the source scale: `DM Mono Medium` at `letterSpacing: 0.24` on `monoXs`, a new `monoMini` (9 / 0.18) for the position chip, `labelSm` (Inter 14/20) for names and row labels, `paragraphXxs` (Inter 12/16) for stat line / market.
- Dropdown rows are individually rounded inside the panel (`radius.lg`, 8px padding each), not one list with dividers.

Places I intentionally diverged from Figma in the RN port:

- Figma sets `line-height: 9.625px` on 12px text — a web trick relying on `overflow: clip`. On iOS that clips descenders. Rounded up to `14` on `monoXs` and `12` on `monoXxs`. Visually identical in the target container sizes.
- RN has no `mix-blend-mode`. The ELITE badge's white highlight and noise layers use tuned opacity (0.35 and 0.25 / 0.125) to approximate Figma's overlay stack.
- Focus ring rebuilt as a second `View` — see Part 2.

## What I'd do with more time

- Real team and player logos. `Avatar` is a coloured circle with a 2–3 letter label — structural placeholder, not shippable.
- A live-data mode on the cards: small refresh tick + number animation on `L5Pill`.
- Move the dropdown to Reanimated + `LayoutAnimation` for staggered item entry. The `Animated` implementation is clean but would look sharper.
- Snapshot tests for the token layers — assert every `color.*` role resolves inside `palette` to catch accidental drift.
- Accessibility: role labels on `Pressable`s, minimum hit targets on the small header icons.

## Decisions

- **Expo over bare RN.** The brief says no Expo unless there's a reason. Mine: font loading via `@expo-google-fonts/*` + `expo-font` is one step instead of three, and `npm run ios` boots the simulator. Nothing in `components/` imports an Expo API except `expo-linear-gradient`, so moving to bare RN is an init + three config swaps.
- **No external UI libraries for the core components,** as required. `react-native-svg` (SVG primitive) and `expo-linear-gradient` (gradient primitive) are used for the icon set and the ELITE badge. Neither is a UI kit.
- **SVG icons over an icon font.** Smaller footprint for the marks we need and no font file to load.
- **Generic `sportsbook` SVG** stands in for the DraftKings mark visible in the Figma. One-line swap in `components/atoms/Icon.tsx` when a licensed asset is available.
