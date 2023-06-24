'use client'
// components/Document.js

import React, { useState } from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { KJUR } from "jsrsasign";
import PDFCanvas from "./PDFCanvas";

// Компонент для отображения списка документов
const DocumentList = ({ documents, onSelect }) => {
  return (
    <div className="document-list">
      <h1>Список документов</h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <a href="#" onClick={() => onSelect(doc)}>
              {doc.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Компонент для формы создания документа по шаблону
const DocumentForm = ({ template, onSubmit }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Создаем новый PDF-документ на основе шаблона
    const pdfDoc = await PDFDocument.load(template);
    // Получаем шрифт для добавления текста
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    // Получаем первую страницу документа
    const page = pdfDoc.getPage(0);
    // Добавляем текст на страницу
    page.drawText(text, {
      x: 50,
      y: 450,
      size: 12,
      font,
    });
    // Сохраняем PDF-документ в формате Uint8Array
    const pdfBytes = await pdfDoc.save();
    // Вызываем функцию onSubmit с данными о новом документе
    onSubmit({
      id: Math.random().toString(36).substr(2),
      name,
      data: pdfBytes,
      signed: false,
    });
  };

  return (
    <div className="document-form">
      <h1>Создание документа по шаблону</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Название документа:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="text">Текст документа:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Создать документ</button>
        </div>
      </form>
    </div>
  );
};

// Компонент для просмотра и редактирования документа
const DocumentView = ({ document, onEdit, onSign }) => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState("");

  const handleEdit = async (e) => {
    e.preventDefault();
    // Создаем новый PDF-документ на основе существующего
    const pdfDoc = await PDFDocument.load(document.data);
    // Получаем шрифт для добавления текста
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    // Получаем первую страницу документа
    const page = pdfDoc.getPage(0);
    // Добавляем текст на страницу
    page.drawText(text, {
      x: 50,
      y: 450,
      size: 12,
      font,
    });
    // Сохраняем PDF-документ в формате Uint8Array
    const pdfBytes = await pdfDoc.save();
    // Продолжение кода для компонента DocumentView
    // Вызываем функцию onEdit с данными о измененном документе
    onEdit({
        ...document,
        data: pdfBytes,
      });
      // Выходим из режима редактирования
      setEditMode(false);
    };
  
    return (
      <div className="document-view">
        <h1>Просмотр и редактирование документа</h1>
        {editMode ? (
          <form onSubmit={handleEdit}>
            <div>
              <label htmlFor="text">Текст документа:</label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit">Сохранить изменения</button>
              <button type="button" onClick={() => setEditMode(false)}>
                Отменить редактирование
              </button>
            </div>
          </form>
        ) : (
          <>
            <PDFCanvas file={document.data} />
            {document.signed ? (
              <p>Документ подписан электронной подписью.</p>
            ) : (
              <>
                <p>Документ не подписан электронной подписью.</p>
                <button onClick={() => setEditMode(true)}>Редактировать документ</button>
                <button onClick={() => onSign(document)}>Подписать документ</button>
              </>
            )}
          </>
        )}
      </div>
    );
  };
  
  // Компонент для подписания документа электронной подписью
  const DocumentSign = ({ document, onConfirm }) => {
    const [privateKey, setPrivateKey] = useState("");
    const [publicKey, setPublicKey] = useState("");
  
    const handleSign = async (e) => {
      e.preventDefault();
      // Создаем новый PDF-документ на основе существующего
      const pdfDoc = await PDFDocument.load(document.data);
      // Генерируем хеш документа с помощью SHA-256
      const hash = KJUR.crypto.Util.sha256(document.data);
      // Подписываем хеш с помощью приватного ключа и алгоритма RSA
      const sig = new KJUR.crypto.Signature({ alg: "SHA256withRSA" });
      sig.init(privateKey);
      sig.updateHex(hash);
      const signature = sig.sign();
      // Добавляем подпись в метаданные документа
      pdfDoc.setKeywords(signature);
      // Сохраняем PDF-документ в формате Uint8Array
      const pdfBytes = await pdfDoc.save();
      // Вызываем функцию onConfirm с данными о подписанном документе
      onConfirm({
        ...document,
        data: pdfBytes,
        signed: true,
        publicKey,
      });
    };
  
    return (
      <div className="document-sign">
        <h1>Подписание документа электронной подписью</h1>
        <form onSubmit={handleSign}>
          <div>
            <label htmlFor="privateKey">Приватный ключ:</label>
            <textarea
              id="privateKey"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="publicKey">Публичный ключ:</label>
            <textarea
              id="publicKey"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Подписать документ</button>
          </div>
        </form>
      </div>
    );
  };
  
  // Компонент для просмотра истории документа
  const DocumentHistory = ({ document, history, onSelect }) => {
    return (
            // Продолжение кода для компонента DocumentHistory
    <div className="document-history">
    <h1>История документа</h1>
    <ul>
      {history.map((doc) => (
        <li key={doc.id}>
          <a href="#" onClick={() => onSelect(doc)}>
            {doc.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
};

// Экспортируем компоненты для использования в других файлах
export { DocumentList, DocumentForm, DocumentView, DocumentSign, DocumentHistory };
