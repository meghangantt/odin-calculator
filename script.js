const add = (x, y) => x+y;

const subtract = (x, y) => x-y;

const multiply = (x, y) => x*y;

const divide = (x, y) => x/y;

const operate = (operator, x, y) => {
    let result;
    if (operator==="+") {
        result = add(x, y);
    } else if (operator==="-") {
       result = subtract(x, y);
    } else if (operator==="*") {
        result = multiply(x, y);
    } else if (operator==="/") {
        result =divide(x, y);
    }
    return result;
};

const theDisplay = document.querySelector('.display');

const numbers = document.querySelectorAll('.number');

let lastDigit;
let currentValue;

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        lastDigit = number.textContent;
        theDisplay.textContent += lastDigit;
        currentValue = +(theDisplay.textContent);
    });
});


