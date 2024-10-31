import { Route, Routes } from 'react-router-dom';

import DetailChart from './pages/DetailChart/DetailChart';
import BarChart from './pages/MonthlyProductionChart/MonthlyProductionChart';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BarChart />} />
      <Route
        path="/details/:factoryId/:monthNumber"
        element={<DetailChart />}
      />
    </Routes>
  );
};

export default App;
