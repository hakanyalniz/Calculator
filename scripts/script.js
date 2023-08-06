function add(numberArgs) {
  let result = 0;
  numberArgs = combineNumbers(numberArgs);
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
  numberArgs = combineNumbers(numberArgs);
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
  numberArgs = combineNumbers(numberArgs);
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
  numberArgs = combineNumbers(numberArgs);
  numberArgs = turnArrayToNumber(numberArgs);

  for (let i = 0; i < numberArgs.length; i++) {
    if (numberArgs[i + 1] == undefined) {
      break;
    }
    result = numberArgs[i] / numberArgs[i + 1];
  }

  return result;
}

function operate(theArgs) {
  // Checks which operation to do then calls the proper operator functions with the whole array
  // Also removes operator sign from the array
  for (const element of theArgs) {
    if (element == "+") {
      //   removeElementFromArray(theArgs, "+");

      return add(theArgs);
    } else if (element == "-") {
      //   removeElementFromArray(theArgs, "-");

      return subtract(theArgs);
    } else if (element == "*") {
      //   removeElementFromArray(theArgs, "*");

      return multiply(theArgs);
    } else if (element == "/") {
      //   removeElementFromArray(theArgs, "/");

      return divide(theArgs);
    }
  }
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

function combineNumbers(theArray) {
  let combined = "";
  let newArray;
  // Combines all the array elements into combined
  for (let x = 0; x < theArray.length; x++) {
    combined += theArray[x];
  }
  // Turns combined into an array, split only one parts which can't be numbers
  // which happened to be operators
  // This would mean that each right and left part of the operators will be combined
  for (const element of theArray) {
    if (isNaN(element)) {
      newArray = combined.split(element);
    }
  }

  return newArray;
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

// The clicked button will call writeDisplay to display it on screen and also will store it in memory
// so that we can operate on it
buttons.addEventListener("click", function (event) {
  if (
    event.target.type == "button" &&
    event.target.innerHTML != "=" &&
    event.target.innerHTML != "Clear"
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
