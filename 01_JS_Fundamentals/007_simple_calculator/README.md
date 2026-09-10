# 007 — Simple Calculator

> **Phase 1 — JS Fundamentals** | Experiment 7 of 100

---

## 🎯 What It Does

A clean, modern calculator that handles the four core arithmetic operations:

- Addition, subtraction, multiplication, and division
- Real-time display with a two-line layout (previous operand + current operand)
- Divide by zero protection with a friendly error message
- DEL key to backspace one character at a time
- AC key to fully reset the calculator state
- Decimal point support with double-dot prevention

---

## 💡 What I Learned

- Modeling calculator state with three variables: `currentOperandString`, `previousOperandString`, and `operatorString`
- The **two-slots mental model** — understanding how numbers get promoted from current to previous when an operator is pressed
- Using an **object as a lookup map** to store math operations as arrow functions, replacing a chain of `if/else` statements
- Writing concise **arrow functions** inside an object literal
- Using **bracket notation** to dynamically call the right function at runtime (`operations[operatorString](a, b)`)
- Debugging logic by reading code carefully — spotting that `operatorString = value` at the top of the function was overwriting state on every click
- Spotting and fixing a **naming conflict** between a variable and a function both called `result`
- Using `parseFloat()` to safely convert strings to numbers for calculations
- Using guard clauses (early `return`) to prevent operations running with missing state
- Separating concerns — one function per action, one `updateDisplay()` for all DOM updates

---

## 🚧 Challenges I Faced

- Internalizing the two-slots mental model — knowing *when* to promote `currentOperand` to `previousOperand`
- Debugging the operator branch: `operatorString = value` was placed at the top of the function, so clicking `=` would overwrite the saved operator with `"="` before the calculation ran
- Understanding how an object can store functions as values and how to call them dynamically with bracket notation
- Distinguishing between arrow functions as shorthand and understanding what they actually return

---

## 🔗 Live Demo

[View Live](https://reiwebdeveloper.github.io/rei_creative_coding_lab/007_simple_calculator/)

---

## 📸 Preview

![Simple Calculator Preview](previewSimpleCalculator.png)

---

## ⏱️ Time Taken

~3-5 hours

---

[← Back to Main README](../README.md)