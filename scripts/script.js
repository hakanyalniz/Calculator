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

function writeDisplay(element) {
  currentDisplay += element.innerHTML;
  displayInput.innerHTML = currentDisplay;
}

// The display input within the p tags that is located within display div
let displayInput = document.getElementById("display-input");
// The current display, things will get written into it before they are written into the screen
let currentDisplay = "";

// References to the buttons and their event listeners

let buttons = document.getElementById("buttons");

buttons.addEventListener("click", function (event) {
  if (event.target.type == "button") {
    writeDisplay(event.target);
  }
});
