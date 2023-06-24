'use client'
// Импортируем необходимые модули
import styles from './styles/admin.css'
import React from 'react'
import Link from 'next/link'
import { LineChart, PieChart, BarChart, AreaChart } from 'react-chartkick';
import 'chart.js';

// Создаем компонент хедера с кнопкой выхода
function Header() {
  // Создаем функцию для обработки клика по кнопке выхода
  const handleLogout = () => {
    // Удаляем данные пользователя из локального хранилища
    localStorage.removeItem('user')
    // Переходим на страницу авторизации
    window.location.href = '/'
  }

  // Возвращаем JSX-разметку хедера
  return (
    
    <div className="header">
      <h1>Страница админа</h1>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  )
}

// Создаем компонент меню с вкладками
function Menu() {
  // Возвращаем JSX-разметку меню
  return (
    <div className="menu">
      <ul>
        <li><Link href="/admin/tasks">Задачи</Link></li>
        <li><Link href="/admin/manual">Ручные работы на виноградниках</Link></li>
        <li><Link href="/admin/lab">Анализы лаборатории</Link></li>
        <li><Link href="/admin/warehouse">Взаимодействие со складом и бухгалтерией</Link></li>
        <li><Link href="/admin/finance">Финансовые показатели</Link></li>
        <li><Link href="/admin/harvest">Уборка урожая</Link></li>
        <li><Link href="/admin/production">Производство</Link></li>
        <li><Link href="/admin/issues">Проблемы и нарушения</Link></li>
      </ul>
    </div>
  )
}

// Создаем компонент страницы для админа
export default function AdminPage({ children }) {
  // Возвращаем JSX-разметку страницы
  return (

    <div className="container">
      <Header />
      <Menu /> 
      <div className="content">
        {children}
      </div>
    </div>
  )
}
