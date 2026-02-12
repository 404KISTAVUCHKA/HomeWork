// Задание 1
let num = prompt("Введите число");

if (num % 2 === 0) {
  console.log("Число четное");
}
else {
  console.log("Число нечетное");
}

// Задание 2
let age = prompt("Введите ваш возраст");

const discount = age < 18 ? 10 : (age >= 18 && age <= 65 ? 20 : (age > 65 ? 30 : 0));


// Дополнительное задание 
switch (true) {
// Фокус с true подглядел в инете т.к. не мог разобраться почему не подходит age но позже уяснил зачем так делают
  case age < 18:
    discount = 10;
    break;
  case age >= 18 && age <= 65:
    discount = 20;
    break;
  case age > 65:
    discount = 30;
    break;
}

console.log(`Скидка = ${discount}% `);

// Задание 3
let username = prompt("Ваш логин");
let password = prompt("Ваш пароль");

if ((username === "user" || username === "admin") && password === "123456") {
  alert("Доступ разрешен");
} else {
  alert("Доступ запрещен");
}

// Задание 4
let weight = prompt("Вес вашей посылки?");

if (weight <= 0) {
  alert("Некорректный вес посылки");
}

let type = prompt("Какой тип доставки?");

if (type !== "Стандарт" && type !== "Экспресс" && type !== "Премиум") {
  alert("Неверный тип доставки");
}

let baseCost;

if (weight < 1) {
  baseCost = 5;
} else if (weight >= 1 && weight <= 5) {
  baseCost = 10;
} else {
  baseCost = 15;
}

let coeff;

switch (type) {
  case "Стандарт":
    coeff = 1;
    break;
  case "Экспресс":
    coeff = 1.5;
    break;
  case "Премиум":
    coeff = 2;
    break;
}

let cost = baseCost * coeff;
alert(`Итоговая стоимость доставки: ${cost}$`)
