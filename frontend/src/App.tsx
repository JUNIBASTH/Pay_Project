
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Solo admin puede acceder a Dashboard */}
      <Route path="/dashboard" element={
        <PrivateRoute role="admin">
          <Dashboard />
        </PrivateRoute>
      } />

      {/* Solo admin puede registrar usuarios */}
      <Route path="/register" element={
        <PrivateRoute role="admin">
          <Register />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App
