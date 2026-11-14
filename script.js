'use strict';

let rollback = 3;
let title;
let screens;
let screenPrice;
let adaptive;
let service;
let servicePrice;
let fullPrice;
let allServicePrices;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const askQuestions = function () {
  title = prompt('Как называется ваш проект?', 'Калькулятор');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые');
  screenPrice = +prompt('Сколько будет стоить данная работа?');
  while (!isNumber(screenPrice)) {
    screenPrice = +prompt('Сколько будет стоить данная работа?');
  }
  adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    service = prompt('Какой дополнительный тип услуги нужен?');
    do {
      servicePrice = +prompt('Сколько это будет стоить?');
    } while (!isNumber(servicePrice));
    sum += servicePrice;
  }
  return sum;
};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

function getTitle(value) {
  const normalizedTitle = value.trim().toLowerCase();

  return normalizedTitle.slice(0, 1).toUpperCase() + normalizedTitle.slice(1);
}

function getServicePercentPrices(price, percent) {
  return Math.ceil(price - price * (percent / 100));
}

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

function showTypeOf(value) {
  console.log(value, typeof value);
}

askQuestions();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
title = getTitle(title);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLocaleLowerCase().split(' '));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback));
