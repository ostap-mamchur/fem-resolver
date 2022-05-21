import defaultMatrix from "../helpers/defaultMatrix.js";
import gauss from './gauss.js';

class FEMSolver {
  constructor(a, b, leftBoundary, rightBoundary, n) {
    this.a = a;
    this.b = b;
    this.leftBoundary = leftBoundary;
    this.rightBoundary = rightBoundary;
    this.n = n;
  }

  // elements number
  get m() {
    return this.n - 1;
  }

  // x[i+1] - x[i]
  get h() {
    return (this.b - this.a) / this.m;
  }

  // elements matrix
  get k() {
    return [
      [1 / this.h - this.h / 3, -1 / this.h - this.h / 6],
      [-1 / this.h - this.h / 6, 1 / this.h - this.h / 3],
    ];
  }

  // elements vector
  getElementsVector(number) {
    let f = [];

    if (number === 0) {
      f = [-this.leftBoundary.value - this.h / 2, -this.h / 2];
    } else if (number === this.m - 1) {
      f = [-this.h / 2, this.rightBoundary.value - this.h / 2];
    } else {
      f = [-this.h / 2, -this.h / 2];
    }

    return f;
  }

  // stiffness matrix
  get A() {
    const A = defaultMatrix(this.n, 0);
    for (let i = 0; i < this.m; i++) {
      A[i][i] += this.k[0][0];
      A[i][i + 1] = A[i][i + 1] + this.k[0][1];
      A[i + 1][i] = A[i + 1][i] + this.k[1][0];
      A[i + 1][i + 1] = A[i + 1][i + 1] + this.k[1][1];
    }

    return A;
  }

  // right vector
  get F() {
    const F = Array(this.n).fill(0);

    for (let i = 0; i < this.m; i++) {
      const f = this.getElementsVector(i);
      F[i] += f[0];
      F[i + 1] += f[1];
    }

    return F;
  }

  dirichletCondition(matrix, vector, value, number) {

    matrix[number][number] = 1;
    vector[number] = value;
    for (let i = 0; i < this.n; i++) {
      if (i !== number) {
        matrix[number][i] = 0;
        vector[i] -= matrix[i][number] * value;
        matrix[i][number] = 0;
      }
    }
  }

  solve() {
    const A = this.A;
    const F = this.F;

    if (!this.leftBoundary.isNatural) {
      this.dirichletCondition(A, F, this.leftBoundary.value, 0);
    }

    if (!this.rightBoundary.isNatural) {
      this.dirichletCondition(A, F, this.rightBoundary.value, this.m);
    }

    return gauss(A, F);
  }
}

export default FEMSolver;