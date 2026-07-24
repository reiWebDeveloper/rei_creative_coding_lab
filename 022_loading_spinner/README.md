# 022 — Session-Based Loading Spinner

> **Phase 1 — JS Fundamentals** | Experiment 22 of 100

---

## 🎯 What It Does

- Displays a rotating spinner (built from a CSS `conic-gradient` + `@keyframes spin`) while the page is hidden behind it
- Hides `header`, `main`, and `footer` by default (`opacity: 0`, `visibility: hidden`), revealing them only once loading is done
- Simulates a 3-second load using `setTimeout`, then reveals the page in one `onLoad()` call
- Uses `sessionStorage` to remember the intro already played, so refreshing the page skips straight to the content
- Direct follow-up to the progress bar version — same reveal logic and `onLoad()` structure, spinner instead of a filling bar

---

## 💡 What I Learned

- **Where a `setTimeout` sits changes what it delays:** Putting it inside the `if` branch (the "already seen this session" path) meant the delay applied to the wrong case — the skip logic ended up waiting 3 seconds before doing nothing useful. Moving it into the `else` branch (the "fresh session" path) meant the delay only ever applies to a genuine first load, and the skip path reveals instantly like it should.

- **Not every version needs the same fix as the last one:** The progress bar version needed a `setTimeout` specifically to stagger `visibility` behind `opacity` and avoid a blink. This version uses `setTimeout` for a completely different reason — delaying when `onLoad()` fires at all, to simulate a loading duration — which is a good reminder that the same tool can solve different problems depending on what's actually happening in each version.

- **Reusable structure speeds things up:** Because the `onLoad()` reveal logic, the `sessionStorage` read/write, and the branch shape were already solved in the progress bar version, adapting this one was mostly swapping the visual (bar → spinner) rather than re-solving the underlying logic from scratch — which is likely why this one took a fraction of the time.

---

## 🚧 Challenges I Faced

- **`setTimeout` in the wrong branch:** First attempt placed the delay inside the `if (sessionState !== null)` branch — the skip path — which meant returning visitors sat waiting 3 seconds for nothing, while first-time visitors got no delay at all. The intended and actual behavior were swapped. Fixed by moving the `setTimeout` into the `else` branch instead, so only a genuinely fresh session waits before `onLoad()` fires.

---

## 🔗 Live Demo

[View Live](https://reiwebdeveloper.github.io/rei_creative_coding_lab/022_loading_spinner/)

---

## 📸 Preview

![Session-Based Loading Spinner Preview](previewSpinner.png)

---

## ⏱️ Time Taken

~45 minutes

---

[← Back to Main README](../README.md)