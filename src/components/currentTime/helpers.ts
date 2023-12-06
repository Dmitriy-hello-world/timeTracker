export const getZero = (n: number) => {
  if (n < 10) {
    return `0${n}`;
  } else {
    return n;
  }
};
