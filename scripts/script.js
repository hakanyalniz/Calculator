function add(...numberArgs) {
  let result = 0;
  for (let i = 0; i < numberArgs.length; i++) {
    if (numberArgs[i + 1] == undefined) {
      break;
    }
    result = numberArgs[i] + numberArgs[i + 1];
  }
  return result;
}

function subtract(...numberArgs) {
  let result = 0;
  for (let i = 0; i < numberArgs.length; i++) {
    if (numberArgs[i + 1] == undefined) {
      break;
    }
    result = numberArgs[i] - numberArgs[i + 1];
  }

  return result;
}

function multiply(...numberArgs) {
  let result = 0;
  for (let i = 0; i < numberArgs.length; i++) {
    if (numberArgs[i + 1] == undefined) {
      break;
    }
    result = numberArgs[i] * numberArgs[i + 1];
  }

  return result;
}

function divide(...numberArgs) {
  let result = 0;
  for (let i = 0; i < numberArgs.length; i++) {
    if (numberArgs[i + 1] == undefined) {
      break;
    }
    result = numberArgs[i] / numberArgs[i + 1];
  }

  return result;
}

console.log(add(1, 2)); // 3
console.log(add(5, 10)); // 15

console.log(subtract(2, 1)); // 1
console.log(subtract(3, 4)); // -1

console.log(multiply(1, 2)); // 2
console.log(multiply(3, 2)); // 6

console.log(divide(4, 2)); // 2
console.log(divide(2, 4)); // 0.5
