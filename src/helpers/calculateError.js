function calculateError(array1, array2) {
  if (array1.length !== array2.length) {
    throw new Error("The arrays lengths are not equal");
  }
  return array1.map((value, index) => Math.abs(value - array2[index]));
}

export default calculateError;