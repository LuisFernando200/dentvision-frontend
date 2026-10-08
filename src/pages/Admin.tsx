import { ShieldCheck } from 'lucide-react';
import { Navbar } from '../components/Navarbar';
import { Footer } from '../components/Footer';
import { ImageList } from '../components/ImagenList';
import './Admin.css';

export const Admin = () => {
  return (
    <div className="admin-viewport">
      <Navbar />

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-badge">
            <span className="admin-badge-dot" aria-hidden="true" />
            <ShieldCheck size={14} aria-hidden="true" />
            <span>Módulo de Control y Auditoría · Administrador</span>
          </div>
          <h1 className="admin-title">
            Radiografías y <em>Casos de Calibración</em>
          </h1>
          <p className="admin-subtitle">
            Explora las radiografías recibidas para el reentrenamiento del modelo. Inspecciona en alta resolución,
            revisa las observaciones diagnósticas de cada especialista y descarga los estudios clínicos.
          </p>
        </header>

        <ImageList />
      </main>

      <Footer />
    </div>
  );
};