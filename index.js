const displayText = document.getElementById('result-text');
const buttons = document.querySelectorAll('button')

let displayValue = '0'
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

function updateDisplay() {
    displayText.innerHTML = displayValue
    if (displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}
updateDisplay()

buttons.forEach((button) => {
    button.addEventListener('click', function () {
        if (button.classList.contains('operand')) {
            inputOperand(button.value)
            updateDisplay()
        } else if (button.classList.contains('operator')) {
            inputOperator(button.value);
        } else if (button.classList.contains('equals')) {
            inputEquals();
            updateDisplay();
        } else if (button.classList.contains('clear')) {
            clearDisplay();
            updateDisplay()
        }
    })
})

//shoutout to mrbuddh4 for this understandable code i borrowed :)
function inputOperand(operand) {
    if (firstOperand === null) {
        if (displayValue === '0' || displayValue === 0) {
            displayValue = operand
        } else if (displayValue === firstOperand) {
            displayValue = operand
        } else {
            //allows the input of multiple values at once i.e 12 1 and 2 as 12
            displayValue += operand
        }
    } else {
        if (displayValue === firstOperand) {
            displayValue = operand
        } else {
            displayValue += operand
        }
    }

}

function inputOperator(operator) {
    if (firstOperator != null && secondOperator === null) {
        //4th click - handles input of second operator
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else if (firstOperator != null && secondOperator != null) {
        //6th click - new secondOperator
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else {
        //2nd click - handles first operator input
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    //hitting equals doesn't display undefined before operate()
    if (firstOperator === null) {
        displayValue = displayValue;
    } else if (secondOperator != null) {
        //handles final result
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if (result === 'Math Error') {
            displayValue = 'Math Error';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        //handles first operation
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if (result === 'Math Error') {
            displayValue = 'Math Error';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function operate(x, y, op) {
    if (op === '+') {
        return x + y;
    } else if (op === '-') {
        return x - y;
    } else if (op === '*') {
        return x * y;
    } else if (op === '/') {
        if (y === 0) {
            return 'Math Error';
        } else {
            return x / y;
        }
    }
}

function clearDisplay() {
    displayValue = '0'
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

//This rounds the displayvalue down to a given amount
function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}