# 024 — Mouse Trail Effect

> **Phase 2 — Animations & Interactivity** | Experiment 024 of 100

---

## 🎯 What It Does

- Spawns a small colored circle at the cursor's position on every `mousemove` event, building a trail that follows the mouse around the canvas
- Each circle gets a random hue via `hsl(${Math.random() * 360}, 80%, 60%)`, locking saturation and lightness so every circle looks vibrant and cohesive despite the random color
- Each circle fades out over time by decrementing a `fade` value every frame and mapping it to `globalAlpha`, then gets filtered out of the array once fully invisible
- Runs entirely on a `requestAnimationFrame` loop that clears the canvas and redraws only the currently "alive" circles each frame

---

## 💡 What I Learned

- **Canvas paths are cumulative unless you reset them.** Skipping `ctx.beginPath()` before each shape doesn't start a fresh path — it appends the new shape's points onto whatever path already existed. Calling `fill()` or `stroke()` afterward renders the *entire* accumulated path, not just the newest shape, which is why the canvas looked like it was "filling in" as the mouse moved instead of showing separate circles.

- **`closePath()` matters for `stroke()`, not `fill()`.** `fill()` automatically closes any open subpath on its own — `closePath()` only changes anything if you're stroking, since it draws an explicit line back to the subpath's starting point.

- **`const` blocks reassignment, not mutation.** `array.push()` mutates the array in place, which is fine with `const`. But `array = array.filter(...)` creates a brand-new array and assigns it back to the variable — that's a reassignment, and `const` throws on it. Arrays/objects you plan to reassign (not just mutate) need `let`.

- **HSL separates "which color" from "how intense."** Locking saturation and lightness and only randomizing hue (0–360°) gives fully random colors that still all share the same brightness and vibrancy — avoiding the muddy, inconsistent look random RGB values tend to produce.

- **Linear interpolation and path-clearing solve different problems.** `beginPath()`/`clearRect()` fix *structural* bugs (old frames polluting new ones). Lerp-style easing (`x += (target - x) * speed`) is a *feel* fix — it's what makes motion look smooth and chased rather than jumpy, and one doesn't substitute for the other.

---

## 🚧 Challenges I Faced

- **Canvas appeared to "fill in" wherever the mouse moved:** turned out every `arc()` call was being appended to one giant cumulative path instead of drawing independent circles, since `beginPath()` wasn't called per-shape. Fixed by calling `ctx.beginPath()` (and `ctx.closePath()`) inside the per-circle draw loop.

- **`Uncaught TypeError: Assignment to constant variable`:** the circles array was declared with `const` but later reassigned via `circles = circles.filter(...)` to prune dead circles. Fixed by switching the declaration to `let`.

---

## 🔗 Live Demo

[View Live](https://reiwebdeveloper.github.io/rei_creative_coding_lab/024_mouse_trail_effect/)

---

## ⏱️ Time Taken

~4h

---

[← Back to Main README](../README.md)