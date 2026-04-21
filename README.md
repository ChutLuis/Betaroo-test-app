# Betaroo — RN test task

React Native + TypeScript implementation. Two opportunity card variants (player + team), their atoms (`ConfidenceBadge`, `L5Pill`, `OddsBadge`), a 3-state league select, and a restructured token system.

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
  atoms/         ConfidenceBadge, L5Pill, Icon, EliteBackground, confidence.ts
  cards/         PlayerCard, TeamCard
    parts/       Avatar, CardHeader, CardFooter, OddsBadge, TeamLogoStack
  select/        LeagueSelect

assets/
  icons/         Remix Icon PNGs (info, share, arrow-right-s, basketball-fill,
                 global-line, add-circle-line, draft-king)
  figma-icons/   Team logos + player headshots (NBA / ESPN CDNs)
  textures/      noise.png for the ELITE gradient

mocks/           demo data for App.tsx
scripts/         generate-noise.js — reproducible noise texture
```

## Part 1 — Opportunity cards

Built the **player** and **team** wide variants. The brief says pick 2 of 3; those two share 95 % of the structure (header / body / footer shell + CardHeader + CardFooter + OddsBadge + L5Pill + ConfidenceBadge) so the shared parts are genuinely shared. Only the body row differs (`Avatar` vs `TeamLogoStack`).

Card shell: three stacked sections with 1px `#202020` dividers, outer radius 8, no outer padding — each section owns its own padding. Matches the Figma shell and makes future variants easy to slot in: swap the body, keep header and footer.

Atoms:

- **`ConfidenceBadge`** accepts `value: number` per the brief wording ("each should accept a value prop and render the correct colour tier automatically"). Thresholds in `confidence.ts`: `≥90 elite`, `≥70 strong`, `≥40 fair`, else `risky`. ELITE renders through `EliteBackground` — a 5-layer replica of the Figma gradient stack (base pink → SVG radial pink highlight → white radial bloom → diagonal dark overlay → two noise passes). The other three tiers use `state.{success|away|error}.lighter` + `state.*.dark` text.
- **`L5Pill`** uses the same `value: number` API and the same tier palette. Percentage text stays white; only the pill carries the tier colour, matching Figma (reads better when scanning a list).
- **`OddsBadge`** is the footer pill. Dark-grey background, sportsbook mark on the left (real DraftKings PNG), American odds in `DM Mono Medium 12/16 uppercase` on the right. `radius: 5` is a Figma-exact magic number (between `radius.sm = 4` and `radius.md = 6`).
- **`Icon`** routes most cases to PNG assets from Figma's Remix Icon export (`information-2-fill`, `share-2-fill`, `arrow-right-s-line`, `basketball-fill`, `global-line`, `add-circle-line`, `draft-king`) tinted via `tintColor` so the `color` prop still works. `chevronDown` / `chevronUp` are the right-arrow PNG rotated ±90° (Remix's chevron set is rotationally symmetric). `plus`, `check`, and `vs` are hand-rolled `react-native-svg` since those aren't in the export batch.

Team logos and player photos live in `assets/figma-icons/`. Logos pulled from the ESPN CDN, player headshots from `cdn.nba.com`. Rendered by `Avatar` (player + optional sub-badge) and `TeamLogoStack` (home 100 %, away 20 %, 10.625px overlap — exact Figma ratio).

The list uses `FlatList` for windowed scrolling. `renderOpportunity` spreads the `Opportunity` item directly into `PlayerCard` / `TeamCard` so new props flow through without touching the render function.

## Part 2 — League select

Three states in one component, driven by two animated values:

- **`progress`** (0 → 1, 220ms, cubic-out) drives dropdown height, opacity, chevron rotation, the focus-ring fade-in, and the panel's marginTop (0 → 8) so there's zero vertical space below the field when closed.
- **`countProgress`** (spring) cross-fades the empty placeholder with the filled summary. A small vertical offset on each reads as motion rather than a text swap.

Icon + placeholder colours are state-aware (`state.faded.base` → `icon.secondary`; `text.tertiary` → `text.primary`), matching Figma's three-state spec (default / focus / filled).

Selected rows change to `bg.primary` with `radius.md` (6) — Figma's only two differences from unselected (`bg.base` + `radius.lg` = 8). No check icon: the background shift is the cue.

Used RN's built-in `Animated` rather than Reanimated. Timing + spring animations only, no gestures; Animated has no native-link step and keeps the component library-free per the brief. Reanimated is not in `package.json`.

The focus ring in Figma is `box-shadow: 0 0 0 2px #171717, 0 0 0 4px alpha/slate/alpha-16` — spread 2 dark on top of spread 4 slate. RN has no `box-shadow: spread`, so it's rebuilt as two concentric absolutely-positioned rings: outer at `-4` with `borderWidth: 2` at `alpha.slate[16]`, inner at `-2` with `borderWidth: 2` at `bg.base`. Both fade in with `progress`.

## Part 3 — Token refactor

The original `tokens.ts` mixed three concerns in one file (raw palette, semantic roles, typography scale), with inconsistent casing (`bg_base`, `bgDark`, `BG_OTHER`), near-duplicate `brand` and `primary` scales, and some semantic roles hard-coded to hex while others used palette refs for the same colour. No exported const was narrowed, so typos were silent until runtime.

Split into three layers:

1. `primitives/` — raw values only. `palette.gray[950]`, `space[16]`, `radius.lg`, `fontFamily.heading`. Source of truth. Zero duplicates.
2. `semantic/` — roles mapped to primitives. `color.bg.base → palette.gray[950]`, `color.state.success.dark → palette.green[400]`. A future light theme only changes this layer.
3. `theme.ts` — composes everything into a single `theme` object. `palette` is still exported as an escape hatch for one-off needs (jersey colours in mocks).

Every export is `as const`, so consumers get autocomplete on `theme.color.state.success.dark` and a compile error on a typo. `SpaceToken`, `RadiusToken`, `ColorGroup`, `TypographyToken`, `ShadowToken` are exported from `tokens/index.ts` for when component props need to constrain themselves to valid keys.

Dropped the duplicate `primary*` scale outright — it was a near-copy of `brand` offset by one shade. If "primary" becomes a product-distinct concept later it lives as a semantic alias on top of `brand`, not a parallel palette.

A grep over `components/` confirms every tokenizable colour resolves through `theme.*`. The remaining raw hex references are all scoped and defensible:

- `ELITE_BG = 'rgb(205, 49, 88)'` — single-source in `confidence.ts`, shared by `ConfidenceBadge`, `L5Pill`, and `EliteBackground`.
- `EliteBackground`'s gradient stops — Figma-specific pinks / whites / blacks, scoped to that one file.
- `Avatar` / `TeamLogoStack` `shadowColor: '#000'` — Figma uses `rgba(0,0,0,*)` shadows; pure black isn't in the palette and tokenising it would misrepresent.

## Notes from the Figma pass

A few specifics worth flagging because they shaped the code:

- **Odds pill, not streak pill.** The "+172" is a sportsbook odds pill (dark grey bg, DraftKings mark, American odds). Not a fire/streak badge — it's the bookmaker's payout.
- **Header meta uses three colours, not one.** Team-1 in `text.tertiary` (active), team-2 and time in `text.disabled`. Tonal contrast telegraphs which side the opportunity is on.
- **Tier alphas are not uniform.** Figma's `state/success/lighter` is `alpha.green[10]`, but `state/away/lighter` and `state/error/lighter` are `alpha.yellow[16]` / `alpha.red[16]`. The semantic tokens reflect this per-role rather than assuming a single alpha step.
- **Dropdown selected state.** bg `#1c1c1c` + `radius-6`, vs unselected `#171717` + `radius-8`. No check icon — Figma doesn't draw one.
- **Focus ring is two rings.** See Part 2.
- **`#202020` added to the palette as `gray[850]`** so `border.dark` can resolve through the primitive layer instead of being an inline hex.
- **`alpha.slate[16] = #99a0ae29`** added to the palette for `border.focus`.
- **`shadow.compact`** added as a semantic alias of `shadowPrimitive.xs` (matches Figma `regular-shadow/x-small`) so the card's add button and the select field both pull from one place.

Places I intentionally diverged from Figma in the RN port:

- Figma sets `line-height: 9.625px` on 12px / 9px text (a web trick relying on `overflow: clip`). On iOS that clips descenders. Rounded up to `14` on `monoXs` and `11` on `monoMini`. The pill heights are fixed (`h-18` / `h-12`) and children are vertically centered, so character baselines sit identically — the round-up is invisible in context.
- RN has no `mix-blend-mode`. The ELITE badge's white highlight and noise passes use tuned alpha (`0.35` white, `0.25` + `0.125` noise) to approximate Figma's overlay stack.
- RN `View` takes a single drop shadow. The avatar / team-logo 5-layer shadow stack is simplified to one layer.
- Focus ring rebuilt as two `View`s — see Part 2.
- `chevronDown` / `chevronUp` derived by rotating the right-arrow PNG since the down/up variants weren't exported (Remix's chevron set is rotationally symmetric).

## What I'd do with more time

- **Reanimated + `LayoutAnimation`** for the dropdown — staggered item entry, sharper than the current `Animated` cross-fade.
- **Snapshot / unit tests** for `tierFromPercentage` and a structural assertion that every `color.*` role resolves inside `palette` to catch accidental drift.
- **Outside-press dismiss** on the select + scrollable panel for when the league list grows past ~6 items.
- **Accessibility pass** — role labels on `Pressable`s, minimum hit targets on the small header icons.
- **Live-data mode on cards** — a small refresh tick + number animation on `L5Pill`.

## Decisions

- **Expo over bare RN.** The brief says no Expo unless there's a reason. Mine: font loading via `@expo-google-fonts/*` + `expo-font` is one step instead of three, and `npm run ios` boots the simulator. Nothing in `components/` depends on Expo APIs except `expo-linear-gradient`, so moving to bare RN is an init + three config swaps.
- **No external UI libraries for the core components,** as required. `react-native-svg` (SVG primitive) and `expo-linear-gradient` (gradient primitive) are used for icons the Remix set didn't cover and the ELITE badge overlay. Neither is a UI kit.
- **PNG icons via `tintColor` over an SVG icon font.** The Remix export is monochrome PNGs; tinting at runtime is ~10 lines and avoids bundling a font. Hand-rolled SVG stays for the three cases Remix didn't cover.
- **DraftKings logo** from the Figma export rendered as-is (not tinted). Trademark caveat: this is a test-task demo; in production the mark would need licensed use or a generic replacement.
- **Team logos + player headshots** from public CDNs (ESPN for logos, `cdn.nba.com` for headshots). Same trademark caveat — fine for a dev demo, flag before shipping.
