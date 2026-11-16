"use strict";

const gameBot = function () {
  const x = Math.floor(Math.random() * 100) + 1;

  return function guessTheNumber() {
    const question = prompt("Введите число от 1 до 100");
    if (+question === x) {
      return alert("Поздравляю, Вы угадали!!!");
    } else if (question === null) {
      return alert("Игра окончена");
    } else if (isNaN(question)) {
      alert("Пожалуйста, введите число");
    } else if (+question > 100 || +question < 1) {
      alert("Пожалуйста, введите число от 1 до 100");
    } else if (+question > x) {
      alert("Загаданное число меньше, попробуйте еще раз");
    } else if (+question < x) {
      alert("Загаданное число больше, попробуйте еще раз");
    }
    guessTheNumber()
  };
};

const initGameBot = gameBot();
console.log(initGameBot());
