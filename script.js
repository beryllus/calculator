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
    current: "first",
    justFinished: false
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
    removeSelectedOperator();
    console.log(state)
}

const removeSelectedOperator = () => {
    const selectedOperator = document.querySelector(".selected");
    if (selectedOperator) {
        selectedOperator.classList.remove("selected");
    }
}

const handleOperatorClick = (e) => {
    if (!state.first) {
        return;
    }
    removeSelectedOperator();
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

const handleEqualsClick = (handleEqualsClick) => {
    if (!state.first || !state.second) {
        return;
    }
    const result = operate(Number(state.first), Number(state.second), state.operator);
    console.log(result);
    state.first = result;
    updateDisplay(result);
}

const addEqualsEvent = () => {
    const equalsButton = document.querySelector("#equals");
    equalsButton.addEventListener('click', handleEqualsClick);
}

addNumberEvents();
addOperatorEvents();
addEqualsEvent();