# Cloud-Native серверні системи: патерни Node.js та Go

Презентації з дисципліни «Cloud-Native серверні системи: патерни Node.js та Go» (Чернівецький національний університет імені Юрія Федьковича, кафедра програмного забезпечення комп'ютерних систем).

**Розробники курсу:** Дяконенко Б. В., Когут О. В.

## Лекції

| № | Тема | Файл |
|---|------|------|
| 6 | Неблокуючий I/O в реальному часі: Node.js Streams, Backpressure, WebSockets (ws / Socket.IO / gorilla) | [lecture-06.html](lecture-06.html) |
| 7 | Рівень персистентності: SQL/NoSQL, Connection Pools, CRUD, Repository pattern (Go interfaces) | [lecture-07.html](lecture-07.html) |
| 8 | Безстатусна безпека та криптографія: JWT, хешування паролів (crypto/bcrypt), SQLi/XSS/CSRF/Clickjacking, обфускація Node.js та стріпінг Go | [lecture-08.html](lecture-08.html) |

## Запуск

```bash
npm install
npm run serve
```

Відкрийте `http://localhost:8080` у браузері. Керування слайдами — стрілки ←/→, `F` — повний екран.

## Скрипти

| Команда | Призначення |
|---------|-------------|
| `npm run serve` | Локальний сервер для перегляду |
| `npm run bundle` | Збірка єдиного HTML-файлу |
| `npm run archive` | Архів ZIP презентації |
| `npm run pages` | Експорт слайдів у PDF |

## Структура

```
├── index.html               Зміст — список лекцій
├── lecture-06.html          Лекція 6
├── lecture-07.html          Лекція 7
├── lecture-08.html          Лекція 8
├── lecture-template.html    Шаблон нової лекції
├── pictures/                Ілюстрації
├── styles/
│   ├── variables.css        Бренд-кольори
│   ├── slide.css            Стилі слайдів
│   └── custom.css           Агрегатор стилів
└── package.json             Залежності Shower
```

Презентації побудовано на фреймворку [Shower](https://github.com/shower/shower) (тема Ribbon).

## Додавання нової лекції

1. Скопіюйте `lecture-template.html` у `lecture-NN.html`, заповніть слайди.
2. Додайте посилання у `index.html` (блок `<section class="slide">`).
3. Додайте ім'я файлу до масиву `files` у `package.json`.