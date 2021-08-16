const flexBox = document.querySelector(".flex-box");

const btnRow = document.querySelector("#row");
const btnRowReverse = document.querySelector("#row-reverse");
const btnColumn = document.querySelector("#column");
const btnColumnReverse = document.querySelector("#column-reverse");

btnRow.addEventListener("click", () => {
  flexBox.style.flexFlow = "row";
});

btnRowReverse.addEventListener("click", () => {
  flexBox.style.flexFlow = "row-reverse";
});

btnColumn.addEventListener("click", () => {
  flexBox.style.flexFlow = "column";
});

btnColumnReverse.addEventListener("click", () => {
  flexBox.style.flexFlow = "column-reverse";
});
