'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const VineyardPage = () => {
  // Здесь можно использовать ваши данные о фенофазах и метеорологических данных
  const vineyardData = [
    { year: 2020, phenophase: 'Сокодвижение', temperature: 20, precipitation: 10 },
    { year: 2021, phenophase: 'Набухание почек', temperature: 18, precipitation: 15 },
    { year: 2022, phenophase: 'Распускание', temperature: 22, precipitation: 5 },
    // Добавьте остальные данные
  ];

  const harvestForecast = {
    year: 2023,
    predictedDate: '01.09.2023', // Здесь нужно использовать фактический прогноз
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658']; // Цвета для диаграммы "PieChart"

  // Создаем текстовый прогноз на основе данных графиков
  const generateForecastText = () => {
    const lastYearData = vineyardData[vineyardData.length - 1];
    const lastYearTemperature = lastYearData.temperature;
    const lastYearPrecipitation = lastYearData.precipitation;

    let forecastText = '';
    if (lastYearTemperature > 20) {
      forecastText += 'Ожидайте теплую погоду, что может положительно повлиять на созревание винограда. ';
    } else {
      forecastText += 'Прогнозируется прохладная погода, что может замедлить созревание винограда. ';
    }

    if (lastYearPrecipitation > 10) {
      forecastText += 'Ожидается повышенное количество осадков, что может способствовать росту винограда. ';
    } else {
      forecastText += 'Прогнозируется небольшое количество осадков, что может потребовать дополнительного полива. ';
    }

    forecastText += 'Рекомендуется более детальный анализ и мониторинг погоды для определения точного времени уборки урожая.';

    return forecastText;
  };

  const forecastText = generateForecastText();

  return (
    <div>
      <h1>Фенофазы виноградных растений и прогноз уборки урожая</h1>
      <div className="chart">
        <h2>График линии</h2>
        <LineChart width={800} height={400} data={vineyardData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <Line type="monotone" dataKey="precipitation" stroke="#82ca9d" />
        </LineChart>

        <h2>Гистограмма</h2>
        <BarChart width={800} height={400} data={vineyardData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="temperature" fill="#8884d8" />
          <Bar dataKey="precipitation" fill="#82ca9d" />
        </BarChart>

        <h2>Круговая диаграмма</h2>
        <PieChart width={800} height={400}>
          <Pie
            data={vineyardData}
            dataKey="temperature"
            nameKey="year"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {vineyardData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>

        <div className="forecast-text">
          <h2>Прогноз уборки урожая на {harvestForecast.year} год</h2>
          <p>{forecastText}</p>
        </div>
      </div>

      <style jsx>{`
        .chart {
          margin-bottom: 20px;
        }

        h1, h2, p {
          font-family: Arial, sans-serif;
        }

        .forecast-text {
          margin-top: 20px;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default VineyardPage;
