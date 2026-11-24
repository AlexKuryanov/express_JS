'use strict';

const title = document.getElementsByTagName('h1')[0];

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

const buttonPlus = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const range = document.querySelector('.rollback input[type="range"]');
const rangeValue = document.querySelector('.rollback .range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
  rollback: +range.value,
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: false,
  services: {},
  fullPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isCalculated: false,
  init: function () {
    this.addTitle();
    this.checkScreens();
    startButton.addEventListener('click', this.start);
    buttonPlus.addEventListener('click', this.addScreenBlock);
    document
      .querySelector('.main-controls__views')
      .addEventListener('input', this.checkScreens);
    document
      .querySelector('.main-controls__views')
      .addEventListener('change', this.checkScreens);
    range.addEventListener('input', () => {
      this.rollback = +range.value;
      rangeValue.textContent = `${this.rollback}%`;

      if (this.isCalculated) {
        this.servicePercentPrice = Math.ceil(
          this.fullPrice - this.fullPrice * (this.rollback / 100),
        );
        totalCountRollback.value = this.servicePercentPrice;
      }
    });
  },
  start: function () {
    if (!appData.checkScreens()) {
      return;
    }

    this.screens = [];
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.screenPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;

    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.isCalculated = true;
    appData.showResult();
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  checkScreens: function () {
    screens = document.querySelectorAll('.screen');
    let isValid = screens.length > 0;

    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const count = input.value.trim();

      if (!select.value || !count || !/^\d+$/.test(count) || +count <= 0) {
        isValid = false;
      }
    });

    startButton.disabled = !isValid;
    return isValid;
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.screens.reduce((sum, screen) => {
      return sum + screen.count;
    }, 0);
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        count: +input.value,
        price: +select.value * +input.value,
      });
    });
  },
  addScreenBlock: function () {
    screens = document.querySelectorAll('.screen');
    const cloneScreen = screens[screens.length - 1].cloneNode(true);
    cloneScreen.querySelector('select').selectedIndex = 0;
    cloneScreen.querySelector('input').value = '';
    screens[screens.length - 1].after(cloneScreen);
    appData.checkScreens();
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        (appData.screenPrice * appData.servicesPercent[key]) / 100;
    }
    appData.fullPrice =
      appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;

    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
    );
  },
};

appData.init();
