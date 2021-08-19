const buttons = document.querySelectorAll("button");
const flexBox = document.querySelectorAll(".flex-box");

//flexGrow stuff
const form = document.querySelector("form");
const inputs = document.querySelectorAll('input[type="number"]');
const innerBoxes = document.querySelectorAll(".inner-box");

const changeFlexboxProperty = (btnId, count, flexProperty, whatDiv) => {
  if (whatDiv === "parent") {
    flexBox[count].style[flexProperty] = btnId;
    //
  } else if (whatDiv === "child") {
    //
    for (let i = 0; i < inputs.length; i++) {
      //
      if (inputs[i].value > 99 || inputs[i].value < 1) {
        //console.log(`invalid input[${i}] --> ${inputs[i].value}`);
        inputs[i].value = "";
      }
      innerBoxes[i].style.flexGrow = inputs[i].value;
    }
  } else {
    console.log("we have a problem here...");
  }
};

const doSomething = (btnId, btnClass) => {
  switch (btnClass) {
    case "flex-direction":
      changeFlexboxProperty(btnId, 0, "flexFlow", "parent");
      break;

    case "justify-content":
      changeFlexboxProperty(btnId, 1, "justifyContent", "parent");
      break;

    case "align-items":
      changeFlexboxProperty(btnId, 2, "alignItems", "parent");
      break;

    case "combine-justify":
      changeFlexboxProperty(btnId, 3, "justifyContent", "parent");
      break;

    case "combine-align":
      changeFlexboxProperty(btnId, 3, "alignItems", "parent");
      break;

    case "input-number":
      changeFlexboxProperty(btnId, 4, "flexGrow", "child");
      break;

    default:
      //console.log("this button doesn't have the required class...");
      break;
  }
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    doSomething(btn.id, btn.className);
  });
});

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    doSomething(input.id, input.className);
  });
});
