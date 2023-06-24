// components/PDFCanvas.js
'use client'
import React, { useEffect, useRef } from "react";
import { pdfjs } from "pdfjs-dist";

// Инициализация pdfjs для работы с PDF-файлами
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Компонент для отображения PDF-документа в canvas
const PDFCanvas = ({ file }) => {
  // Создаем ссылку на элемент canvas
  const canvasRef = useRef(null);

  // Используем эффект для рендеринга PDF-документа при изменении файла
  useEffect(() => {
    // Проверяем наличие файла и элемента canvas
    if (file && canvasRef.current) {
      // Получаем контекст рисования canvas
      const context = canvasRef.current.getContext("2d");
      // Очищаем canvas от предыдущего содержимого
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      // Загружаем PDF-документ из файла
      pdfjs.getDocument(file).promise.then((pdfDoc) => {
        // Получаем первую страницу документа
        pdfDoc.getPage(1).then((page) => {
          // Получаем масштаб для отображения страницы в canvas
          const viewport = page.getViewport({ scale: 1 });
          const scale = Math.min(
            canvasRef.current.width / viewport.width,
            canvasRef.current.height / viewport.height
          );
          // Устанавливаем размеры canvas по размерам страницы
          canvasRef.current.width = viewport.width * scale;
          canvasRef.current.height = viewport.height * scale;
          // Рендерим страницу в canvas
          page.render({
            canvasContext: context,
            viewport: page.getViewport({ scale }),
          });
        });
      });
    }
  }, [file]);

  return (
    <div className="pdf-canvas">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PDFCanvas;
