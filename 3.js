//Реализовать функцию checkParentheses на чистом JS, которая проверяет на
//синтаксическую верность последовательность скобок ( (), {} и [] ).
//Функция возвразает false, если переданная строка содержит неправильную последовательность:

// const checkParentheses = (str) => {
//   const open = {
//     "(": ")",
//     "{": "}",
//     "[": "]",
//   };

//   const close = [")", "}", "]"];

//   const stack = [];

//   arrStr = str.split("");
//   for (let i = 0; i < arrStr.length; i++) {
//     if (open.hasOwnProperty(arrStr[i])) {
//       stack.push(open[arrStr[i]]);
//       continue;
//     }
//     if (close.includes(arrStr[i])) {
//       if (arrStr[i] === stack.pop()) {
//         continue;
//       } else {
//         return false;
//       }
//     } else {
//       continue;
//     }
//   }
//   if (stack.length !== 0) {
//     return false;
//   } else {
//     return true;
//   }
// };

const open = {
  "(": ")",
  "{": "}",
  "[": "]",
};

const checkParentheses = ([...str]) => {
  const stack = str.reduce((acc, item) => {
    if (open.hasOwnProperty(item)) {
      acc.push(open[item]);
      return acc;
    }
    if (item === acc[acc.length - 1]) {
      acc.pop();
      return acc;
    }
    return acc;
  }, []);

  if (stack.length !== 0) {
    return false;
  } else {
    return true;
  }
};

console.log(checkParentheses("--()--")); // true
console.log(checkParentheses("-a]--[")); // false
console.log(checkParentheses("dsa{vsfs{ad")); // false
console.log(checkParentheses("j78(g5b]uyg")); // false
console.log(checkParentheses(",m{i987y}hj")); // true
console.log(checkParentheses("dsa[3ed---:]::")); // true
