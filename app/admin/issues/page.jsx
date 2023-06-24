'use client'
import React, { useState } from 'react'
import styles from './issues.css'

// Массив с данными об отчетах
const reportsData = [
  {
    id: 1,
    title: 'Ошибка при загрузке изображений',
    author: 'Иван Иванов',
    date: '2023-06-23',
    description: 'При попытке загрузить изображение на сайт выдает ошибку 404.',
    solved: false
  },
  {
    id: 2,
    title: 'Эксесс при регистрации нового пользователя',
    author: 'Петр Петров',
    date: '2023-06-22',
    description: 'При регистрации нового пользователя на сайте происходит эксесс и сайт перестает работать.',
    solved: false
  },
  {
    id: 3,
    title: 'Ошибка при оплате заказа',
    author: 'Анна Андреева',
    date: '2023-06-21',
    description: 'При оплате заказа на сайте выдает ошибку 500 и не подтверждает оплату.',
    solved: false
  }
]

// Компонент для карточки отчета
function ReportCard({ report, onDelete }) {
  // Состояние для раскрытия карточки
  const [expanded, setExpanded] = useState(false)

  // Функция для обработки нажатия на карточку
  function handleToggle() {
    setExpanded(!expanded)
  }

  // Функция для обработки нажатия на кнопку "Проблема решена"
  function handleSolve() {
    // Вызываем функцию из пропсов с id отчета
    onDelete(report.id)
  }

  return (
    <div className={styles.card} onClick={handleToggle}>
      <h3>{report.title}</h3>
      <p>От: {report.author}</p>
      <p>Дата: {report.date}</p>
      {/* Если карточка раскрыта, показываем полное описание и кнопку */}
      {expanded && (
        <>
          <p>{report.description}</p>
          <button onClick={handleSolve}>Проблема решена</button>
        </>
      )}
    </div>
  )
}

// Компонент для поиска по словам
function SearchBar({ value, onChange }) {
  // Функция для обработки изменения значения в инпуте
  function handleChange(event) {
    // Вызываем функцию из пропсов с новым значением
    onChange(event.target.value)
  }

  return (
    <div className={styles.search}>
      <label htmlFor="search">Поиск по словам:</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Введите слово"
      />
    </div>
  )
}

// Компонент для фильтра по дате
function DateFilter({ value, onChange }) {
  // Функция для обработки изменения значения в селекте
  function handleChange(event) {
    // Вызываем функцию из пропсов с новым значением
    onChange(event.target.value)
  }

  return (
    <div className={styles.filter}>
      <label htmlFor="filter">Фильтр по дате:</label>
      <select id="filter" value={value} onChange={handleChange}>
        <option value="all">Все</option>
        <option value="today">Сегодня</option>
        <option value="week">Неделя</option>
        <option value="month">Месяц</option>
      </select>
    </div>
  )
}

// Основной компонент для страницы отчетов
export default function Reports() {
  // Состояние для списка отчетов
  const [reports, setReports] = useState(reportsData)
  // Состояние для значения поиска по словам
  const [search, setSearch] = useState('')
  // Состояние для значения фильтра по дате
  const [filter, setFilter] = useState('all')

  // Функция для удаления отчета по id
  function deleteReport(id) {
    // Создаем новый массив из отчетов без удаленного
    const updated = reports.filter((report) => report.id !== id)
    // Обновляем состояние с новым массивом
    setReports(updated)
  }

  // Функция для фильтрации отчетов по слову и дате
  function filterReports() {
    // Создаем новый массив из отчетов
    let filtered = [...reports]
    // Если есть значение поиска по словам, фильтруем отчеты по заголовку или описанию
    if (search) {
      filtered = filtered.filter(
        (report) =>
          report.title.toLowerCase().includes(search.toLowerCase()) ||
          report.description.toLowerCase().includes(search.toLowerCase())
      )
    }
    // Если есть значение фильтра по дате, фильтруем отчеты по дате
    if (filter !== 'all') {
      // Получаем текущую дату в миллисекундах
      const now = Date.now()
      // Определяем интервал в миллисекундах в зависимости от фильтра
      const interval =
        filter === 'today'
          ? 24 * 60 * 60 * 1000 // один день
          : filter === 'week'
          ? 7 * 24 * 60 * 60 * 1000 // одна неделя
          : filter === 'month'
          ? 30 * 24 * 60 * 60 * 1000 // один месяц
          : null
      // Фильтруем отчеты по дате, приводя ее к миллисекундам и сравнивая с интервалом
      filtered = filtered.filter(
        (report) => now - Date.parse(report.date) <= interval
      )
    }
    // Возвращаем отфильтрованный массив
    return filtered
  }

  return (
    <div className={styles.container}>
      <h1>Отчеты об ошибках или эксесах</h1>
      {/* Рендерим компоненты для поиска и фильтра */}
      <SearchBar value={search} onChange={setSearch} />
      <DateFilter value={filter} onChange={setFilter} />
      {/* Рендерим компоненты для карточек отчетов, передавая функцию для удаления */}
      <div className={styles.cards}>
        {filterReports().map((report) => (
          <ReportCard key={report.id} report={report} onDelete={deleteReport} />
        ))}
      </div>
    </div>
  )
}
