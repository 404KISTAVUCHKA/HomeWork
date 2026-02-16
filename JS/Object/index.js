// // Задание 1
const person = {
  firstName: "Anton",
  lastName: "Ivashcenko",
  age: 17,
  employment: "student",
  address: "50.86565959355798 156.66536294524926",
  gender: "male",
  greet() {
    console.log(`Привет, я ${this.firstName}`);
  },
};
console.log(person);

// // Задание 2

function isEmpty(object) {
  for (let key in object) {
    return false;
  }
  return true;
}
console.log(isEmpty(person));

// // Задание 3

const task = {
  title: "Название задачи",
  description: "Описание задачи",
  isCompleted: true,
};

const modifications = {
  deadline: "16.02.2026",
  leader: "Igor",
  team: 20,
};

function cloneAndModify(object, modifications) {
  return { ...task, ...modifications };
}
const genObject = cloneAndModify(task, modifications);

for (let key in genObject) {
  console.log(`${key}: ${genObject[key]}`);
}

// Задание 4

function callAllMethods(object) {
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === "function") {
      object[key]();
    }
  });
}

callAllMethods(person);
