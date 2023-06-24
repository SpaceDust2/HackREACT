// pages/index.js
'use client'
import React, { useState } from "react";
import {
  DocumentList,
  DocumentForm,
  DocumentView,
  DocumentSign,
  DocumentHistory,
} from "./components/Document";

// Загружаем шаблон документа в формате base64
import template from "../template.txt";

// Конвертируем base64 в Uint8Array
const templateBytes = Uint8Array.from(atob(template), (c) => c.charCodeAt(0));

// Создаем начальный список документов
const initialDocuments = [
  {
    id: "1",
    name: "Договор оказания услуг",
    data: templateBytes,
    signed: false,
  },
  {
    id: "2",
    name: "Акт выполненных работ",
    data: templateBytes,
    signed: false,
  },
];

// Главный компонент страницы
const Home = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [signMode, setSignMode] = useState(false);
  const [historyMode, setHistoryMode] = useState(false);

  // Функция для добавления нового документа в список
  const handleCreateDocument = (document) => {
    setDocuments([...documents, document]);
    setSelectedDocument(document);
  };

  // Функция для обновления существующего документа в списке
  const handleEditDocument = (document) => {
    setDocuments(documents.map((doc) => (doc.id === document.id ? document : doc)));
    setSelectedDocument(document);
  };

  // Функция для подписания существующего документа в списке
  const handleSignDocument = (document) => {
    setDocuments(documents.map((doc) => (doc.id === document.id ? document : doc)));
    setSelectedDocument(document);
    setSignMode(false);
  };

  // Функция для переключения режима подписания документа
  const toggleSignMode = (document) => {
    setSignMode(!signMode);
    setSelectedDocument(document);
  };

  // Функция для переключения режима просмотра истории документа
      // Продолжение кода для компонента Home
      const toggleHistoryMode = (document) => {
        setHistoryMode(!historyMode);
        setSelectedDocument(document);
      };
    
      // Функция для получения истории документа
      const getDocumentHistory = (document) => {
        // Ищем все документы, которые имеют тот же хеш, что и выбранный документ
        const hash = KJUR.crypto.Util.sha256(document.data);
        const history = documents.filter(
          (doc) => KJUR.crypto.Util.sha256(doc.data) === hash
        );
        return history;
      };
    
      return (
        <div className="home">
          <DocumentList documents={documents} onSelect={setSelectedDocument} />
          {selectedDocument ? (
            <>
              {signMode ? (
                <DocumentSign
                  document={selectedDocument}
                  onConfirm={handleSignDocument}
                />
              ) : historyMode ? (
                <DocumentHistory
                  document={selectedDocument}
                  history={getDocumentHistory(selectedDocument)}
                  onSelect={setSelectedDocument}
                />
              ) : (
                <DocumentView
                  document={selectedDocument}
                  onEdit={handleEditDocument}
                  onSign={toggleSignMode}
                />
              )}
              <button onClick={() => setSelectedDocument(null)}>
                Вернуться к списку документов
              </button>
            </>
          ) : (
            <DocumentForm template={templateBytes} onSubmit={handleCreateDocument} />
          )}
        </div>
      );
    };
    
    export default Home;
    