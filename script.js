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
    equalsPressed: false
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
    if (state.equalsPressed) {
        resetState();
    }
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

    if (state.second) {
        calculate(false);
    }

    if (!state.operator) {
        switchCurrent();
    }

    removeSelectedOperator();
    e.target.classList.add("selected");
    state.operator = e.target.id;
    console.log(state);
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
        state.current = "first";
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

const handleEqualsClick = (e) => {
    if (!state.first || !state.second) {
        return;
    }
    console.log(state);
    calculate(true);
}

const calculate = (equalsPressed) => {
    result = evaluateResult();
    state.equalsPressed = equalsPressed;
    state.first = result;
    state.second = "";
    updateDisplay(result);
}

const evaluateResult = () => {
    const result = operate(Number(state.first), Number(state.second), state.operator);
    console.log(result);
    return roundThreeDecimals(result);
}

const resetState = () => {
    state.first = "";
    state.second = "";
    state.operator = "";
    state.current = "first";
    state.equalsPressed = false;
}

const addEqualsEvent = () => {
    const equalsButton = document.querySelector("#equals");
    equalsButton.addEventListener('click', handleEqualsClick);
}

const handleClearButtonClick = () => {
    resetState();
    updateDisplay("0");
}

const addClearButtonEvent = () => {
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', handleClearButtonClick);
}

const roundThreeDecimals = (number) => Math.round(number * 1000) / 1000;

addNumberEvents();
addOperatorEvents();
addEqualsEvent();
addClearButtonEvent();