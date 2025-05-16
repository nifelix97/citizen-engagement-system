import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComplaintForm from './components/ComplaintForm';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComplaintForm />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;

