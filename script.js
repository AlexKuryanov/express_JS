'use strict';

const body = document.querySelector('body');
const booksList = document.querySelector('.books');
const books = document.querySelectorAll('.book');
const fixedTitle = books[4].querySelector('a');
const adv = document.querySelector('.adv');

// 1. Восстановить порядок книг.
books[0].before(books[1]);
books[5].after(books[2]);
books[0].after(books[4]);

// 2. Заменить картинку заднего фона на другую из папки image
body.style.backgroundImage = `url('image/you-dont-know-js.jpg')`;

// 3. Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
fixedTitle.textContent = 'Книга 3. this и Прототипы Объектов';

// 4. Удалить рекламу со страницы
adv.remove();

// 5. Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
const book2 = document.querySelectorAll('.book')[1];
const book2List = book2.querySelector('ul');
const book2Elements = book2List.querySelectorAll('li');

const book5 = document.querySelectorAll('.book')[4];
const book5List = book5.querySelector('ul');
const book5Elements = book5List.querySelectorAll('li');

book2Elements[10].before(book2Elements[2]);
book2Elements[9].before(book2Elements[7]);
book2Elements[4].before(book2Elements[8]);
book2Elements[8].before(book2Elements[6]);

book5Elements[1].after(book5Elements[9]);
book5Elements[4].after(book5Elements[2]);
book5Elements[8].before(book5Elements[5]);

// 6. в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const book6 = document.querySelectorAll('.book')[5];
const book6List = book6.querySelector('ul');
const book6Elements = book6List.querySelectorAll('li');
const listElem = document.createElement('li');
listElem.textContent = 'Глава 8: За пределами ES6';

book6Elements[8].after(listElem);

console.log(book6);
