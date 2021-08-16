const buttons = document.querySelectorAll("button");
const flexBox = document.querySelectorAll(".flex-box");

const changeFlexboxProperty = (btnId, count, flexProperty) => {
  flexBox[count].style[flexProperty] = btnId;
};

const doSomething = (btnId, btnClass) => {
  switch (btnClass) {
    case "flex-direction":
      changeFlexboxProperty(btnId, 0, "flexFlow");
      break;

    case "justify-content":
      changeFlexboxProperty(btnId, 1, "justifyContent");
      break;

    case "align-items":
      changeFlexboxProperty(btnId, 2, "alignItems");
      break;

    default:
      alert("this button doesn't have a class...");
      break;
  }
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    doSomething(btn.id, btn.className);
  });
});
