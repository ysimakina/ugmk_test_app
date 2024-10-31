import { ChangeEvent, memo } from 'react';

import { ProductFilter } from '../types';

type SelectProductProps = {
  filter: ProductFilter;
  handeleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectProduct = ({filter, handeleSelectChange}: SelectProductProps) => {
  return (
    <div className="filter-bar bar-chart__wrapper">
      <label htmlFor="productFilter">Фильтр по типу продукции</label>
      <select
        id="productFilter"
        value={filter}
        onChange={handeleSelectChange}
      >
        <option value="all">Все продукты</option>
        <option value="product1">Продукт 1</option>
        <option value="product2">Продукт 2</option>
      </select>
    </div>
  );

};

export default memo(SelectProduct);
