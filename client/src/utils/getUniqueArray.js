/* eslint-disable no-return-assign */
/* eslint-disable no-prototype-builtins */
const getUniqueArray = (a) => {
  const seen = {};
  return a.filter((item) => (seen.hasOwnProperty(item._id) ? false : (seen[item] = true)));
};

export default getUniqueArray;
