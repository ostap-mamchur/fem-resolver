function gauss(A, b) {

  // Just make a single matrix
  for (let i = 0; i < A.length; i++) {
    A[i].push(b[i]);
  }
  const n = A.length;

  for (let i = 0; i < n; i++) {
    // Search for maximum in this column
    let maxEl = Math.abs(A[i][i]),
      maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(A[k][i]) > maxEl) {
        maxEl = Math.abs(A[k][i]);
        maxRow = k;
      }
    }

    // Swap maximum row with current row (column by column)
    for (let k = i; k < n + 1; k++) {
      const tmp = A[maxRow][k];
      A[maxRow][k] = A[i][k];
      A[i][k] = tmp;
    }

    // Make all rows below this one 0 in current column
    for (let k = i + 1; k < n; k++) {
      const c = -A[k][i] / A[i][i];
      for (let j = i; j < n + 1; j++) {
        if (i === j) {
          A[k][j] = 0;
        } else {
          A[k][j] += c * A[i][j];
        }
      }
    }
  }

  const x = Array(n).fill(0);
  for (let i = n - 1; i > -1; i--) {
    x[i] = A[i][n] / A[i][i];
    for (let k = i - 1; k > -1; k--) {
      A[k][n] -= A[k][i] * x[i];
    }
  }

  return x;
}

export default gauss;
