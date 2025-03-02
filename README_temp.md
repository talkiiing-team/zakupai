# ЗакупAI

## Dev quickstart

- Поставь `pyenv` и убедись что у тебя выбрана корректная версия Python
- Создай .venv и поставь зависимости

```bash
python3 -m venv .venv
python3 -m pip install -r api/requirements.txt
python3 -m pip install -r ml/requirements.txt
```

## Таски

### Infra + Boilerplate

- [x] Поднять виртуалку
- [x] Поднять кубер
- [x] Купить домен - `закуп-ай.рф`
- [x] Поднять ingress & cert-manager
- [x] Поднять PostgreSQL
- [x] Поднять Clickhouse
- [ ] Забутстрапить фронт
  - React
  - Gravity UI
  - Tailwind CSS
  - C роутером надо смотреть что там с Gravity
  - Без SSR
  - Docker с nginx
- [ ] Забутстрапить бек
  - Python 3.12
  - SQLAlchemy для PostgreSQL
  - Clickhouse Connect
  - FastAPI
  - Alembic + init container
- [ ] Забутстрапить сервис с ML
  - Python 3.12
  - FastAPI
  - ML библиотеки...
- [x] Сгенерировать синтетический датасет

### Функционал BI

- [ ] Контейнер с графиками и контролами на фронте
- [ ] Формирование запроса в базу на беке

### Функционал Report Scheduling

- [ ] Форма настройки среза на фронте
- [ ] Хранение меты шедулеров, шедулинг (pure cron / k8s cron jobs)
- [ ] Генерация отчета в .pdf
  - Генерация изображения графиков (maybe nodriver/puppetter)
- [ ] Отправка на каналы нотификаций (OR)
  - Telegram + механизм линка chat_id пользователя
  - Email

### Презентация

- [x] Логотип
- [x] Тема для презентации
- [ ] Схемы
  - Архитектура решения
  - Взаимодействие фичей
  - Скриншоты/Скринкасты UI
- [ ] Тренировка питчинга
