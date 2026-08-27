# 026 — Magnetic Button Interaction

> **Phase 2 — Animations & Interactivity** | Experiment 026 of 100

---

## 🎯 What It Does

- A circular element reacts to the cursor like it's magnetically attracted to it — moving toward the mouse while hovered, then springing back to center with a bounce once the cursor leaves
- Uses a hand-built spring physics simulation (displacement → force → velocity → position) instead of a CSS `transition`, so the motion overshoots and settles naturally rather than easing in one fixed curve
- Runs on a self-sustaining `requestAnimationFrame` loop gated by an `isAnimating` boolean, so the loop starts once on the first mouse move, keeps rescheduling itself every frame while in motion, and stops itself entirely once the button settles — no duplicate loops, no idle CPU usage while at rest
- A glow (`box-shadow`) around the button scales in size and opacity based on current speed (derived via the Pythagorean theorem from `velX`/`velY`), so the element visually "flares" while moving fast and calms to a baseline glow at rest
- Recalculates the button's center position on `resize`, instead of once at page load, so the magnetic effect stays accurate if the viewport size changes

---

## 💡 What I Learned

- **Spring physics is two forces fighting each other, recomputed every frame.** `force = -stiffness * displacement - damping * velocity` — the spring term always pulls back toward the target harder the farther away it is, while the damping term always opposes whatever velocity currently exists, regardless of direction. Velocity itself isn't calculated by dividing distance by time here — it accumulates frame over frame, nudged by `force` each tick, with each animation frame acting as one implicit "unit" of time.

- **A variable declared inside a function dies the moment that function returns.** Values needed across multiple event firings (`moveX`, `posX`, `velX`, etc.) have to live as shared, top-level variables instead — the same reason the button's mouse-move target has to be reassigned (`moveX = ...`), not redeclared (`const moveX = ...`), inside the listener.

- **Calling a self-scheduling function twice doesn't restart it — it runs two independent copies in parallel.** `requestAnimationFrame` chains don't know about each other; calling `springMotion()` again while one is already running creates a second loop fighting over the same shared variables, not a "refreshed" version of the first.

- **A boolean flag is what lets an outside event "wake up" a loop that already stopped itself.** `isAnimating` doesn't control the motion directly — it's the shared signal that tells `mousemove` "the loop already died, it's safe to start a new one" versus "it's still running, don't call it again."

- **Threshold-based stopping is necessary because damped motion never hits exactly zero.** Checking `position === 0` would (almost) never be true due to floating-point decay approaching zero asymptotically — checking `Math.abs(value) < 0.5` on both position and velocity, for both axes, is what actually lets the loop end.

- **Two competing animation systems fight each other if they both touch the same property.** Leaving a CSS `transition` on `transform` while JS was already writing a new spring-calculated value every ~16ms meant every frame's CSS transition got interrupted by the next frame's, before ever completing, producing visible lag. Removing the CSS transition entirely (since the JS spring math already provides its own smoothing) fixed it.

- **`let x, y = 0;` does not initialize both variables.** A comma-separated `let` declaration treats each variable as independent — only the one directly attached to `= 0` gets that value, the other defaults to `undefined`. Needed either `let x = 0, y = 0;` or separate lines.

- **The Pythagorean theorem is how you turn two separate velocity components into one "speed" number.** `Math.sqrt(velX² + velY²)` combines horizontal and vertical velocity into a single magnitude, so a button moving fast in only one axis still registers as genuinely fast overall, not just fast in that one direction.

- **Values recalculated on every mouse-pixel-move aren't free.** `getBoundingClientRect()` only actually needs to run when the layout changes — attaching it to the specific browser event for that (`resize`) instead of the highest-frequency event available (`mousemove`) avoids redundant layout recalculation.

---

## 🚧 Challenges I Faced

- **Button snapped to the target instantly instead of springing:** `mousemove` was still writing directly to `btn.style.transform`, bypassing the spring simulation entirely. Fixed by having `mousemove` only update the shared target variables (`moveX`/`moveY`), leaving all actual movement to the `springMotion` loop.

- **`ReferenceError` / incorrect force calculation on the first frame:** `force` was being read before it had ever been assigned, because the four calculation steps (displacement → force → velocity → position) were written out of physical order. Reordered so each value is computed only from things already known at that point in the frame.

- **Motion became increasingly chaotic the more the mouse moved:** `springMotion()` was being called directly from inside both `mousemove` and `mouseleave`, spinning up a new independent animation loop on every call rather than one continuous loop. Fixed by calling it exactly once, outside any listener, and letting the listeners only update shared target state from then on.

- **Animation never restarted after the button settled once:** once the loop's stop-condition was hit and `requestAnimationFrame` stopped being called again, nothing in the code could ever restart it — the "call once" fix for the duplicate-loop bug had no mechanism left to wake the loop back up. Solved with an `isAnimating` flag: `mousemove` only calls `springMotion()` if the flag is currently `false`, and the loop itself flips the flag back to `false` right before it stops rescheduling itself.

- **Glow and motion lagged behind the cursor:** a leftover CSS `transition: transform ease` was still active while JS was already writing a new `transform` value every frame, causing every frame's CSS transition to get interrupted before completing. Removed the CSS transition entirely.

- **Button jumped to the wrong position after resizing the window:** the button's center (`x`, `y`) was calculated once at page load and never updated, even though the CSS flexbox centering visually moves the button's true center on every resize. Fixed by moving the center calculation into a `resize` listener (plus one upfront call before the first interaction), instead of recalculating it constantly inside `mousemove` or the animation loop.

- **Center coordinates silently became `undefined`:** `let x, y = 0;` only assigned `0` to `y` — `x` was left as `undefined` since comma-separated declarations don't share one initializer. Fixed by giving each variable its own explicit `= 0`.

---

## 🔗 Live Demo

[View Live](https://reiwebdeveloper.github.io/rei_creative_coding_lab/026_magnetic_button/)

---

## ⏱️ Time Taken

~16h

---

[← Back to Main README](../README.md)