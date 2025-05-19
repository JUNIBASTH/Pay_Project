
import './App.css'
//import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import HistorialPlanilla from './pages/admin/HistorialPlanilla';
import CrearPlanilla from './pages/admin/CrearPlanilla';
import AgregarEmpleadosPlanilla from './pages/admin/AgregarEmpleadosPlanilla';
import VistaEmpleados from './pages/admin/VistaEmpleados';
import EditarEmpleado from './pages/admin/EditarEmpleado';
import Planillas from './pages/admin/Planillas';
import DetallePlanilla from './pages/admin/DetallePlanilla';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
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

      <Route path="/empleados" element={
        <PrivateRoute role="admin">
          <VistaEmpleados />
        </PrivateRoute>
      } />
      
      <Route path="/editar-empleado/:id" element={
        <EditarEmpleado />} />

      <Route path="/detalle-planilla/:id" element={<DetallePlanilla />} />
      
      <Route path="/planillas" element={<Planillas />} /> 

      <Route path="/register" element={<Register />} />
    </Routes>

    
  );
}

export default App
