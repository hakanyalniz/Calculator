function add(numberArgs) {
  let result = 0;
  // numberArgs = combineNumbers(numberArgs);
  numberArgs = filterOperators(numberArgs);
  numberArgs = turnArrayToNumber(numberArgs);

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
  // numberArgs = combineNumbers(numberArgs);
  numberArgs = filterOperators(numberArgs);
  numberArgs = turnArrayToNumber(numberArgs);

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
  // numberArgs = combineNumbers(numberArgs);
  numberArgs = filterOperators(numberArgs);
  numberArgs = turnArrayToNumber(numberArgs);

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
  // numberArgs = combineNumbers(numberArgs);
  numberArgs = filterOperators(numberArgs);
  numberArgs = turnArrayToNumber(numberArgs);

  for (let i = 0; i < numberArgs.length; i++) {
    if (numberArgs[i + 1] == undefined) {
      break;
    }
    result = numberArgs[i] / numberArgs[i + 1];
  }

  return result;
}

// The above are operator functions

function operate(theArgs) {
  if (theArgs.length == 1) {
    return theArgs[0];
  }

  // Made a mistake here, the return above returns to the operate, which is called from below
  // Therefore I had a mistake wherein the return value was not getting to the place it originally was called from
  // Which ended up giving undefined
  for (const element of theArgs) {
    if (element == "*") {
      return operate(operateGetResult(element, theArgs, multiply));
    } else if (element == "/") {
      return operate(operateGetResult(element, theArgs, divide));
    } else if (element == "+") {
      return operate(operateGetResult(element, theArgs, add));
    } else if (element == "-") {
      return operate(operateGetResult(element, theArgs, subtract));
    }
  }
}

// This used to be in operator function but it was going to repeat so I carried it over here
// Basically if given "5 * 5 + 5" it will return "25 + 5"
// The element below and theArgs are the same as the one in operator
function operateGetResult(element, theArgs, currentOperation) {
  let firstNumber = 0;
  let secondNumber = 0;
  let operator = "";

  let index = 0;
  let finalResult = 0;

  // The first number, second number so on doesn't work when for example: ["5", "5", "+", "5"]
  // Normally it was created for ["5", "+", "5"] in mind
  // So I need to combine them before this
  theArgs = combineNumbers(theArgs);
  index = theArgs.indexOf(element);

  firstNumber = theArgs[index - 1];
  secondNumber = theArgs[index + 1];
  operator = theArgs[index];

  // Element is given here, which contains the multiplication sign, so combineNumbers, which uses that
  // as a seperater, can still function
  finalResult = currentOperation([
    theArgs[index - 1],
    element,
    theArgs[index + 1],
  ]);
  // Remove the numbers and operators that we are done with and have gotten a result from
  removeElementFromArray(theArgs, operator);
  removeElementFromArray(theArgs, firstNumber);
  removeElementFromArray(theArgs, secondNumber);
  // Turn the result, which was integer back to string because the processes assumes that it is string
  theArgs.unshift(finalResult.toString());

  return theArgs;
}

function turnArrayToNumber(theArray) {
  // Converts the array into numbers, but only the ones that can be converted
  // !isNaN checks if the array element can be turned into number of not
  for (let x = 0; x < theArray.length; x++) {
    if (typeof theArray[x] == "string" && !isNaN(theArray[x])) {
      theArray[x] = Number(theArray[x]);
    }
  }

  return theArray;
}

function filterOperators(theArray) {
  const operators = ["+", "-", "*", "/"];

  const result = theArray.filter((item) => !operators.includes(item));
  return result;
}

function combineNumbers(theArray) {
  const operators = ["+", "-", "*", "/"];

  const result = theArray.reduce(
    (accumulator, currentValue) => {
      if (operators.includes(currentValue)) {
        // If the current value is an operator
        accumulator.push(currentValue); // Push it to the accumulator
      } else {
        // If the current value is not an operator
        const last = accumulator.pop(); // Pop the last element from the accumulator
        if (operators.includes(last)) {
          // If the last element is an operator
          accumulator.push(last); // Push it back to the accumulator
          accumulator.push(currentValue); // Push the current value to the accumulator
        } else {
          // If the last element is not an operator
          accumulator.push(last + currentValue); // Concatenate the last element and the current value and push it to the accumulator
        }
      }
      return accumulator; // Return the updated accumulator
    },
    [""] // Set the initial value of the accumulator to an array with an empty string
  );

  return result;
}

// Array pop was used before, but that only removed the last item
// This finds the element and removes it, no matter where it is
function removeElementFromArray(theArray, remove) {
  const index = theArray.indexOf(remove);
  if (index != -1) {
    theArray.splice(index, 1);
  }
}

// displayInput.innerHTML is the display on the HTML
// element.innerHTML is the innerHTML of things such as buttons
function writeDisplay(element) {
  currentDisplay += element.innerHTML;
  displayInput.innerHTML = currentDisplay;
}

function writeResultToDisplay(result) {
  displayInput.innerHTML = result;
}

// The display input within the p tags that is located within display div
let displayInput = document.getElementById("display-input");
// The current display, things will get written into it before they are written into the screen
let currentDisplay = "";
let numbersInMemory = [];

// References to the buttons and their event listeners

let buttons = document.getElementById("buttons");
let equalsButton = document.getElementById("equals");
let clearButton = document.getElementById("clear");
let deleteButton = document.getElementById("delete");

// The clicked button will call writeDisplay to display it on screen and also will store it in memory
// so that we can operate on it
buttons.addEventListener("click", function (event) {
  // Don't add the equal button and clear button to screen and so on
  if (
    event.target.type == "button" &&
    event.target.innerHTML != "=" &&
    event.target.innerHTML != "Clear" &&
    event.target.innerHTML != "Delete"
  ) {
    writeDisplay(event.target);
    numbersInMemory.push(event.target.innerHTML);
  }
});

// Clicking the equal will send the numbers in memory to operate
equalsButton.addEventListener("click", function (event) {
  writeResultToDisplay(operate(numbersInMemory));

  // Clears out the memory and display when the equal sign is pressed.
  numbersInMemory = [];
  currentDisplay = "";
});

clearButton.addEventListener("click", function (event) {
  numbersInMemory = [];
  currentDisplay = "";
  displayInput.innerHTML = "";
});

deleteButton.addEventListener("click", function (event) {
  currentDisplay = currentDisplay.slice(0, -1);
  numbersInMemory.pop();

  writeResultToDisplay(currentDisplay);
});
