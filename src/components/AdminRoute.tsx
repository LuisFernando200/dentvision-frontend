import { Navigate, Outlet } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

export const AdminRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/home" replace />; // no es admin, lo regresamos a home
  }

  return <Outlet />;
};