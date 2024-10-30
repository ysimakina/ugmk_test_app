import './MonthlyProductionChart.css';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { fetchFactoriesData } from '../../api';
import SelectProduct from '../../components/SelectProduct';
import { FILTER } from '../../constants';
import { FactoryData, ProductFilter } from '../../types';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../../utils/localStorageUtils';

interface MonthlyData {
  month: string;
  factoryA: number;
  factoryB: number;
  monthIndex: number;
}

type FactoryName = {
  name: 'Фабрика A' | 'Фабрика Б';
};

interface TooltipPayload {
  tooltipPayload: FactoryName[];
  monthIndex: number;
}

const MonthlyProductionChart = () => {
  const [data, setData] = useState<FactoryData[]>([]);
  const [filter, setFilter] = useState(
    () => getItemFromLocalStorage(FILTER) as ProductFilter ?? ProductFilter.all
  );
  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      return fetchFactoriesData()
        .then(setData)
        .catch((error) => console.error('Ошибка при получении данных:', error));
    })();
  }, []);

  const processData = useCallback(
    (products: FactoryData[]) => {
      const monthlyData: Record<number, MonthlyData> = {};

      products.forEach((product) => {
        const date = new Date(product.date);
        const monthIndex = date.getMonth() + 1;
        if (!Number.isFinite(monthIndex)) return;

        if (!monthlyData[monthIndex]) {
          monthlyData[monthIndex] = {
            month: date.toLocaleString('default', { month: 'short' }),
            factoryA: 0,
            factoryB: 0,
            monthIndex,
          };
        }

        const productValue =
          filter !== ProductFilter.all
            ? product[filter]
            : product.product1 + product.product2;

        switch (product.factory_id) {
          case 1:
            monthlyData[monthIndex].factoryA += productValue;
            break;
          case 2:
            monthlyData[monthIndex].factoryB += productValue;
            break;
          default:
            break;
        }
      });

      return Object.values(monthlyData).sort(
        (a, b) => a.monthIndex - b.monthIndex
      );
    },
    [filter]
  );

  const formattedData = processData(data);

  const handleBarClick = (data: TooltipPayload) => {
    if (data.tooltipPayload) {
      const factoryId = data.tooltipPayload[0].name === 'Фабрика A' ? 1 : 2;
      const monthNumber = data.monthIndex;
      navigate(`/details/${factoryId}/${monthNumber}`);
    }
  };

  const handeleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as ProductFilter);
    setItemInLocalStorage(FILTER, e.target.value);
  };

  return (
    <div className="bar-chart">
      <SelectProduct
        filter={filter as ProductFilter}
        handeleSelectChange={handeleSelectChange}
      />
      <BarChart
        className="bar-chart__wrapper"
        width={800}
        height={400}
        data={formattedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `${value}т`} />
        <Legend />
        <Bar
          dataKey="factoryA"
          fill="#ff0000"
          name="Фабрика A"
          onClick={handleBarClick}
        />
        <Bar
          dataKey="factoryB"
          fill="#2200ff"
          name="Фабрика B"
          onClick={handleBarClick}
        />
      </BarChart>
    </div>
  );
};

export default MonthlyProductionChart;
