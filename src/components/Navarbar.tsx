import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, BookOpen, User, Cpu, ShieldCheck } from 'lucide-react';
import { isAdmin } from '../utils/auth';
import { Brand } from './Brand';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="atlas-nav">
      <Link to="/home" className="nav-brand-link" aria-label="DentVision, inicio">
        <Brand />
      </Link>
      <nav aria-label="Navegación principal">
        <NavLink to="/home" end>
          <LayoutDashboard size={15} aria-hidden="true" />
          <span>Estación de Diagnóstico</span>
        </NavLink>
        <NavLink to="/Como-funciona">
          <BookOpen size={15} aria-hidden="true" />
          <span>Metodología</span>
        </NavLink>
        <NavLink to="/config">
          <User size={15} aria-hidden="true" />
          <span>Mi Perfil</span>
        </NavLink>
        {isAdmin() && (
          <>
            <NavLink to="/helpmodel">
              <Cpu size={15} aria-hidden="true" />
              <span>Modelos IA</span>
            </NavLink>
            <NavLink to="/admin">
              <ShieldCheck size={15} aria-hidden="true" />
              <span>Administración</span>
            </NavLink>
          </>
        )}
      </nav>
      <button className="nav-logout-btn" onClick={handleLogout} aria-label="Cerrar sesión">
        <LogOut size={16} aria-hidden="true" />
        <span>Cerrar sesión</span>
      </button>
    </header>
  );
};
