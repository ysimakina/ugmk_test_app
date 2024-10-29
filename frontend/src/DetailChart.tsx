import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { months } from '../constants';

interface ProductData {
  product1: number;
  product2: number;
}

const DetailChart = () => {
  const { factoryId, monthNumber } = useParams();
  const [data, setData] = useState<ProductData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/${factoryId}/${monthNumber}`
        );
        setData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [factoryId, monthNumber]);

  if (!data) {
    return <p>Загрузка...</p>;
  }

  const pieData = [
    { name: 'Продукт 1', value: data.product1 },
    { name: 'Продукт 2', value: data.product2 },
  ];

  return (
    <div className="page">
      <h2>
        Статистика по продукции фабрики {Number(factoryId) === 1 ? 'A' : 'B'} в
        месяце {months[Number(monthNumber) - 1]}
      </h2>
      <PieChart width={800} height={400}>
        <Pie
          dataKey="value"
          data={pieData}
          cx={400}
          cy={200}
          outerRadius={150}
          fill="#84d88e"
          label={(label) => `${label.value}т`}
          style={{ stroke: 'none' }}
        >
          {pieData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? '#007f00' : '#fea500'}
            />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default DetailChart;
