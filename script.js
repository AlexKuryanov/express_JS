'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let rollback = 3;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

const getRollbackMessage = function (price) {
  if (price > 30000) {
    return 'Даем скидку в 10%';
  } else if (price > 15000 && price <= 30000) {
    return 'Даем скидку в 5%';
  } else if (price > 0 && price <= 15000) {
    return 'Скидка не предусмотрена';
  } else {
    return 'Что то пошло не так';
  }
};

const getAllServicePrices = function () {
  return servicePrice1 + servicePrice2;
};
const allServicePrices = getAllServicePrices();

function getFullPrice() {
  return screenPrice + getAllServicePrices();
}
fullPrice = getFullPrice();

function getTitle(value) {
  const normalizedTitle = value.trim().toLowerCase();

  return normalizedTitle.slice(0, 1).toUpperCase() + normalizedTitle.slice(1);
}

function getServicePercentPrices(price, percent) {
  return Math.ceil(price - price * (percent / 100));
}

function showTypeOf(value) {
  console.log(value, typeof value);
}

getTitle(title);
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLocaleLowerCase().split(' '));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback));
