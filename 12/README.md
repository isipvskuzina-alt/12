1. БЛОЧНЫЕ И СТРОЧНЫЕ ЭЛЕМЕНТЫ
📌 Блочные элементы (block)
css
display: block;
Характеристики:

✅ Занимают всю ширину родителя

✅ Всегда с новой строки

✅ Можно задавать width, height, margin, padding

Примеры:

html
<div>Блочный</div>
<p>Параграф</p>
<h1>Заголовок</h1>
<ul><li>Список</li></ul>
<section>Секция</section>
<article>Статья</article>
<header>Шапка</header>
<footer>Подвал</footer>
<nav>Навигация</nav>
<main>Основное</main>
<form>Форма</form>
<table>Таблица</table>
Применение:

Структура страницы

Контейнеры и секции

Заголовки

Списки

Формы

📌 Строчные элементы (inline)
css
display: inline;
Характеристики:

✅ Занимают только нужную ширину

✅ Не переносятся на новую строку

❌ Нельзя задавать width, height

❌ margin-top/bottom не работают

Примеры:

html
<span>Строчный</span>
<a href="#">Ссылка</a>
<strong>Жирный</strong>
<em>Курсив</em>
<img src="image.jpg">
<label>Метка</label>
<button>Кнопка</button>
<input type="text">
<select>
<textarea>
<small>Маленький</small>
<b>Жирный</b>
<i>Курсив</i>
Применение:

Текст внутри абзацев

Ссылки

Выделение текста

Мелкие элементы управления

📌 Строчно-блочные (inline-block)
css
display: inline-block;
Характеристики:

✅ Как строчный (не переносится)

✅ Можно задавать размеры (как блочный)

Примеры:

html
<img>        <!-- по умолчанию -->
<button>     <!-- по умолчанию -->
<input>      <!-- по умолчанию -->
<select>     <!-- по умолчанию -->
<textarea>   <!-- по умолчанию -->
📌 Сравнительная таблица
Характеристика	block	inline	inline-block
Новая строка	✅ Да	❌ Нет	❌ Нет
Ширина	Вся доступная	По содержимому	По содержимому
width/height	✅ Можно	❌ Нельзя	✅ Можно
margin-top/bottom	✅ Работает	❌ Не работает	✅ Работает
padding	✅ Работает	✅ Работает	✅ Работает
📌 Пример в проекте
css
/* Блочные */
.app { display: block; }
.wish-card { display: block; }

/* Строчные */
span { display: inline; }
a { display: inline; }

/* Строчно-блочные */
button { display: inline-block; }
input { display: inline-block; }

2. ПЕРЕМЕННЫЕ: var, let, const
📌 var (старый, НЕ ИСПОЛЬЗУЙТЕ!)
javascript
// ❌ Проблемы:
// 1. Функциональная область (не блочная)
if (true) {
    var x = 10;
}
console.log(x); // 10 - доступно вне блока!

// 2. Всплытие (hoisting)
console.log(y); // undefined (не ошибка!)
var y = 5;

// 3. Можно переопределять
var name = 'Иван';
var name = 'Петр'; // ✅ Можно
📌 let (современная, для изменяемых)
javascript
// ✅ Особенности:
// 1. Блочная область {}
if (true) {
    let x = 10;
}
console.log(x); // ❌ Ошибка

// 2. Нет всплытия
console.log(y); // ❌ Ошибка
let y = 5;

// 3. Можно изменять, но нельзя переопределять
let name = 'Иван';
name = 'Петр'; // ✅ Можно
// let name = 'Петр'; // ❌ Ошибка
📌 const (современная, для неизменяемых)
javascript
// ✅ Особенности:
// 1. Блочная область {}
if (true) {
    const x = 10;
}
console.log(x); // ❌ Ошибка

// 2. Нет всплытия
console.log(y); // ❌ Ошибка
const y = 5;

// 3. Нельзя изменять значение
const name = 'Иван';
// name = 'Петр'; // ❌ Ошибка

// 4. НО можно менять свойства объекта
const user = { name: 'Иван' };
user.name = 'Петр'; // ✅ Можно

const arr = [1, 2, 3];
arr.push(4); // ✅ Можно
📌 Сравнительная таблица
Характеристика	var	let	const
Область видимости	Функциональная	Блочная {}	Блочная {}
Всплытие (hoisting)	✅ Да	❌ Нет	❌ Нет
Можно переопределять	✅ Да	❌ Нет	❌ Нет
Можно изменять значение	✅ Да	✅ Да	❌ Нет
Рекомендуется	❌ НЕТ	✅ ДА	✅ ДА
📌 Когда использовать
javascript
// ✅ const - ВСЕГДА по умолчанию
const name = 'Иван';
const user = { id: 1 };
const numbers = [1, 2, 3];
const API_URL = 'https://api.example.com';

// ✅ let - если нужно изменять значение
let count = 0;
let isActive = false;
let currentIndex = 0;

// ❌ var - НИКОГДА не используйте!
// var x = 10; // Плохо!
📌 Пример в проекте
javascript
// const - неизменяемые ссылки
const wishlist = [];
const wishesContainer = document.getElementById('wishesContainer');

// let - изменяемые значения
let editingId = null;
let dragIndex = null;

// Никогда не используем var
// var oldVar = 'плохо'; ❌
🎯 Шпаргалка
Блочные vs Строчные
block	inline
Новая строка	✅ Да	❌ Нет
Ширина	Вся	По содержимому
width/height	✅ Да	❌ Нет
margin-top	✅ Да	❌ Нет
Примеры	div, p, h1	span, a, strong
var vs let vs const
var	let	const
Область	Функция	Блок {}	Блок {}
Всплытие	✅ Да	❌ Нет	❌ Нет
Изменение	✅ Да	✅ Да	❌ Нет
Использовать	❌ Нет	✅ Да	✅ Да
Правило жизни
javascript
// ✅ Всегда используйте const
const name = 'Иван';

// ✅ Используйте let, если нужно менять
let count = 0;
count++;

// ❌ Никогда не используйте var
var old = 'плохо';
