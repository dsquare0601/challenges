var clickCounter = 0,
  defaultSequence = [1, 2, 3, 6, 9, 8, 7, 4],
  roateSeq = {
    1: [4, 1, 2, 7, 3, 8, 9, 6],
    2: [7, 4, 1, 8, 2, 9, 6, 3],
    3: [8, 7, 4, 9, 1, 6, 3, 2],
    4: [9, 8, 7, 6, 4, 3, 2, 1],
    5: [6, 9, 8, 3, 7, 2, 1, 4],
    6: [3, 6, 9, 2, 8, 1, 4, 7],
    7: [2, 3, 6, 1, 9, 4, 7, 8],
    8: [1, 2, 3, 4, 6, 7, 8, 9],
  };
function btn5Click() {
  clickCounter++;
  const container = document.getElementById("btns");
  const defaultAllBtns = Array.from(container.childNodes.values()).filter(
    (ele) => ele.tagName === "BUTTON" && ele.textContent !== "5"
  );
  if (clickCounter >= 9) clickCounter = 1;
  for (let inx in defaultAllBtns) {
    defaultAllBtns[inx].innerHTML = roateSeq[clickCounter][inx];
  }
}
