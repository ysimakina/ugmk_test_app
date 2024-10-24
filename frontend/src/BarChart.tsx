import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Product {
  id: number; 
  factory_id: number; 
  date: string; 
  product1: number; 
  product2: number; 
  product3: number;
}

interface MonthlyData {
  month: string; 
  factoryA: number; 
  factoryB: number; 
}

const MonthlyProductionChart = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setData(response.data.products);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const processData = (products: Product[]) => {
    const monthlyData: Record<number, MonthlyData> = {};
    
    products.forEach(product => {
      const date = new Date(product.date);
     
      const monthIndex = date.getMonth();
      if(isNaN(monthIndex)) return;

      if (!monthlyData[monthIndex]) {
        monthlyData[monthIndex] = {
          month: date.toLocaleString('default', { month: 'short' }), 
          factoryA: 0,
          factoryB: 0
        };
      }
      
      monthlyData[monthIndex].factoryA += product.product1; 
      monthlyData[monthIndex].factoryB += product.product2;
      
      
    });

    return Object.values(monthlyData).sort((a, b) => {
      return new Date(a.month).getMonth() - new Date(b.month).getMonth();
    });
  };

  const formattedData = processData(data);

  return (
    <BarChart
      width={800}
      height={400}
      data={formattedData}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="factoryA" fill="#8884d8" name="Фабрика A" />
      <Bar dataKey="factoryB" fill="#82ca9d" name="Фабрика B" />
    </BarChart>
  );
};

export default MonthlyProductionChart;
