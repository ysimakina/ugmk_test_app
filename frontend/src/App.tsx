import BarChart from './MonthlyProductionChart';
import { Routes, Route } from 'react-router-dom'; 
import DetailChart from './DetailChart';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BarChart />} />
      <Route path="/details/:factoryId/:monthNumber" element={<DetailChart />} />
    </Routes>
  );
};
export default App;
