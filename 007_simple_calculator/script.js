const btns = document.querySelectorAll("button");
const previousOperandEl = document.getElementById("previeus-operand");
const currentOperandEl = document.getElementById("current-operand");

let currentOperandString = "";
let previousOperandString = "";
let operatorString = "";
let result = 0;

// math operations
const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => b === 0 ? "Cannot divide by 0" : a / b,
};

// update UI
function updateDisplay() {
    previousOperandEl.textContent = previousOperandString 
        ? previousOperandString + " " + operatorString 
        : "";
    currentOperandEl.textContent = currentOperandString;
}

// actions
function handleOperator(value) {
    if (!currentOperandString) return; // ignore if nothing typed yet
    operatorString = value;
    previousOperandString = currentOperandString;
    currentOperandString = "";
    updateDisplay();
}

function calculate() {
    if (!previousOperandString || !currentOperandString || !operatorString) return;
    const a = parseFloat(previousOperandString);
    const b = parseFloat(currentOperandString);
    result = operations[operatorString](a, b);
    currentOperandString = String(result);
    previousOperandString = "";
    operatorString = "";
    updateDisplay();
}

function clear() {
    currentOperandString = "";
    previousOperandString = "";
    operatorString = "";
    updateDisplay();
}

function deleteLast() {
    currentOperandString = currentOperandString.slice(0, -1);
    updateDisplay();
}

function appendValue(value) {
    if (value === "." && currentOperandString.includes(".")) return; // prevent double dot
    currentOperandString += value;
    updateDisplay();
}

// main func
function checkButtonValue(value) {
    if (value in operations)  handleOperator(value);
    else if (value === "=")   calculate();
    else if (value === "AC")  clear();
    else if (value === "DEL") deleteLast();
    else                      appendValue(value);
}

btns.forEach(btn => {
    btn.addEventListener("click", () => checkButtonValue(btn.textContent));
});