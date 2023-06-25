'use client'
import React, { useState } from 'react';
import { Table, Menu, Modal, Form, Input, Button, message } from 'antd';
import CryptoJS from 'crypto-js';
import { saveAs } from 'file-saver';

const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Дата создания',
    dataIndex: 'date',
    key: 'date',
  },
];

const data = [
  {
    key: '1',
    name: 'Договор на поставку',
    date: '01.01.2021',
    template: 'template1',
    text: 'Текст договора на поставку',
    signature: '',
    history: [
      {
        date: '01.01.2021',
        action: 'Создание документа',
      },
    ],
  },
  {
    key: '2',
    name: 'Акт приема-передачи',
    date: '02.01.2021',
    template: 'template2',
    text: 'Текст акта приема-передачи',
    signature: '',
    history: [
      {
        date: '02.01.2021',
        action: 'Создание документа',
      },
    ],
  },
];

const templates = [
  {
    key: 'template1',
    name: 'Договор на поставку',
    text: 'Текст договора на поставку',
  },
  {
    key: 'template2',
    name: 'Акт приема-передачи',
    text: 'Текст акта приема-передачи',
  },
  {
    key: 'template3',
    name: 'Счет-фактура',
    text: 'Текст счет-фактуры',
  },
  {
    key: 'template4',
    name: 'Доверенность',
    text: 'Текст доверенности',
  },
  {
    key: 'template5',
    name: 'Акт сверки',
    text: 'Текст акта сверки',
  },
];

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Templates = ({ document, onCreate }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const template = templates.find((t) => t.key === values.template);
      const newDocument = {
        key: String(data.length + 1),
        name: values.name,
        date: new Date().toLocaleDateString(),
        template: values.template,
        text: template.text.replace(/\{\{name\}\}/g, values.name),
        signature: '',
        history: [
          {
            date: new Date().toLocaleDateString(),
            action: 'Создание документа',
          },
        ],
      };
      data.push(newDocument);
      message.success('Документ успешно создан');
      onCreate(newDocument);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Не удалось создать документ');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Название документа"
        name="name"
        rules={[
          {
            required: true,
            message: 'Введите название документа!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Шаблон"
        name="template"
        rules={[
          {
            required: true,
            message: 'Выберите шаблон!',
          },
        ]}
      >
        <select>
          {templates.map((template) => (
            <option key={template.key} value={template.key}>
              {template.name}
            </option>
          ))}
        </select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

const DocumentModal = ({ document, visible, onClose, onCreate }) => {
    const [text, setText] = useState(document.text);
    const [signature, setSignature] = useState(document.signature);
  
    const handleTextChange = (event) => {
      setText(event.target.value);
    };
  
    const handleSignClick = () => {
      const secretKey = 'my-secret-key';
      const hash = CryptoJS.HmacSHA256(text, secretKey);
      const signature = hash.toString(CryptoJS.enc.Base64);
      setSignature(signature);
      document.signature = signature;
      document.history.push({
        date: new Date().toLocaleDateString(),
        action: 'Подписание документа',
      });
    };
  
    const handleCreateClick = () => {
      onCreate(document);
    };
  
    const handleDownloadClick = () => {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, `${document.name}.txt`);
    };
  
    const relatedDocuments = data.filter(
      (item) => item.template === document.template && item.key !== document.key
    );
  
    return (
      <Modal
        title={document.name}
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="create" type="primary" onClick={handleCreateClick}>
            Создать на основе
          </Button>,
          <Button key="sign" type="primary" onClick={handleSignClick}>
            Подписать
          </Button>,
          <Button key="download" onClick={handleDownloadClick}>
            Скачать
          </Button>,
          <Button key="close" onClick={onClose}>
            Закрыть
          </Button>,
        ]}
      >
        <Input.TextArea value={text} onChange={handleTextChange} />
        <Input value={signature} />
        <div>
          <h3>История документа</h3>
          {document.history.map((item, index) => (
            <div key={index}>
              <p>{item.date}</p>
              <p>{item.action}</p>
            </div>
          ))}
        </div>
        <div>
          <h3>Связанные документы</h3>
          {relatedDocuments.map((item) => (
            <p key={item.key}>{item.name}</p>
          ))}
        </div>
      </Modal>
    );
  };
  

const DocumentHistory = ({ document }) => {
    const relatedDocuments = data.filter(
      (item) => item.template === document.template && item.key !== document.key
    );
  
    return (
      <div>
        <h2>{document.name}</h2>
        <h3>История документа</h3>
        {document.history.map((item, index) => (
          <div key={index}>
            <p>{item.date}</p>
            <p>{item.action}</p>
          </div>
        ))}
        <div>
          <h3>Связанные документы</h3>
          {relatedDocuments.map((item) => (
            <p key={item.key}>{item.name}</p>
          ))}
        </div>
      </div>
    );
  };
  

const App = () => {
  const [page, setPage] = useState('documents');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentModalVisible, setDocumentModalVisible] = useState(false);

  const handleMenuClick = (event) => {
    setPage(event.key);
  };

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setDocumentModalVisible(true);
  };

  const handleDocumentModalClose = () => {
    setSelectedDocument(null);
    setDocumentModalVisible(false);
  };

  const handleCreateDocument = (document) => {
    setSelectedDocument(document);
    setDocumentModalVisible(false);
    setPage('templates');
  };
  const [filterDate, setFilterDate] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const renderPage = () => {
    let filteredData = data;
  
    // Фильтрация по дате
    if (filterDate) {
      filteredData = filteredData.filter((item) => item.date === filterDate);
    }
  
    // Поиск по словам
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filteredData = filteredData.filter((item) => {
        const name = item.name.toLowerCase();
        const text = item.text.toLowerCase();
        return name.includes(keyword) || text.includes(keyword);
      });
    }
  
    switch (page) {
      case 'documents':
        return (
          <>
            <div>
              Фильтр по дате:
              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
            <div>
              Поиск по словам:
              <Input.Search
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            <Table
              columns={columns}
              dataSource={filteredData}
              onRow={(record) => ({
                onClick: () => handleDocumentClick(record),
              })}
            />
          </>
        );
      case 'templates':
        return (
          <Templates
            document={selectedDocument}
            onCreate={handleCreateDocument}
          />
        );
      case 'document-history':
        return <DocumentHistory document={selectedDocument} />;
      default:
        return null;
    }
  };
  

  return (
    <>
      <Menu mode="horizontal" onClick={handleMenuClick}>
        <Menu.Item key="documents">Документы</Menu.Item>
        <Menu.Item key="templates">Шаблоны</Menu.Item>
      </Menu>
      {renderPage()}
      {selectedDocument && (
        <DocumentModal
        document={selectedDocument}
        visible={documentModalVisible}
        onClose={handleDocumentModalClose}
        onCreate={handleCreateDocument}
        />
        )}
        </>
        );
        };
        export default App;
        