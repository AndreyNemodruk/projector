//Реализовать функцию groupBy на чистом JS, которая будет группировать массив по определённой функции,
//переданной вторым аргументом:

const a = [3.6, 3.7, 6.4, 8.9, 9.1, 9.2, 9.7, 9.5];

const groupBy = (array, func) => {
  const groupArray = array.reduce((acc, item) => {
    let key = String(func(item));
    if (acc.hasOwnProperty(key)) {
      acc[key].push(item);
      return acc;
    }
    acc[key] = [item];
    return acc;
  }, {});
  return groupArray;
};

console.log(groupBy(a, Math.floor));
