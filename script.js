let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let rollback = 3;

let adaptive =
  prompt('Нужен ли адаптив на сайте?')?.trim().toLowerCase() === 'да';

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
console.log(servicePrice1);

let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
console.log(servicePrice2);
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
console.log(fullPrice);

let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log(
  `Стоимость верстки экранов ${screenPrice} рублей/ долларов/гривен/юани`,
);

console.log(
  `Стоимость разработки сайта ${fullPrice} рублей/ долларов/гривен/юани`,
);

console.log(screens.toLocaleLowerCase().split(' '));

console.log(
  `Процент отката посреднику за работу ${fullPrice * (rollback / 100)}`,
);

console.log(servicePercentPrice);
console.log(fullPrice);

if (fullPrice > 30000) {
  console.log('Даем скидку в 10%');
} else if (fullPrice > 15000 && fullPrice <= 30000) {
  console.log('Даем скидку в 5%');
} else if (fullPrice > 0 && fullPrice <= 15000) {
  console.log('Скидка не предусмотрена');
} else {
  console.log('Что то пошло не так');
}
