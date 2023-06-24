'use client'
import React, { useState } from 'react';

const VineyardWarehousePage = () => {
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Удобрение', status: 'На складе', quantity: 10, documentation: 'Ссылка на документацию 1' },
    { id: 2, name: 'Пестицид', status: 'На складе', quantity: 5, documentation: 'Ссылка на документацию 2' },
    // Добавьте остальные материалы
  ]);

  const [newMaterial, setNewMaterial] = useState({
    name: '',
    status: '',
    quantity: 0,
    documentation: '',
  });

  const handleNewMaterialChange = (e) => {
    setNewMaterial({ ...newMaterial, [e.target.name]: e.target.value });
  };

  const handleAddMaterial = () => {
    const newMaterialWithId = { ...newMaterial, id: materials.length + 1 };
    setMaterials([...materials, newMaterialWithId]);
    setNewMaterial({
      name: '',
      status: '',
      quantity: 0,
      documentation: '',
    });
  };

  const handleChangeMaterialStatus = (id) => {
    const updatedMaterials = materials.map((material) => {
      if (material.id === id) {
        const newStatus = material.status === 'На складе' ? 'Списано' : 'На складе';
        return { ...material, status: newStatus };
      }
      return material;
    });
    setMaterials(updatedMaterials);
  };

  const filterMaterialsByStatus = (status) => {
    return materials.filter((material) => material.status === status);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMaterials = materials.filter(
      (material) =>
        material.name.toLowerCase().includes(searchTerm) ||
        material.status.toLowerCase().includes(searchTerm) ||
        material.quantity.toString().includes(searchTerm) ||
        material.documentation.toLowerCase().includes(searchTerm)
    );
    setMaterials(filteredMaterials);
  };

  return (
    <div>
      <h1>Взаимодействие со складом и бухгалтерией</h1>
      <div className="warehouse">
        <h2>Материалы на складе</h2>
        <div className="search">
          <input type="text" placeholder="Поиск" onChange={handleSearch} />
        </div>
        <table>
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Статус</th>
              <th>Количество</th>
              <th>Документация</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filterMaterialsByStatus('На складе').map((material) => (
              <tr key={material.id}>
                <td>{material.name}</td>
                <td>{material.status}</td>
                <td>{material.quantity}</td>
                <td>{material.documentation}</td>
                <td>
                  <button onClick={() => handleChangeMaterialStatus(material.id)}>Списать</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="receive-materials">
        <h2>Получение материалов</h2>
        <form>
          <label>
            Наименование материала:
            <input type="text" name="name" value={newMaterial.name} onChange={handleNewMaterialChange} />
          </label>
          <label>
            Статус:
            <input type="text" name="status" value={newMaterial.status} onChange={handleNewMaterialChange} />
          </label>
          <label>
            Количество:
            <input type="number" name="quantity" value={newMaterial.quantity} onChange={handleNewMaterialChange} />
          </label>
          <label>
            Документация:
            <input type="text" name="documentation" value={newMaterial.documentation} onChange={handleNewMaterialChange} />
          </label>
          <button type="button" onClick={handleAddMaterial}>
            Получить
          </button>
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

        .search {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default VineyardWarehousePage;
