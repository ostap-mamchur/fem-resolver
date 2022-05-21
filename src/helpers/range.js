function range(a, n, h) {
  const result = [];

  for (let i = 0; i < n; i++) {
    result.push(a + i * h);
  }

  return result;
}

export default range;
