//Реализовать функцию invert на чистом JS, которая будет менять ключи и значения объектов местами:

let a = { a: "some", b: "object", c: 1 };
let b = { some: "a", object: "b", 1: "c" };

const invert = (obj) => {
  if (Object(obj) !== obj) {
    console.log("аргумент не является объектом");
    return;
  }
  const invertOj = {};
  Object.keys(obj).forEach((item) => {
    invertOj[obj[item]] = item;
  });
  return invertOj;
};

console.log(invert(a));
console.log(invert(b));
