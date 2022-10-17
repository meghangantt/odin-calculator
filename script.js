const add = (x, y) => x+y;
const subtract = (x, y) => x-y;
const multiply = (x, y) => x*y;
const divide = (x, y) => x/y;

let theDisplay = document.querySelector('.display');

const numbers = document.querySelectorAll('.number');

let currentValue;
let prevValue;
let operator;

const clearDisplay = () => theDisplay.textContent = undefined;
let needsClear = false;

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if (needsClear) {
            clearDisplay();
            needsClear = false;
        };
        if (!(number.textContent==="." && theDisplay.textContent.includes("."))) {
            theDisplay.textContent += number.textContent;
            currentValue = +(theDisplay.textContent);
        };
    });
});

const operations = document.querySelectorAll('.operator');

let prevOperator;

operations.forEach((operation) => {
    operation.addEventListener('click', () => {
        prevOperator = operator;
        operator = operation.textContent;
        if (!(currentValue===undefined || prevValue===undefined)) {
            theDisplay.textContent = operate(prevOperator, prevValue, currentValue);
            prevValue = +(theDisplay.textContent);
        } else {
            prevValue = currentValue;
        }
        currentValue = undefined;
        needsClear = true;
    });
});

const plusMinusBtn = document.querySelector('.plusminus');

plusMinusBtn.addEventListener('click', () => {
    currentValue = -1 * +(theDisplay.textContent);
    theDisplay.textContent = currentValue;
})

const equalsBtn = document.querySelector('.equals');

equalsBtn.addEventListener('click', () => {
    theDisplay.textContent = operate(operator, prevValue, currentValue);
});

const operate = (operator, x, y) => {
    let result;
    if (operator==="+") {
        result = add(x, y);
    } else if (operator==="-") {
        result = subtract(x, y);
    } else if (operator==="×") {
        result = multiply(x, y);
    } else if (operator==="÷") {
        result = (currentValue==0) ? "haha no" : divide(x, y);
    }
    needsClear = true;
    return Math.round((result + Number.EPSILON) * 100000000) / 100000000;
};

const clearBtn = document.querySelector('.clear');

const clearMem = () => {
    clearDisplay();
    currentValue = undefined;
    prevValue = undefined;
    operator = undefined;
    needsClear = false;
}

clearBtn.addEventListener('click', () => {
    clearMem();
});

const backBtn = document.querySelector('.backspace');

backBtn.addEventListener('click', () => {
    if (!needsClear) {
        theDisplay.textContent = theDisplay.textContent.slice(0, -1);
        currentValue = +(theDisplay.textContent);
    } else {
        clearMem();
    }
    
});