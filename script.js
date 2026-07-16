const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        return NaN;
    }
    return a / b;
}

let state = {
    first: "",
    second: "",
    operator: "",
    current: "first"
}

const operate = (a, b, operator) => {
    switch (operator) {
        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case "divide":
            return divide(a, b);
        default:
            return NaN;
    }
}

const handleNumberClick = (e) => {
    state[state.current] += e.target.textContent;
    updateDisplay(state[state.current]);
    console.log(state)
}

const handleOperatorClick = (e) => {
    if (!state.first) {
        return;
    }
    e.target.classList.add("selected");
    state.operator = e.target.id;
    switchCurrent();
}

const addOperatorEvents = () => {
    const operatorButtons = document.querySelectorAll(".operator");
    operatorButtons.forEach((button) => {
        button.addEventListener('click', handleOperatorClick);
    })
}

const switchCurrent = () => {
    if (state.current === "first") {
        state.current = "second";
    } else {
        state.curent = "first";
    }
}

const addNumberEvents = () => {
    const numberButtons = document.querySelectorAll(".number");
    numberButtons.forEach((button) => {
        button.addEventListener('click', handleNumberClick);
    })
}

const updateDisplay = (value) => {
    const display = document.querySelector(".result");
    display.textContent = value;
}

addNumberEvents();
addOperatorEvents();