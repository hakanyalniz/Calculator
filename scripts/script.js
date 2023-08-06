function add(numberArgs) {
  let result = 0;
  for (let i = 0; i < numberArgs.length; i++) {
    if (numberArgs[i + 1] == undefined) {
      break;
    }
    result = numberArgs[i] + numberArgs[i + 1];
  }
  return result;
}

function subtract(numberArgs) {
  let result = 0;
  for (let i = 0; i < numberArgs.length; i++) {
    if (numberArgs[i + 1] == undefined) {
      break;
    }
    result = numberArgs[i] - numberArgs[i + 1];
  }

  return result;
}

function multiply(numberArgs) {
  let result = 0;
  for (let i = 0; i < numberArgs.length; i++) {
    if (numberArgs[i + 1] == undefined) {
      break;
    }
    result = numberArgs[i] * numberArgs[i + 1];
  }

  return result;
}

function divide(numberArgs) {
  let result = 0;
  for (let i = 0; i < numberArgs.length; i++) {
    if (numberArgs[i + 1] == undefined) {
      break;
    }
    result = numberArgs[i] / numberArgs[i + 1];
  }

  return result;
}

function operate(...theArgs) {
  for (const element of theArgs) {
    if (element == "+") {
      theArgs.pop();
      return add(theArgs);
    } else if (element == "-") {
      theArgs.pop();
      return subtract(theArgs);
    } else if (element == "*") {
      theArgs.pop();
      return multiply(theArgs);
    } else if (element == "/") {
      theArgs.pop();
      return divide(theArgs);
    }
  }
}

console.log(operate(1, 2, "+")); // 3
console.log(operate(5, 10, "+")); // 15

console.log(operate(2, 1, "-")); // 1
console.log(operate(3, 4, "-")); // -1

console.log(operate(1, 2, "*")); // 2
console.log(operate(3, 2, "*")); // 6

console.log(operate(4, 2, "/")); // 2
console.log(operate(2, 4, "/")); // 0.5
