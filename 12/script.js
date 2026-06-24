// ========================================
// ПЕРЕМЕННЫЕ В JAVASCRIPT
// ========================================

/*
   var - старая (не рекомендуется)
   - Область видимости: функциональная
   - Можно переопределять
   - Всплывает (hoisting)
   
   let - современная (для изменяемых)
   - Область видимости: блочная {}
   - Можно переопределять
   - Нет всплытия
   
   const - современная (для неизменяемых)
   - Область видимости: блочная {}
   - Нельзя переопределять
   - Нет всплытия
   - НЕЛЬЗЯ менять значение, НО можно менять свойства объекта
*/

// ========================================
// 1. ДАННЫЕ (используем let, const)
// ========================================

// const - НЕ изменяется (массив, но можно менять содержимое)
const wishlist = [];

// let - может изменяться (ID редактирования)
let editingId = null;

// const - DOM элементы (не меняются)
const wishesContainer = document.getElementById('wishesContainer');
const wishForm = document.getElementById('wishForm');
const showFormBtn = document.getElementById('showFormBtn');
const saveWishBtn = document.getElementById('saveWishBtn');
const cancelBtn = document.getElementById('cancelBtn');

const wishTitle = document.getElementById('wishTitle');
const wishCategory = document.getElementById('wishCategory');
const wishImage = document.getElementById('wishImage');

// ========================================
// 2. LOCALSTORAGE
// ========================================

// const - функции (не меняются)
const loadWishes = function() {
    try {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
            // const - локальная переменная
            const data = JSON.parse(saved);
            // Меняем содержимое массива (const разрешает)
            wishlist.length = 0;
            wishlist.push(...data);
            return true;
        }
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
    return false;
};

const saveWishes = function() {
    try {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
};

// ========================================
// 3. РЕНДЕРИНГ
// ========================================

const renderWishes = function() {
    if (wishlist.length === 0) {
        wishesContainer.innerHTML = `
            <div class="empty">
                <span class="emoji">🌟</span>
                <p>Нет желаний</p>
                <p style="font-size:14px;color:#ccc;">Добавьте свою первую мечту!</p>
            </div>
        `;
        return;
    }

    // var - используем в цикле (но лучше let)
    var html = '';
    
    for (var i = 0; i < wishlist.length; i++) {
        const wish = wishlist[i]; // const внутри цикла
        const image = wish.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23f0ebf8"/%3E%3Ctext x="100" y="115" text-anchor="middle" font-size="60" fill="%237c3aed"%3E🌟%3C/text%3E%3C/svg%3E';
        
        html += `
            <div class="wish-card" draggable="true" data-index="${i}">
                <img class="card-image" src="${image}" alt="${wish.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect width=%22200%22 height=%22200%22 fill=%22%23f0ebf8%22/%3E%3Ctext x=%22100%22 y=%22115%22 text-anchor=%22middle%22 font-size=%2260%22 fill=%22%237c3aed%22%3E🌟%3C/text%3E%3C/svg%3E'">
                <div class="card-content">
                    <div class="card-title">${escapeHtml(wish.title)}</div>
                    <span class="card-category">${escapeHtml(wish.category)}</span>
                    <div class="card-actions">
                        <button class="delete-btn" onclick="deleteWish(${i})">🗑️ Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    wishesContainer.innerHTML = html;
    
    // Добавляем обработчики для drag-and-drop
    const cards = document.querySelectorAll('.wish-card');
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('dragover', handleDragOver);
        card.addEventListener('dragenter', handleDragEnter);
        card.addEventListener('dragleave', handleDragLeave);
        card.addEventListener('drop', handleDrop);
    });
};

// ========================================
// 4. DRAG AND DROP (перетаскивание)
// ========================================

let dragIndex = null;

const handleDragStart = function(e) {
    dragIndex = parseInt(e.target.dataset.index);
    e.target.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
};

const handleDragEnd = function(e) {
    e.target.style.opacity = '1';
};

const handleDragOver = function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
};

const handleDragEnter = function(e) {
    e.preventDefault();
    e.target.style.border = '2px dashed #7c3aed';
};

const handleDragLeave = function(e) {
    e.target.style.border = 'none';
};

const handleDrop = function(e) {
    e.preventDefault();
    e.target.style.border = 'none';
    
    const dropIndex = parseInt(e.target.dataset.index);
    if (dragIndex !== null && dragIndex !== dropIndex) {
        // Перемещаем элемент в массиве
        const [item] = wishlist.splice(dragIndex, 1);
        wishlist.splice(dropIndex, 0, item);
        saveWishes();
        renderWishes();
    }
    dragIndex = null;
};

// ========================================
// 5. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ========================================

const escapeHtml = function(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

const clearForm = function() {
    wishTitle.value = '';
    wishImage.value = '';
    wishCategory.value = 'Путешествия';
    editingId = null;
    saveWishBtn.textContent = ' Сохранить';
    wishForm.style.display = 'none';
    showFormBtn.style.display = 'block';
};

// ========================================
// 6. CRUD ОПЕРАЦИИ
// ========================================

const addWish = function() {
    // Получаем значения
    const title = wishTitle.value.trim();
    const category = wishCategory.value;
    const image = wishImage.value.trim();

    // Валидация
    if (!title) {
        alert('Введите название желания!');
        wishTitle.focus();
        return;
    }

    // Создаём желание
    const wish = {
        id: Date.now().toString(),
        title: title,
        category: category,
        image: image || '',
        createdAt: new Date().toISOString()
    };

    wishlist.push(wish);
    saveWishes();
    renderWishes();
    clearForm();
    
    console.log(` Добавлено желание: ${title}`);
};

const deleteWish = function(index) {
    if (!confirm('Удалить желание?')) return;
    
    const title = wishlist[index].title;
    wishlist.splice(index, 1);
    saveWishes();
    renderWishes();
    
    console.log(` Удалено желание: ${title}`);
};

// ========================================
// 7. УПРАВЛЕНИЕ ФОРМОЙ
// ========================================

const showForm = function() {
    wishForm.style.display = 'block';
    showFormBtn.style.display = 'none';
    wishTitle.focus();
};

// ========================================
// 8. ИНИЦИАЛИЗАЦИЯ
// ========================================

const init = function() {
    console.log(' Запуск карты желаний');
    
    // var - старая, но для примера
    var hasSaved = loadWishes();
    
    if (hasSaved) {
        console.log(` Загружено желаний: ${wishlist.length}`);
    } else {
        console.log(' Новая карта желаний');
    }
    
    renderWishes();

    // Обработчики (используем const для функций)
    showFormBtn.addEventListener('click', showForm);
    cancelBtn.addEventListener('click', clearForm);
    
    saveWishBtn.addEventListener('click', function() {
        addWish();
    });

    // Сохранение по Ctrl+Enter
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            if (wishForm.style.display === 'block') {
                e.preventDefault();
                addWish();
            }
        }
    });

    // Отмена по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && wishForm.style.display === 'block') {
            clearForm();
        }
    });

    console.log(' Карта желаний готова!');
};

// ========================================
// 9. ЗАПУСК
// ========================================

// Используем var для примера
var isReady = document.readyState === 'loading' ? false : true;

if (isReady) {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}

// ========================================
// 10. ПРИМЕРЫ ПЕРЕМЕННЫХ (для справки)
// ========================================

console.log('=== ПЕРЕМЕННЫЕ В JAVASCRIPT ===');

// var - старая (функциональная область)
var oldVar = 'Я var';
function testVar() {
    var inside = 'Внутри функции';
    console.log(inside); // Доступно
}
// console.log(inside); // ❌ Ошибка (не доступно)

// let - современная (блочная область)
let modernLet = 'Я let';
if (true) {
    let blockLet = 'Внутри блока';
    console.log(blockLet); // Доступно
}
// console.log(blockLet); // ❌ Ошибка (не доступно)

// const - неизменяемая
const constValue = 'Я const';
// constValue = 'Новое значение'; // ❌ Ошибка

// const с объектом - можно менять свойства
const obj = { name: 'Иван' };
obj.name = 'Петр'; // ✅ Можно
// obj = {}; // ❌ Ошибка

console.log(' Переменные работают!');