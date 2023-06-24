'use client'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const WineryStats = () => {
  const data = [
    { month: 'Янв', sales: 2400, visitors: 400, products: 800 },
    { month: 'Фев', sales: 1398, visitors: 300, products: 600 },
    { month: 'Мар', sales: 9800, visitors: 200, products: 1100 },
    { month: 'Апр', sales: 3908, visitors: 278, products: 800 },
    { month: 'Май', sales: 4800, visitors: 189, products: 1000 },
    { month: 'Июн', sales: 3800, visitors: 239, products: 900 },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ marginRight: '20px', marginBottom: '20px' }}>
        <h2>Продажи</h2>
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        </LineChart>
      </div>

      <div style={{ marginRight: '20px', marginBottom: '20px' }}>
        <h2>Посетители</h2>
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Bar dataKey="visitors" fill="#8884d8" />
        </BarChart>
      </div>

      <div style={{ marginRight: '20px', marginBottom: '20px' }}>
        <h2>Продукты</h2>
        <PieChart width={500} height={300}>
          <Pie dataKey="products" data={data} cx={200} cy={150} outerRadius={60} fill="#8884d8" label />
          <Tooltip />
        </PieChart>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Общая статистика</h2>
        <AreaChart width={500} height={300} data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Area type="monotone" dataKey="sales" fill="#8884d8" stroke="#8884d8" />
          <Area type="monotone" dataKey="visitors" fill="#82ca9d" stroke="#82ca9d" />
          <Area type="monotone" dataKey="products" fill="#ffc658" stroke="#ffc658" />
        </AreaChart>
      </div>
    </div>
  );
};

export default WineryStats;
