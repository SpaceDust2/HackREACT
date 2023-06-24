'use client'
import React, { useState } from 'react';

const VineyardAnalysisPage = () => {
  // Данные о пробах и результаты анализов
  const [samples, setSamples] = useState([
    { id: 1, date: '10.06.2023', grapeVariety: 'Chardonnay', plotNumber: 'A1', result: 'Ссылка на документ' },
    { id: 2, date: '15.06.2023', grapeVariety: 'Merlot', plotNumber: 'B2', result: 'Ссылка на документ' },
    // Добавьте остальные пробы и результаты
  ]);

  // Состояние для формы добавления новой пробы
  const [newSample, setNewSample] = useState({
    date: '',
    grapeVariety: '',
    plotNumber: '',
    result: '',
  });

  // Обработчик изменения значений полей формы добавления новой пробы
  const handleNewSampleChange = (e) => {
    setNewSample({ ...newSample, [e.target.name]: e.target.value });
  };

  // Обработчик добавления новой пробы
  const handleAddSample = () => {
    const newSampleWithId = { ...newSample, id: samples.length + 1 };
    setSamples([...samples, newSampleWithId]);
    setNewSample({
      date: '',
      grapeVariety: '',
      plotNumber: '',
      result: '',
    });
  };

  // Обработчик удаления пробы
  const handleDeleteSample = (id) => {
    const updatedSamples = samples.filter((sample) => sample.id !== id);
    setSamples(updatedSamples);
  };

  return (
    <div>
      <h1>Анализы лаборатории</h1>
      <div className="samples">
        <h2>Пробы</h2>
        <table>
          <thead>
            <tr>
              <th>Дата отбора</th>
              <th>Сорт винограда</th>
              <th>Номер участка</th>
              <th>Результат</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {samples.map((sample) => (
              <tr key={sample.id}>
                <td>{sample.date}</td>
                <td>{sample.grapeVariety}</td>
                <td>{sample.plotNumber}</td>
                <td>{sample.result}</td>
                <td>
                  <button onClick={() => handleDeleteSample(sample.id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="add-sample">
        <h2>Добавить новую пробу</h2>
        <form>
          <label>
            Дата отбора:
            <input type="text" name="date" value={newSample.date} onChange={handleNewSampleChange} />
          </label>
          <label>
            Сорт винограда:
            <input type="text" name="grapeVariety" value={newSample.grapeVariety} onChange={handleNewSampleChange} />
          </label>
          <label>
            Номер участка:
            <input type="text" name="plotNumber" value={newSample.plotNumber} onChange={handleNewSampleChange} />
          </label>
          <label>
            Результат:
            <input type="text" name="result" value={newSample.result} onChange={handleNewSampleChange} />
          </label>
          <button type="button" onClick={handleAddSample}>Добавить</button>
        </form>
      </div>

      <style jsx>{`
        h1, h2, th, td {
          font-family: Arial, sans-serif;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        th, td {
          border: 1px solid black;
          padding: 8px;
        }

        button {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default VineyardAnalysisPage;
