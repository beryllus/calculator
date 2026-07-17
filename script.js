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
    state.equalsPressed = false;
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
    calculate(true);
}

const calculate = (equalsPressed) => {
    result = evaluateResult();
    if (Number.isNaN(result)) {
        resetCalculator();
        updateDisplay("Invalid Operation!");
        return;
    }
    state.equalsPressed = equalsPressed;
    state.first = String(result);
    state.second = "";
    updateDisplay(result);
}

const evaluateResult = () => {
    const result = operate(Number(state.first), Number(state.second), state.operator);
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

const resetCalculator = () => {
    resetState();
    updateDisplay("0");
}

const handleClearButtonClick = () => resetCalculator();

const addClearButtonEvent = () => {
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', handleClearButtonClick);
}
const handleDotClick = (e) => {
    if (state[state.current].includes(".")) {
        return;
    }
    if (state[state.current].length == 0) {
        state[state.current] = "0.";
    } else {
        state[state.current] += ".";
    }
    updateDisplay(state[state.current]);
    removeSelectedOperator();
}

const addDotEvent = () => {
    const dotButton = document.querySelector("#dot");
    dotButton.addEventListener("click", handleDotClick);
}

const handleDelClick = (e) => {
    if (state[state.current].length > 1) {
        state[state.current] = state[state.current].slice(0, -1);
        updateDisplay(state[state.current]);
    } else {
        state[state.current] = "";
        updateDisplay("");
    }
}

const addDelButtonEvent = () => {
    const delButton = document.querySelector("#delete");
    delButton.addEventListener('click', handleDelClick);
}

const handleKeydown = (e) => {
    if (e.code.startsWith("Digit") && !e.shiftKey && !e.altKey) {
        pressButton(`#digit-${e.key}`);
        return;
    }
    switch (e.key) {
        case "*":
            pressButton("#multiply");
            break;
        case "+":
            pressButton("#add");
            break;
        case "-":
            pressButton("#subtract");
            break;
        case "/":
            pressButton("#divide");
            break;
        case "Backspace":
            pressButton("#delete");
            break;
        case "c":
            pressButton("#clear");
            break;
        case "=":
            pressButton("#equals");
            break;
        default:
            return;
    }
}

const addKeyboardEvents = () => {
    const body = document.querySelector("body");
    body.addEventListener("keydown", handleKeydown);
}

const pressButton = (selector) => {
    const mouseEvent = new MouseEvent('click', {
        bubbles: true
    })
    const button = document.querySelector(selector);
    button.dispatchEvent(mouseEvent);
}

const roundThreeDecimals = (number) => Math.round(number * 1000) / 1000;

addNumberEvents();
addOperatorEvents();
addEqualsEvent();
addClearButtonEvent();
addDotEvent();
addDelButtonEvent();
addKeyboardEvents();