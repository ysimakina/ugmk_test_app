import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const DetailChart = () => {
  const { factoryId, monthNumber } = useParams();
  const [data, setData] = useState<{
    product1: number;
    product2: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${factoryId}/${monthNumber}`
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
    <div>
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
          fill="#8884d8"
          label={(label) => `${label.value}т`}
          style={{ stroke: 'none' }}
        >
          {pieData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? '#8884d8' : '#82ca9d'}
            />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default DetailChart;
