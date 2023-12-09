export const getZero = (n: number) => {
  if (n < 10) {
    return `0${n}`;
  } else {
    return n;
  }
};

export const saveTimesToLocalStor = (seconds: number) => {
  window.localStorage.setItem("autoSavedTime", `${seconds}`);
};

export const resetTimesInLocalStor = () => {
  window.localStorage.setItem("autoSavedTime", `0`);
};

export const getTimesFromLocalStor = () => {
  return +(window.localStorage.getItem("autoSavedTime") || "0");
};
