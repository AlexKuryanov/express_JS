"use strict";

const appData = {
  rollback: 10,
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: false,
  service: [],
  servicePrices: [],
  fullPrice: 0,
  allServicePrices: 0,
  servicePercentPrice: 0,
  servicesPercent: 0,
  askQuestions: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");
    appData.screenPrice = +prompt("Сколько будет стоить данная работа?");
    while (!appData.isNumber(appData.screenPrice)) {
      appData.screenPrice = +prompt("Сколько будет стоить данная работа?");
    }
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  getAllServicePrices: function () {
    for (let i = 0; i < 2; i++) {
      appData.service.push(prompt("Какой дополнительный тип услуги нужен?"));
      do {
        appData.servicePrices.push(+prompt("Сколько это будет стоить?"));
        appData.allServicePrices += appData.servicePrices[appData.servicePrices.length - 1];
      } while (!appData.isNumber(appData.servicePrices[appData.servicePrices.length - 1]));
    }
    return appData.allServicePrices;
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function (value) {
    const normalizedTitle = value.trim().toLowerCase();

    return normalizedTitle.slice(0, 1).toUpperCase() + normalizedTitle.slice(1);
  },
  getServicePercent: function (price, percent) {
    return Math.ceil(price * (percent / 100));
  },
  getServicePercentPrices: function (price) {
    return Math.ceil(price - appData.servicesPercent);
  },
  getRollbackMessage: function (price) {
    if (price > 30000) {
      return "Даем скидку в 10%";
    } else if (price > 15000 && price <= 30000) {
      return "Даем скидку в 5%";
    } else if (price > 0 && price <= 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },
  start: function () {
    appData.askQuestions();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.title = appData.getTitle(appData.title);
    appData.servicesPercent = appData.getServicePercent(appData.fullPrice, appData.rollback);
    appData.servicePercentPrice = appData.getServicePercentPrices(
      appData.fullPrice
    );
    appData.getRollbackMessage(appData.fullPrice);
    appData.logger();
  },
  logger: function () {
    console.log(appData.screens.toLocaleLowerCase().split(" "));
    console.log(appData.fullPrice);
    console.log(appData.getRollbackMessage(appData.fullPrice));
    console.log(appData.servicesPercent);
    console.log(appData.servicePercentPrice);

    for (let key in appData) {
        console.log(key + ": " + appData[key]);
    }
  }
}

appData.start();