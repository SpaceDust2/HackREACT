'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Сгенерировать случайные данные для графиков
const generateData = (n) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push({
      date: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
      revenue: Math.floor(Math.random() * 10000),
      profit: Math.floor(Math.random() * 5000),
      expense: Math.floor(Math.random() * 8000),
    });
  }
  return data;
};

// Создать компонент графика с расширением и подробной информацией
const Chart = ({ title, data }) => {
  // Состояние для хранения флага расширения
  const [expanded, setExpanded] = React.useState(false);

  // Функция для переключения флага расширения
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Размеры графика в зависимости от флага расширения
  const width = expanded ? 800 : 400;
  const height = expanded ? 400 : 200;

  return (
    <div className="chart">
      <h3>{title}</h3>
      <LineChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
        <Line type="monotone" dataKey="expense" stroke="#ff0000" />
      </LineChart>
      {expanded && (
        <div className="details">
          <p>Средний доход: {data.reduce((sum, d) => sum + d.revenue, 0) / data.length}</p>
          <p>Средняя прибыль: {data.reduce((sum, d) => sum + d.profit, 0) / data.length}</p>
          <p>Средний расход: {data.reduce((sum, d) => sum + d.expense, 0) / data.length}</p>
        </div>
      )}
      <button onClick={toggleExpanded}>{expanded ? 'Свернуть' : 'Расширить'}</button>
      {/* Стили для компонента графика */}
      <style jsx>{`
        .chart {
          margin: 10px;
          border: 1px solid #ccc;
          padding: 10px;
        }
        .details {
          margin: 10px;
        }
        button {
          margin: 10px;
          padding: 10px;
          background-color: #eee;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

// Создать компонент страницы с четырьмя графиками
export default function Page() {
  // Сгенерировать данные для четырех графиков
  const data1 = generateData(10);
  const data2 = generateData(20);
  const data3 = generateData(30);
  const data4 = generateData(40);

  return (
    <div className="container">
      <h1>Страничка с графиками</h1>
      <div className="charts">
        <Chart title="График 1" data={data1} />
        <Chart title="График 2" data={data2} />
        <Chart title="График 3" data={data3} />
        <Chart title="График 4" data={data4} />
      </div>
      {/* Стили для компонента страницы */}
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }
        .charts {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
