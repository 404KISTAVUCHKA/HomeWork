// Задание 1

const users = [
  {
    name: "Alex",
    age: 24,
    isAdmin: false,
  },
  {
    name: "Bob",
    age: 13,
    isAdmin: false,
  },
  {
    name: "John",
    age: 31,
    isAdmin: true,
  },
  {
    name: "Jane",
    age: 20,
    isAdmin: false,
  },
];

const addUsers = users.push(
  {
    name: "Ann",
    age: 19,
    isAdmin: false,
  },
  {
    name: "Jack",
    age: 43,
    isAdmin: true,
  },
);

console.log(users);

// Задание 2

function getUserAverageAge() {
  let sum = 0;
  users.forEach((users) => {
    sum += users.age;
  });
  return sum / users.length;
}

console.log(`Средний возраст: ${getUserAverageAge()}`);

// // Задание 3

function getAllAdmins(users) {
  const admins = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].isAdmin === true) {
      admins.push(users[i]);
    }
  }
  return admins;
}

console.log(getAllAdmins(users));

// Задание 4

function first(arr, n) {
  if (n === undefined) {
    return arr[0];
  }
  if (n === 0) {
    return [];
  }

  let limit;
  if (n > arr.length) {
    limit = arr.length;
  } else {
    limit = n;
  }

  const result = [];
  for (let i = 0; i < limit; i++) {
    result.push(arr[i]);
  }
  return result;
}
console.log(first(users, 5))