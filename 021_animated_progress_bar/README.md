# 021 — Session-Based Loading Progress Bar

> **Phase 2 — Animations & Interactivity** | Experiment 21 of 100

---

## 🎯 What It Does

- Displays a simulated loading bar that fills from 0% to 100% before revealing the page
- Hides the entire page (`header`, `main`, `footer`) behind the loader on first load, using `opacity` + `visibility` as the resting state
- Fades the page in and the loader out with a `setTimeout`-paired transition, instead of an instant snap
- Uses `sessionStorage` to remember that the intro already played, so refreshing the page skips straight to the content — no bar, no wait
- Resets naturally on a new browser session (new tab/window), so the intro plays again for a genuinely fresh visit

---

## 💡 What I Learned

- **`opacity` and `visibility` solve different problems:** `opacity` animates smoothly through a transition; `visibility` is binary and snaps instantly, no matter what transition you attach to it. Getting a real fade meant using both together, not interchangeably.

- **The default state should already be "hidden," not JS-hidden:** If the page's resting state (in CSS) is visible and JS is what hides it, there's a window where the real page can flash on screen before JS even runs. Making "hidden" the CSS default and letting JS only ever *reveal* removed that flash entirely.

- **`sessionStorage.getItem` vs `setItem` are asking and telling, not the same action:** `getItem` reads what's already stored (or `null` if nothing is); `setItem` overwrites a value unconditionally. Mixing them up meant a "check" that was actually silently rewriting the flag on every load, which made the skip logic impossible to reach.

- **Timing race between two properties changing at once:** Setting `opacity: 0` and `visibility: hidden` in the same instant means `visibility` snaps immediately and cuts the opacity fade off before it's visible. Pairing a `setTimeout` (matched to the CSS transition duration) with the `visibility` change let the fade actually play out before the element was removed from view.

- **Where code lives changes what it does:** Moving the `sessionStorage` check and the `setInterval` call in and out of an `if`/`else` block was the difference between "sometimes runs twice," "runs but does nothing," and finally, running exactly once down the correct path.

---

## 🚧 Challenges I Faced

- **`onLoad()` existed but nothing called it:** The interval correctly counted up to 100% and stopped itself, but stopping the counter and revealing the page turned out to be two separate actions — only the first one was wired up. Fixed by calling `onLoad()` the moment the bar hits 100%.

- **The fade-out blinked instead of fading:** Adding `transition: opacity` looked like the fix, but the progress track still visibly snapped away. The real cause was `visibility` changing at the exact same instant as `opacity`, cutting the transition off before it could render. Fixed with a `setTimeout` that delays the `visibility` change until after the opacity transition's duration.

- **Skip logic ran the intro anyway:** Early attempts checked `sessionStorage` but only ever called `clearInterval()` in the "already seen" branch — which stops the ticking but never reveals the page, leaving it stuck showing just the progress track. Fixed by calling `onLoad()` directly in that branch instead.

- **The interval still ran even when skipped:** Even after `onLoad()` was correctly called in the skip branch, `setInterval` was declared outside the `if`/`else`, so it kept ticking in the background on every refresh regardless of which path was taken — invisibly, but still calling `onLoad()` a second time. Fixed by moving the `setInterval` call fully inside the "first time this session" branch.

---

## 🔗 Live Demo

[View Live](https://reiwebdeveloper.github.io/rei_creative_coding_lab/021_animated_progress_bar/)

---

## 📸 Preview

![Session-Based Loading Progress Bar Preview](previewProgressBar.png)
![Webpage after loading progress bar](previewNH.png)

---

## ⏱️ Time Taken

~5 hours

---

[← Back to Main README](../README.md)