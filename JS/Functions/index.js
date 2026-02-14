// Задание 1
let basePrice = parseFloat(prompt("Введите базовую стоимость товара"));
let discount = parseFloat(prompt("Введите процент скидки"));
let tax = parseFloat(prompt("Введите размер налога"));

function calculateFinalPrice(basePrice, discount, tax) {
  const priceAfterDiscount = basePrice * (1 - discount / 100);
  const finalPrice = priceAfterDiscount * (1 + tax);
  return finalPrice
}
console.log(calculateFinalPrice(basePrice, discount, tax))

// Задание 2

let username = prompt("Введите ваше имя");
let password = prompt("Введите ваш пароль");

function checkAccess(username, password) {
  if (username === "admin" && password === "123456") {
    return "Доступ разрешен";
  } else {
    return "Доступ запрещен";
  }
}
alert(checkAccess(username, password))

// Задание 3

let hour = Number(prompt("Который у вас час?"));

function getTimeOfDay(hour) {
  return  (hour >= 0 && hour <= 5) ? "Ночь" :
          (hour >= 6 && hour <= 11) ? "Утро" : 
          (hour >= 12 && hour <= 17) ? "День" : 
          (hour >= 18 && hour <= 23) ? "Вечер" : 
          "Некорректное время";
}

console.log("У вас сейчас:",getTimeOfDay(hour));

// Задание 4

function findFirstEven (start, end) {
  for (let i = start; i <=end; i++) {
    if (i % 2 === 0) {
      return i;
    }
  }
  return "Четных чисел нет";
}

console.log(findFirstEven(39, 39))