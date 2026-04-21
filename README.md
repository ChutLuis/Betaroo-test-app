# Betaroo — React Native Test Task

Implementation for the Betaroo RN developer test task. Includes two opportunity card variants (Player, Team), their shared atoms (`ConfidenceBadge`, `L5Pill`), the `LeagueSelect` multi-select with animated states, and a refactored token system.

## Running

Requires Node 20+ and an iOS simulator (Xcode).

```bash
npm install
npm run ios          # opens iOS simulator via Expo Go
# or
npx expo start       # then press "i" for iOS
```

Fonts (Manrope, Inter, DM Mono) are loaded from Google Fonts at runtime — first launch may take a second while they download.

## What's in here

```
tokens/              # Part 3 — refactored token system
  primitives/        # raw values (palette, space, radius, shadows, type families)
  semantic/          # role-based (color.bg.*, color.text.*, color.state.*, typography)
  theme.ts           # single composed `theme` export
  index.ts           # public API: { theme, types }

components/
  atoms/
    ConfidenceBadge  # ELITE / STRONG / FAIR / RISKY
    L5Pill           # stat pill — auto tiers by percentage
    Icon             # react-native-svg icon set
    confidence.ts    # shared tier logic (tierFromPercentage, palettes)
  cards/
    PlayerCard       # wide card — avatar + player + position + stat
    TeamCard         # wide card — logo + team + market
    parts/           # CardHeader, CardFooter, Avatar, FireBadge
  select/
    LeagueSelect     # 3-state multi-select (default / focus / filled)

mocks/               # demo data for App.tsx
App.tsx              # scroll demo screen
```

## Part 1 — Opportunity Cards

Built the **two wide variants** (Player + Team). They share `CardHeader`, `CardFooter`, `Avatar`, and `FireBadge`, so the identity row is the only real difference. The narrow card in Figma was the odd one out and the brief says pick 2 — skipped it to keep the submission tight and the shared parts genuinely shared.

- `ConfidenceBadge` accepts either a `tier` or a `value` (percentage) and renders the right colour automatically via `tierFromPercentage` in [components/atoms/confidence.ts](components/atoms/confidence.ts).
- `L5Pill` takes a percentage + optional `label` ("L5" / "L10" / "L20") and picks the tier colour the same way.
- Tier thresholds: `≥90 elite / 70–89 strong / 40–69 fair / <40 risky`.
- Cards render in a `FlatList` so scrolling is windowed.

## Part 2 — Select

Three states in one component using a single `Animated.Value` driver (`progress`):

- **Default:** empty placeholder ("0 Leagues Selected"), chevron down.
- **Focus:** `progress → 1` animates (220ms, cubic-out) the dropdown panel's `height` + `opacity`, and rotates the chevron 180°.
- **Filled:** a separate `countProgress` spring cross-fades the empty placeholder with the filled summary and adds a small vertical offset so it doesn't just blink — visible right when you select/deselect the first item.
- Selected rows get a subtle `bg.secondary` fill + a brand-coloured check icon.

I used RN's built-in `Animated` API rather than Reanimated. The animations here are timing/spring driven, not gesture driven — Animated is lighter, has no native-link step, and keeps the core components library-free (the brief forbids external UI libs). Reanimated is installed but unused; happy to port if you want gestural polish.

## Part 3 — Token Refactor

### What was wrong

The original `tokens/tokens.ts` had three problems:

1. **Inconsistent casing everywhere** — `bg_base`, `bgDark`, `BG_OTHER`, `backgroundWeak`, `background_weaker` all in the same file. No way for autocomplete to help.
2. **Duplicate semantics** — `brand` and `primary` scales were near-identical; `bg_*`/`border_*` mixed hex literals (`'#171717'`) with palette refs (`colors.gray[950]`) for the same colour.
3. **No type safety** — every export was a loose const. Typos in consumers would fail at runtime.

### What I did

Split into three layers, each with a single responsibility:

- **`primitives/`** — raw values only. No semantics. `palette.gray[950]`, `space[16]`, `radius.lg`, `fontFamily.heading`. This is the source of truth; nothing in here should ever be a duplicate.
- **`semantic/`** — roles that map to primitives. `color.bg.base → palette.gray[950]`. `color.state.success.dark → palette.green[400]`. If we ever add light mode, this is the only layer that changes.
- **`theme.ts`** — composes everything into a single `theme` object (with `palette` as an escape hatch).

Everything is `as const`, so consumers get autocomplete on `theme.color.state.success.dark` and a type error on `theme.color.state.succss`. Exported types (`SpaceToken`, `RadiusToken`, `ColorGroup`, etc.) let component props constrain themselves to valid token keys.

### Why this scales

- **Separation of concerns** — change a brand hue in `primitives/colors.ts` and every semantic role that points at it updates. Rename `bg.primary` to `surface.default` and nothing else changes.
- **Dark/light theming** — swap the `semantic/` exports based on a mode without touching primitives or consumers.
- **Single casing** — all keys are `camelCase` (or T-shirt size for radius). Designers and devs stop guessing.
- **No hex duplicates** — I grepped the final components and every colour resolves through `theme.*`.

The one duplicate I dropped outright was the `primary*` scale — it was a near-copy of `brand` with one offset. Kept `brand` as the canonical scale; if "primary" becomes a distinct product concept later, it lives as a semantic alias on top of `brand`, not a parallel palette.

## Figma calibration pass

After the first pass I pulled every frame through the Figma MCP and rebuilt against exact specs. Biggest deltas worth flagging:

- **The "+172" pill isn't a fire/streak badge.** The Figma source is a **sportsbook odds pill** — dark-grey `#262626` background, sportsbook mark on the left, American odds in `DM Mono Medium 12` on the right. I had shipped it with a 🔥 emoji and a numeric streak. Fixed: renamed `FireBadge` → `OddsBadge`, swapped the emoji for a generic sportsbook SVG placeholder (DraftKings logo is proprietary), and the mock data now carries odds strings (`+172`, `-135`, `+240`, `EVEN`).
- **Card shell restructure.** The card is three stacked sections with 1px `#202020` dividers between them — not a single padded container. Outer radius is `8` (not `16`), outer padding is `0`. Each section owns its own padding (`12/6/8` header, `12` body, `12/8` footer).
- **ELITE chance badge is a 5-layer gradient stack**, not a solid pink. I replicate it via `components/atoms/EliteBackground.tsx`: base pink fill → radial pink highlight (SVG) → white radial bloom at the bottom (alpha-approximated since RN has no `mix-blend-overlay`) → ~155° diagonal dark overlay (`expo-linear-gradient`) → two passes of a noise texture (`assets/textures/noise.png`, generated by `scripts/generate-noise.js` with a seeded PRNG for reproducibility). STRONG / FAIR / RISKY stay on the much simpler `alpha.*` + tier-colored text pattern.
- **Header meta is three colours, not one.** Team-1 sits in `text.tertiary` (active), team-2 and the time both sit in `text.disabled` — the design telegraphs the primary team via tonal contrast. Done with distinct `<Text>` nodes rather than one styled string.
- **Typography** now references the source-of-truth scale exactly: `DM Mono Medium` picks up `letterSpacing: 0.24` in `monoXs`, a new `monoMini` (9px / 0.18 tracking) drives the position chip, player/team names use `labelSm` (Inter 14/20), and the stat line / market uses `paragraphXxs` (Inter 12/16).
- **L5 pill value text is always white**, not tier-coloured. Only the pill itself carries the tier colour; the percentage number stays neutral. This matches Figma and reads better when scanning.
- **Select focus state** has a white border + a dual-ring outer glow (2px inner `#171717`, 4px outer `alpha/slate/alpha-16`). Simulated in RN via an absolutely-positioned wrapper `View` with a 2px border at `rgba(153,160,174,0.16)`, offset `-4px` on all sides, fading in as the dropdown opens.
- **Dropdown rows** are individually rounded (`radius.lg = 8`) with their own bg and 8px padding — not one long list with dividers.

### RN translations (where I diverged intentionally)

- Figma text nodes use `line-height: 9.625px` on 12px glyphs (a tight design trick relying on `overflow: clip`). On iOS this causes descender clipping. I round up to `lineHeight: 14` on `monoXs` and `12` on `monoXxs` — visually identical in the target container sizes.
- RN doesn't support `mix-blend-mode`. The ELITE gradient's white-highlight layer and noise-texture layers use tuned opacity (`0.35` and `0.25/0.125`) to approximate the overlay blend.
- The focus ring in Figma is a `box-shadow: 0 0 0 2px #171717, 0 0 0 4px alpha/slate/alpha-16`. RN can't do inset/spread shadows, so I rebuild it with a second `View` positioned `-4px` on each side at the same alpha colour.

## What I'd do with more time

- **Real team/player logos.** Right now the `Avatar` is a coloured circle with a 2–3 letter label — fine for showing structure, not production.
- **A live-data mode on the cards.** The `stats` array is static; a small refresh tick + number animation on `L5Pill` would feel nicer.
- **Reanimated for the dropdown.** The current `Animated.Value` cross-fade is clean but a layout-animated list with staggered item entry would look sharper.
- **Snapshot tests** for the token layers — a simple assertion that every `color.*` role resolves to a value in `palette` would catch accidental drift.
- **Accessibility pass** — role labels on `Pressable`s, minimum hit targets on the small header icons.

## Decisions

- **Expo over bare RN.** The brief said "no Expo unless you have a good reason". My reason: font loading via `@expo-google-fonts/*` + `expo-font` is one step instead of three, iOS simulator boot is `npm run ios`, and we're not shipping a store build from this repo. Nothing in the components depends on Expo APIs, so moving to bare RN is a 10-minute swap if needed.
- **No external UI libraries** for the core components, as required. `react-native-svg` (primitive renderer) and `expo-linear-gradient` (primitive gradient) are used for the icon set and the ELITE badge — neither is a UI kit.
- **SVG icons over an icon font** — smaller footprint for the ~11 icons we need, no font files to load.
- **Generic `sportsbook` SVG** stands in for the DraftKings mark visible in the Figma source. Swapping in the real asset is a one-line change in `components/atoms/Icon.tsx`.
