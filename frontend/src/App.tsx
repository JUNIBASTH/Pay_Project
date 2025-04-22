
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import HistorialPlanilla from './pages/admin/HistorialPlanilla';
import CrearPlanilla from './pages/admin/CrearPlanilla';
import AgregarEmpleadosPlanilla from './pages/admin/AgregarEmpleadosPlanilla';



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

      {/* Solo admin puede acceder a Historial Planilla */}
      <Route path="/historial-planilla" element={
        <PrivateRoute role="admin">
          <HistorialPlanilla />
        </PrivateRoute>
      } />


      <Route path="/crear-planilla" element={
        <PrivateRoute role="admin">
          <CrearPlanilla />
        </PrivateRoute>
      } />



      <Route path="/agregar-empleados" element={
        <PrivateRoute role="admin">
          <AgregarEmpleadosPlanilla />
        </PrivateRoute>
      } />

      
      {/* Solo admin puede registrar usuarios */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App
