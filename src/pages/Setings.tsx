import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navarbar';
import { styles } from './Setings.styles';
import { obtenerPerfil, actualizarPerfil } from '../services/profile';

export const Settings = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    obtenerPerfil()
      .then((perfil) => {
        setNombre(perfil.name);
        setCorreo(perfil.email);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (passwordNueva && !passwordActual) {
      setError('Debes ingresar tu contraseña actual para cambiarla');
      return;
    }

    setGuardando(true);

    try {
      await actualizarPerfil({
        name: nombre,
        email: correo,
        ...(passwordNueva && {
          current_password: passwordActual,
          new_password: passwordNueva,
        }),
      });

      setSavedMessage(true);
      setPasswordActual('');
      setPasswordNueva('');
      setTimeout(() => setSavedMessage(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <div style={styles.pageContainer}>
        <Navbar />
        <main style={styles.contentContainer}>
          <p>Cargando perfil...</p>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <Navbar />

      <main style={styles.contentContainer}>
        <div style={styles.headerSection}>
          <h1 style={styles.title}>Configuraciones de Usuario</h1>
          <p style={styles.subtitle}>
            Ajusta tu nombre, correo y contraseña.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Perfil de Usuario</h2>
            <div style={styles.gridTwoColumns}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre Completo</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Correo Electrónico</label>
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Cambiar Contraseña</h2>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>
              Deja estos campos vacíos si no quieres cambiar tu contraseña.
            </p>
            <div style={styles.gridTwoColumns}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Contraseña Actual</label>
                <input
                  type="password"
                  value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)}
                  style={styles.input}
                  autoComplete="current-password"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contraseña Nueva</label>
                <input
                  type="password"
                  value={passwordNueva}
                  onChange={(e) => setPasswordNueva(e.target.value)}
                  style={styles.input}
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>
            </div>
          </div>

          {error && <p style={{ color: '#e53e3e' }}>{error}</p>}

          <div style={styles.actionsContainer}>
            {savedMessage && (
              <span style={{ color: '#10B981', fontWeight: 600, alignSelf: 'center' }}>
                ✓ Cambios guardados correctamente
              </span>
            )}
            <button type="submit" style={styles.saveButton} disabled={guardando}>
              {guardando ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};