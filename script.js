'use strict';

const appData = {
  rollback: 10,
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: false,
  services: {},
  fullPrice: 0,
  allServicePrices: 0,
  servicePercentPrice: 0,
  servicesPercent: 0,
  askQuestions: function () {
    do {
      appData.title = prompt('Как называется ваш проект?');
      if (appData.title === null) {
        let exit = confirm('Хотите выйти?');
        if (exit) {
          alert('До свидания! Приходите снова');
        } else {
          continue;
        }
        return false;
      }
    } while (
      typeof appData.title !== 'string' ||
      appData.isNumber(appData.title.trim()) ||
      appData.title.trim().length === 0
    );

    for (let i = 0; i < 2; i++) {
      let name = '';
      do {
        name = prompt('Какие типы экранов нужно разработать?');
      } while (
        typeof name !== 'string' ||
        appData.isNumber(name.trim()) ||
        name.trim().length === 0
      );

      let price = 0;
      do {
        price = +prompt('Сколько будет стоить данная работа?');
      } while (!appData.isNumber(price));
      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name = '';
      do {
        name = prompt('Какой дополнительный тип услуги нужен?');
      } while (
        typeof name !== 'string' ||
        appData.isNumber(name.trim()) ||
        name.trim().length === 0
      );

      let price = 0;
      do {
        price = prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(price));
      appData.services[`${name}_${i}`] = +price;
    }

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },
  getPrices: function () {
    // for (let screen of appData.screens) {
    //   appData.screenPrice += +screen.price;
    // }
    appData.screens.reduce(function (sum, screen) {
      sum += screen['price'];
      return sum;
    }, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function (value) {
    if (value) {
      const normalizedTitle = value.trim().toLowerCase();

      appData.title =
        normalizedTitle.slice(0, 1).toUpperCase() + normalizedTitle.slice(1);
    }
  },
  getServicePercent: function (price, percent) {
    appData.servicesPercent = Math.ceil(price * (percent / 100));
  },
  getServicePercentPrices: function (price) {
    appData.servicePercentPrice = Math.ceil(price - appData.servicesPercent);
  },
  getRollbackMessage: function (price) {
    if (price > 30000) {
      return 'Даем скидку в 10%';
    } else if (price > 15000 && price <= 30000) {
      return 'Даем скидку в 5%';
    } else if (price > 0 && price <= 15000) {
      return 'Скидка не предусмотрена';
    } else {
      return 'Что то пошло не так';
    }
  },
  start: function () {
    appData.askQuestions();
    if (appData.askQuestions) {
      appData.getPrices();
      appData.getFullPrice();
      appData.getTitle(appData.title);
      appData.getServicePercent(appData.fullPrice, appData.rollback);
      appData.getServicePercentPrices(appData.fullPrice);
      appData.getRollbackMessage(appData.fullPrice);
      appData.logger();
    }
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.getRollbackMessage(appData.fullPrice));
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);

    // for (let key in appData) {
    //     console.log(key + ": " + appData[key]);
    // }
  },
};

appData.start();
