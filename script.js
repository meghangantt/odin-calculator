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