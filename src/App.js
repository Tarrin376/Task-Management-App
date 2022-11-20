import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import './App.css';
import Theme from './Wrappers/Theme';

function App() {
  return (
    <Theme>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Theme>
  );
}

export default App;
