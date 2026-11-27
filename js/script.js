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
  // title: '',
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
    startButton.addEventListener('click', this.start.bind(this));
    buttonPlus.addEventListener('click', this.addScreenBlock.bind(this));
    resetButton.addEventListener('click', this.reset.bind(this));
    document
      .querySelector('.main-controls__views')
      .addEventListener('input', this.checkScreens.bind(this));
    document
      .querySelector('.main-controls__views')
      .addEventListener('change', this.checkScreens.bind(this));
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
    this.checkScreens();
    if (!this.checkScreens()) {
      return;
    }

    this.screens = [];
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.screenPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;

    this.addScreens();
    this.addServices();
    this.addPrices();
    this.isCalculated = true;
    this.showResult();
    startButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
  },
  reset: function () {
    console.log('reset');
    console.log(screens);

    this.init.bind(this);

    startButton.style.display = 'inline-block';
    resetButton.style.display = 'none';
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
    total.value = this.screenPrice;
    totalCount.value = this.screens.reduce((sum, screen) => {
      return sum + screen.count;
    }, 0);
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
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
    this.checkScreens();
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        (this.screenPrice * this.servicesPercent[key]) / 100;
    }
    this.fullPrice =
      this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100),
    );
  },
};

appData.init();
