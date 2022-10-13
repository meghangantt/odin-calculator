const add = (x, y) => x+y;

const subtract = (x, y) => x-y;

const multiply = (x, y) => x*y;

const divide = (x, y) => x/y;

const operate = (operator, x, y) => {
    let action;
    if (operator==="+") {
        action = add(x, y);
    } else if (operator==="-") {
        action = subtract(x, y);
    } else if (operator==="×") {
        action = multiply(x, y);
    } else if (operator==="÷") {
        action = divide(x, y);
    }
    return action;
};

let theDisplay = document.querySelector('.display');

const numbers = document.querySelectorAll('.number');

let currentValue;
let prevValue;
let operator;
let needsClear = false;

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if (needsClear) {
            theDisplay.textContent = undefined;
            needsClear = false;
        };
        theDisplay.textContent += number.textContent;
        currentValue = +(theDisplay.textContent);
    });
});

const operations = document.querySelectorAll('.operator');

operations.forEach((operation) => {
    operation.addEventListener('click', () => {
        operator = operation.textContent;
        prevValue = currentValue;
        currentValue = undefined;
        needsClear = true;
    });
});

const equals = document.querySelector('.equals');

equals.addEventListener('click', () => {
    theDisplay.textContent = operate(operator, prevValue, currentValue);
    needsClear = true;
});