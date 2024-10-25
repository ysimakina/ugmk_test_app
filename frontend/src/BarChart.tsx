import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  factory_id: number;
  date: string;
  product1: number;
  product2: number;
}

interface MonthlyData {
  month: string;
  factoryA: number;
  factoryB: number;
  monthIndex: number;
}

interface ActivePayload {
  name: string;
  payload: {
    monthIndex: number;
  };
}

interface BarClickData {
  activePayload?: ActivePayload[];
}

enum ProductFilter {
  all = 'all',
  product1 = 'product1',
  product2 = 'product2',
}

const MonthlyProductionChart = () => {
  const [data, setData] = useState<Product[]>([]);
  const [filter, setFilter] = useState<ProductFilter>(ProductFilter.all);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const processData = (products: Product[]) => {
    const monthlyData: Record<number, MonthlyData> = {};

    products.forEach((product) => {
      const date = new Date(product.date);
      const monthIndex = date.getMonth() + 1;
      if (isNaN(monthIndex)) return;

      if (!monthlyData[monthIndex]) {
        monthlyData[monthIndex] = {
          month: date.toLocaleString('default', { month: 'short' }),
          factoryA: 0,
          factoryB: 0,
          monthIndex,
        };
      }

      if (filter !== 'all') {
        if (product.factory_id === 1) {
          monthlyData[monthIndex].factoryA += product[filter];
        } else if (product.factory_id === 2) {
          monthlyData[monthIndex].factoryB += product[filter];
        }
      } else {
        const productValue = product.product1 + product.product2;

        if (product.factory_id === 1) {
          monthlyData[monthIndex].factoryA += productValue;
        } else if (product.factory_id === 2) {
          monthlyData[monthIndex].factoryB += productValue;
        }
      }
    });

    return Object.values(monthlyData).sort(
      (a, b) => a.monthIndex - b.monthIndex
    );
  };

  const formattedData = processData(data);

  const handleBarClick = (data: BarClickData, ...args: unknown[]) => {
    console.log(data);
    if (data.tooltipPayload) {
      const factoryId = data.tooltipPayload[0].name === 'Фабрика A' ? 1 : 2;
      const monthNumber = data.monthIndex;
      console.log(factoryId);
      navigate(`/details/${factoryId}/${monthNumber}`);
    }
  };

  const handeleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as ProductFilter);
    localStorage.setItem('filter', e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="productFilter">Фильтр по типу продукции </label>
        <select
          id="productFilter"
          value={localStorage.getItem('filter') ?? filter}
          onChange={handeleSelectChange}
        >
          <option value="all">Всё</option>
          <option value="product1">Продукт 1</option>
          <option value="product2">Продукт 2</option>
        </select>
      </div>

      <BarChart
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
        <Bar dataKey="factoryA" fill="#8884d8" name="Фабрика A" onClick={handleBarClick} />
        <Bar dataKey="factoryB" fill="#82ca9d" name="Фабрика B" onClick={handleBarClick} />
      </BarChart>
    </div>
  );
};

export default MonthlyProductionChart;
