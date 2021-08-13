// Дан объект, эмулирующий в самом примитивном виде слой работы с данными:
const database = {
  getUser: (id, callback) => {
    const users = [
      {
        id: 1,
        name: "Robert",
      },
      {
        id: 2,
        name: "John",
      },
    ];

    const user = users.find((user) => user.id === id);
    if (!user) {
      callback(`User with id=${id} not found`);
    } else {
      callback(null, user);
    }
  },
  getUsersBook: (userId, callback) => {
    const usersBooks = {
      1: [],
      2: [1, 2],
    };

    const userBook = usersBooks[userId];
    if (!userBook) {
      callback(`Set of books related to userId=${userId} not found`);
    } else {
      callback(null, userBook);
    }
  },
  buyBook: (id, callback) => {
    const books = [
      {
        id: 1,
        name: "Art of war",
      },
      {
        id: 2,
        name: "Hunger games",
      },
      {
        id: 3,
        name: "1984",
      },
    ];

    const book = books.find((book) => book.id === id);
    if (!book) {
      callback(`Book with id=${id} not found`);
    } else {
      callback(null, true);
    }
  },
};

//Необходимо с помощью Promises (async/await) отрефакторить функцию ниже, чтобы избежать большого
//количества уровней вложенности, а также чтобы повысить читаемость:

// const buyBookForUser = (bookId, userId, callback) => {
//   database.getUser(userId, (err, user) => {
//     if (err) {
//       callback(err);
//     } else {
//       database.getUsersBook(userId, (err, userBooks) => {
//         if (err) {
//           callback(err);
//         } else {
//           if (userBooks.includes(bookId)) {
//             callback(`User already has book with id=${bookId}`);
//           } else {
//             database.buyBook(bookId, (err) => {
//               if (err) {
//                 callback(err);
//               } else {
//                 callback(null, "Success");
//               }
//             });
//           }
//         }
//       });
//     }
//   });
// };

const buyBookForUser = (bookId, userId, callback) => {
  return new Promise((resolve, reject) => {
    database.getUser(userId, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  })
    .then(
      (user) =>
        new Promise((resolve, reject) => {
          database.getUsersBook(user.id, (err, userBooks) => {
            if (err) {
              reject(err);
            } else {
              userBooks.includes(bookId)
                ? reject(`User already has book with id=${bookId}`)
                : resolve(userBooks);
            }
          });
        })
    )
    .then(
      () =>
        new Promise((resolve, reject) => {
          database.buyBook(bookId, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(callback(null, "Success"));
            }
          });
        })
    )
    .catch((err) => callback(err));
};

// Вот код тестов, применимый для текущей реализации:

// buyBookForUser(1, 1, (err, message) => {
//   console.log(err); // null
//   console.log(message); // 'Success'
// });

// buyBookForUser(1, 2, (err, message) => {
//   console.log(err); // 'User already has book with id=1'
//   console.log(message); // undefined
// });

// buyBookForUser(3, 2, (err, message) => {
//   console.log(err); // null
//   console.log(message); // 'Success'
// });

// buyBookForUser(5, 2, (err, message) => {
//   console.log(err); // 'Book with id=5 not found'
//   console.log(message); // undefined
// });

// buyBookForUser(1, 3, (err, message) => {
//   console.log(err); // 'User with id=3 not found'
//   console.log(message); // undefined
// });
