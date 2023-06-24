'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './LoginPage.css'; // Создайте новый файл стилей LoginPage.css

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://10.2.0.78:8000/api/user-credentials/');
      setUsers(response.data.credentials);
      console.log(response.data.credentials);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = users.find((user) => user.login === login && user.password === password);

    if (user) {
      if (user.role === true) {
        window.location.href = '/admin';
      } else {
        window.location.href = '/home';
      }
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Вход</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-container">
          {/* <label htmlFor="login" className="input-label">Логин</label> */}
          <input
            type="text"
            id="login"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            required
            className="input-field"
            placeholder='Login'
          />
        </div>
        <div className="input-container">
          {/* <label htmlFor="password" className="input-label">Пароль</label> */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="input-field"
            placeholder='Password'
          />
        </div>
        <button type="submit" className="login-button">Войти</button>
      </form>
    </div>
  );
}
