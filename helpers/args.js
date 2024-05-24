export const getArgs = (args) => {
  const res = {};
  const [, , ...rest] = args;
  rest.forEach((el, i, a) => {
    if (el.charAt(0) === "-") {
      if (i === a.length - 1) {
        res[el.substring(1)] = true;
      } else if (a[i + 1].charAt(0) !== "-") {
        res[el.substring(1)] = a[i + 1];
      } else {
        res[el.substring(1)] = true;
      }
    }
  });
  return res;
};
