'use client'
import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/manual.css'
// Симулируем данные с поля и лаборатории
const data = [
  {
    id: 1,
    field: 'A',
    harvester: 'Иванов',
    status: 'штатный',
    estimatedWeight: 5000,
    boxes: 100,
    pallets: 10,
    vehicleWeight: 2000,
    actualWeight: 7000,
    analysis: {
      bunchWeight: 250,
      sugar: 18,
      acidity: 6,
      etc: '...'
    },
    quality: 4,
    comments: 'Нет болезней и вредителей, хорошая фенольная зрелость'
  },
  {
    id: 2,
    field: 'B',
    harvester: 'Петров',
    status: 'подрядчик',
    estimatedWeight: 4000,
    boxes: 80,
    pallets: 8,
    vehicleWeight: 2000,
    actualWeight: 6000,
    analysis: {
      bunchWeight: 200,
      sugar: 16,
      acidity: 7,
      etc: '...'
    },
    quality: 3,
    comments: 'Есть небольшие повреждения от птиц, средняя фенольная зрелость'
  }
]

export default function Home() {
  // Состояние для отображения процента готовности сборки
  const [progress, setProgress] = useState(0)

  // Функция для обновления процента готовности сборки
  const updateProgress = () => {
    // Если процент меньше 100, то увеличиваем его на случайное число от 1 до 10
    if (progress < 100) {
      setProgress(progress + Math.floor(Math.random() * 10) + 1)
    }
  }

  // Функция для форматирования числа с разделителями тысяч
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Уборка урожая</title>
        <meta name="description" content="Страница на next.js для уборки урожая" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Уборка урожая</h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Сбор на поле</h2>
            <p>Процент готовности сборки:</p>
            <div className={styles.progress}>
              <div className={styles.bar} style={{ width: `${progress}%` }}>
                {progress}%
              </div>
            </div>
            <button onClick={updateProgress}>Обновить</button>
          </div>

          {data.map((item) => (
            <div key={item.id} className={styles.card}>
              <h2>Отправлено с поля {item.field}</h2>
              <p>Сборщик: {item.harvester} ({item.status})</p>
              <p>Расчетный вес: {formatNumber(item.estimatedWeight)} кг</p>
              <p>Количество ящиков: {item.boxes}</p>
              <p>Количество поддонов: {item.pallets}</p>
              <p>Масса машины до погрузки: {formatNumber(item.vehicleWeight)} кг</p>
              <p>Фактический вес загруженного автотранспорта: {formatNumber(item.actualWeight)} кг</p>
              <p>Результаты анализов:</p>
              <ul>
                <li>Вес грозди: {item.analysis.bunchWeight} г</li>
                <li>Сахар: {item.analysis.sugar} %</li>
                <li>Титруемая кислотность: {item.analysis.acidity} г/л</li>
                <li>Прочее: {item.analysis.etc}</li>
              </ul>
              <p>Оценка качества по 5-балльной шкале: {item.quality}</p>
              <p>Комментарии по качеству: {item.comments}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.bing.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <img src="/bing-logo.svg" alt="Bing Logo" />
          </span>
        </a>
      </footer>
    </div>
  )
}
