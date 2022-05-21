import FEMSolver from "./methods/FEMSolver.js";
import range from "./helpers/range.js";
import renderPlot from "./views/renderPlot.js";

// y'' + y = 1; y(0) = 1, y(1) = 0

function approximatedFunction(xx, yy, x, h) {
  let result = 0;
  for (let i = 0; i < xx.length; i++) {
    result += yy[i] * basisFunc(xx, x, i, h, xx.length - 1);
  }
  return result;
}

function basisFunc(xx, x, i, h, m) {
  if (i === 0) {
    if (x >= xx[0] && x <= xx[1]) {
      return (xx[1] - x) / h;
    } else {
      return 0;
    }
  } else if (i === m) {
    if (x >= xx[m - 1] && x <= xx[m]) {
      return (x - xx[m - 1]) / h;
    } else {
      return 0;
    }
  } else {
    if (x >= xx[i - 1] && x <= xx[i]) {
      return (x - xx[i - 1]) / h;
    } else if (x >= xx[i] && x <= xx[i + 1]) {
      return (xx[i + 1] - x) / h;
    } else {
      return 0;
    }
  }
}

function exactFunction(x) {
  return 1 - Math.sin(x) / Math.sin(1);
}

document.querySelector("#form").addEventListener("submit", (event) => {
  event.preventDefault();

  const c = +document.querySelector("#a").value;
  const d = +document.querySelector("#b").value;
  const n = +document.querySelector("#n").value;

  const m = n - 1;

  const isLeftBoundaryNatural = false;
  const leftBoundary = +document.querySelector("#leftBoundary").value;
  const isRightBoundaryNatural = false;
  const rightBoundary = +document.querySelector("#rightBoundary").value;

  const h = (d - c) / m;

  const xx = range(c, n, h);

  const yy = new FEMSolver(
    c,
    d,
    { value: leftBoundary, isNatural: isLeftBoundaryNatural },
    { value: rightBoundary, isNatural: isRightBoundaryNatural },
    n
  ).solve();

  renderPlot(
    document.querySelector("#plot"),
    [
      {
        x: xx,
        y: yy,
        mode: "lines+markers",
        name: "МКЕ",
      },
      {
        x: xx,
        y: xx.map((x) => exactFunction(x)),
        mode: "lines",
        name: "Точна функція",
      },
    ],
    {
      title: "Метод скінченних елементів",
    }
  );
});
