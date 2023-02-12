const operators = ["+", "-", "*", "/"];

function btnAppend(e) {
  e.preventDefault();
  let res = document.getElementById("res");
  if (
    operators.includes(res.innerHTML.charAt(res.innerHTML.length - 1)) &&
    operators.includes(e.target.innerHTML)
  )
    return;
  res.innerHTML += e.target.innerHTML;
}

function btnClear() {
  document.getElementById("res").innerHTML = "";
}

function btnEqual() {
  let resEle = document.getElementById("res"),
    expression = res.innerHTML,
    answer = "";
  let exp = expression.split(/[-+*/]+/);
  if (Array.isArray(exp) && exp.length && !expression.includes("/")) {
    let tempArray = [],
      tempStr = "";
    for (let ele of exp) {
      ele = ele.trim();
      tempArray.push(ele);
      tempStr = tempArray.join("");
      let operator = expression.charAt(tempStr.length);
      if (operator !== "") tempArray.push(operator);
    }
    tempArray = tempArray.map((ele) =>
      operators.includes(ele) ? ele : parseInt(ele, 2)
    );
    answer = eval(tempArray.join(""));
    answer = answer < 0 ? 0 : answer.toString(2);
  } else if (expression.includes("/")) {
    answer = Math.floor(eval(expression.trim()));
  }
  resEle.innerHTML = answer;
}

// Optimised Code Below
/**
const operators = new Set(["+", "-", "*", "/"]);
const resEle = document.getElementById("res");

function btnAppend(e) {
  e.preventDefault();
  const lastChar = resEle.textContent.slice(-1);
  const btnChar = e.target.textContent;
  if (operators.has(lastChar) && operators.has(btnChar)) {
    return;
  }
  resEle.textContent += btnChar;
}

function btnClear() {
  resEle.textContent = "";
}

function btnEqual() {
  const expression = resEle.textContent.trim();
  if (!expression) {
    return;
  }
  if (!/\d/.test(expression)) {
    resEle.textContent = "Error";
    return;
  }
  let answer = "";
  try {
    answer = eval(expression.replace(/([01]+b)/g, "0b$1"));
    if (answer < 0) {
      answer = 0;
    }
    if (Number.isInteger(answer)) {
      resEle.textContent = answer.toString(2);
    } else {
      resEle.textContent = answertoFixed(0);
    }
  } catch (err) {
    resEle.textContent = "Error";
  }
}
*/
