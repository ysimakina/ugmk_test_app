import BarChart from './pages/MonthlyProductionChart/MonthlyProductionChart';
import { Routes, Route } from 'react-router-dom'; 
import DetailChart from './pages/DetailChart/DetailChart';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BarChart />} />
      <Route path="/details/:factoryId/:monthNumber" element={<DetailChart />} />
    </Routes>
  );
};
export default App;
