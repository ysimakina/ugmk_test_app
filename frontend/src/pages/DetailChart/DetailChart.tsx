import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Cell, Legend, Pie, PieChart } from 'recharts';

import { fetchDetailsFactoryData } from '../../api';
import { months } from '../../constants';
import { FactoryData } from '../../types';

const getPieData = (factoryData: FactoryData) => [
  { name: 'Продукт 1', value: factoryData.product1 },
  { name: 'Продукт 2', value: factoryData.product2 },
];

const DetailChart = () => {
  const { factoryId, monthNumber } = useParams();
  const [factoryData, setFactoryData] = useState<FactoryData | null>(null);

  useEffect(() => {
    (() => {
      if (factoryId && monthNumber) {
        return fetchDetailsFactoryData(factoryId, monthNumber)
          .then(setFactoryData)
          .catch((error) =>
            console.error('Ошибка при получении данных:', error)
          );
      }
    })();
  }, [factoryId, monthNumber]);
  
  if (!factoryData) {
    return <p>Загрузка...</p>;
  }
  
  const pieData = getPieData(factoryData);

  return (
    <div className="page">
      <h2>
        Статистика по продукции фабрики {factoryId === '1' ? 'A' : 'B'} в месяце{' '}
        {months[Number(monthNumber) - 1]}
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
