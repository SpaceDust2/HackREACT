'use client'
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await axios.get('http://10.2.0.78:8000/api/user-credentials/');
      this.setState({ data: response.data, loading: false });
      console.log(response);
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };
  

  render() {
    const { data, loading, error } = this.state;
    return (
      <div>
        <h1>Страница на jsx next.js</h1>
        {loading && <p>Загрузка данных...</p>}
        {error && <p>Ошибка: {error}</p>}
        {data.length > 0 && (
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
