# Структура проекта

```
vibe/
├── electron/                 # Процессы Electron
│   ├── main.ts              # Main-процесс (nodeIntegration: false, contextIsolation: true)
│   └── preload.ts           # Preload с contextBridge
│
├── public/                  # Статические ассеты
│
├── src/
│   ├── app/                 # Точка входа приложения
│   │   ├── App.tsx
│   │   ├── App.module.scss
│   │   └── main.tsx
│   │
│   ├── components/          # React-компоненты
│   │   ├── index.ts         # Barrel export
│   │   └── Game/            # Фича «Игра»
│   │       ├── index.ts
│   │       ├── Game/        # Контейнер игры
│   │       ├── Board/       # Игровое поле
│   │       ├── Cell/        # Клетка
│   │       └── Header/      # Таймер, флаги, Restart
│   │
│   ├── config/              # Конфигурация
│   │   ├── index.ts
│   │   └── game.config.ts
│   │
│   ├── hooks/               # React hooks
│   │   ├── index.ts
│   │   ├── useMinesweeper.ts
│   │   └── useTimer.ts
│   │
│   ├── utils/               # Утилиты (логика отделена от UI)
│   │   ├── index.ts
│   │   └── game/
│   │       ├── index.ts
│   │       └── board.ts     # Игровая логика (создание поля, reveal, флаги)
│   │
│   ├── types/               # TypeScript типы
│   │   ├── index.ts
│   │   ├── game.ts
│   │   └── electron.d.ts
│   │
│   └── styles/              # Глобальные стили
│       └── index.scss
│
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.electron.json
└── vite.config.ts
```

## Принципы организации

- **components** — только UI, без бизнес-логики
- **hooks** — состояние и побочные эффекты
- **utils** — чистая логика (игра, форматирование)
- **config** — константы и настройки
- **types** — общие типы
- Barrel exports (`index.ts`) для удобного импорта
