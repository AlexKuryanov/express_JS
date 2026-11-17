"use strict";

const gameBot = function () {
  const x = Math.floor(Math.random() * 100) + 1;
  let attempts = 10;

  return function guessTheNumber() {
    if (attempts === 0) {
      const playAgain = confirm("Попытки закончились, хотите сыграть еще?");
      if (playAgain) {
        attempts = 10;
        return initGameBot();
      } else {
        return alert("Игра окончена");
      }
    }

    const question = prompt("Введите число от 1 до 100");
    if (+question === x) {
      const playAgain = confirm("Поздравляю, Вы угадали!!! Хотели бы сыграть еще?");
      if (playAgain) {
        attempts = 10;
        return initGameBot();
      } else {
        return alert("Игра окончена");
      }
    } else if (question === null) {
      return alert("Игра окончена");
    } else if (isNaN(question)) {
      alert("Пожалуйста, введите число");
    } else if (+question > 100 || +question < 1) {
      alert("Пожалуйста, введите число от 1 до 100");
    } else if (+question > x) {
      attempts--;
      alert("Загаданное число меньше, осталось попыток ..." + attempts);
    } else if (+question < x) {
      attempts--;
      alert("Загаданное число больше, осталось попыток ..." + attempts);
    }
    return guessTheNumber();
  };
};

const initGameBot = gameBot();
console.log(initGameBot());
