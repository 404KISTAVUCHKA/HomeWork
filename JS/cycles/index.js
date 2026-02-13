// // Задание 1
for (let i = 1; i <= 20; i++) {
  if (i % 4 === 0) {
    continue;
  }
  console.log(i)
}


// // // Задание 2
let factorial = Number(prompt("Введите число для получения факториала", 0));
let b = 1;

for (let i = 1; i <= factorial; i++) {
  b = b * i;
}
alert(b)


// Задание 3  ппц какой-то если честно
for (let i = 0; i < 8; i++) {
  let space = "";
  for (let j = 0; j < 8; j++) {
    space += (i + j) % 2 === 0 ? " #" : " $";
  }
  console.log(space)
}