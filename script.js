const add = (x, y) => x+y;
const subtract = (x, y) => x-y;
const multiply = (x, y) => x*y;
const divide = (x, y) => x/y;

const theDisplay = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const plusMinusBtn = document.querySelector('.plusminus');
const equalsBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const backBtn = document.querySelector('.backspace');

let currentValue;
let prevValue;
let operator;
let prevOperator;
let needsClear = false;

const clearDisplay = () => theDisplay.textContent = undefined;

const inputNum = (input) => {
    if (needsClear) {
        clearDisplay();
        needsClear = false;
    };
    if (!(input==="." && theDisplay.textContent.includes("."))) {
        theDisplay.textContent += input;
        currentValue = +(theDisplay.textContent);
    };
};

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        let input = number.textContent;
        inputNum(input);
    });
});

const inputOperator = (input) => {
    prevOperator = operator;
    operator = input;
    if (!(currentValue===undefined || prevValue===undefined)) {
        operate(prevOperator, prevValue, currentValue);
        prevValue = +(theDisplay.textContent);
    } else {
        prevValue = currentValue;
    }
    currentValue = undefined;
    needsClear = true;
};

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        let input = operator.textContent;
        inputOperator(input);
    });
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
        result = (currentValue==0) ? 'haha no' : divide(x, y);
    }
    needsClear = true;
    theDisplay.textContent = Math.round((result + Number.EPSILON) * 100000000) / 100000000;
};

equalsBtn.addEventListener('click', () => {
    operate(operator, prevValue, currentValue);
});

const changeSign = () => {
    currentValue = -1 * +(theDisplay.textContent);
    theDisplay.textContent = currentValue;
};

plusMinusBtn.addEventListener('click', () => {
    changeSign();
});

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

const backspace = () => {
    if (!needsClear) {
        theDisplay.textContent = theDisplay.textContent.slice(0, -1);
        currentValue = +(theDisplay.textContent);
    } else {
        clearMem();
    }
};

backBtn.addEventListener('click', () => {
    backspace();
});

/*Keyboard support - a doozy*/
document.addEventListener('keydown', (keyInput) => {
    const numType = '.0123456789';
    const opsType = '+-*x/';
    let input = keyInput.key.toLowerCase();
    if (numType.includes(input)) {
        inputNum(input);
    } else if (opsType.includes(input)) {
        if (input==='+') {
            inputOperator('+');
        } else if (input==='-') {
            inputOperator('-');
        } else if (input==='*' || input==='x') {
            inputOperator('×');
        } else {
            inputOperator('÷');
        }
    } else if (input==='=' || input==='enter') {
        operate(operator, prevValue, currentValue);
    } else if (input.toLowerCase()==='a' || input==='c' || input=='escape') {
        clearMem();
    } else if (input==='backspace' || input==='b' || input==='d') {
        backspace();
    }
});