/* eslint-disable */
const getUniqueArray = (array) =>
  Array.from(new Set(array.map((a) => a._id))).map((id) => array.find((a) => a._id === id));

export default getUniqueArray;
