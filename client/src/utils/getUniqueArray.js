const getUniqueArray = (a) => a.reduce((unique, item) => (unique.includes(item) ? unique : [...unique, item]), []);

export default getUniqueArray;
