# 📱 React Native Developer - Test Task

## Overview

Betaroo is a multi-sport betting analytics platform. Mobile-first, native-first, built in React Native with TypeScript.

This test has three parts: building UI components from Figma, building an interactive component, and refactoring a token system. Explain your working throughout.

**Figma**: password is `betaroo`

---

## Part 1: Opportunity Cards

Pick 2 of the 3 card styles below. Build each as a reusable React Native component with TypeScript. Match the Figma exactly: tokens, spacing, typography, radii, colours. Render with mock data in a scrollable list. No external UI libraries. Animations are not required but noticed.

The Figma includes the individual atoms (confidence badges, L5 percentage pills). Build these as standalone components too.

---

## Part 2: Select Component

Build the Preferred Leagues select component with all three states:

- Default (empty)
- Focus (dropdown open)
- Filled (selections made)

Match the Figma for each state. We want to see clean, considered animations between states: opening the dropdown, selecting/deselecting items, and the transition from empty to filled. Show us what feels right.

---

## Part 3: Token Refactor

The repo includes a `tokens/` folder. It works, but it is not how we would ship it. Refactor the token system into a clean, scalable architecture. We want to see how you think about separation of concerns, naming conventions, type safety, and maintainability. Explain your working.

**File**: `tokens.zip` (3.7 KiB)

---

## Technical Requirements

- React Native with TypeScript (no Expo unless you have a good reason, and if so, explain it)
- Functional components with hooks
- Styling via `StyleSheet.create`
- No external UI libraries for the core components
- Code should run on iOS

---

## What to Submit

- A GitHub repo (public or private, invite us if private)
- A brief README covering how to run it, decisions you made, and anything you would do differently with more time
- Screen recordings or screenshots showing the components running on a simulator

---

## Questions?

If anything is unclear about the designs or requirements, ask.
