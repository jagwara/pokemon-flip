export const arrayToStringCOnversion = (array: Array< number>) => {
  const result = array.reduce((acc, curr) => acc + curr.toString(), '');
  return result
}