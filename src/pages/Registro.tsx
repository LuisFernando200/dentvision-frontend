import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ScanLine,
  AlertCircle,
  X,
  Loader2,
  Sparkles
} from 'lucide-react';
import { registro } from '../services/registro';
import './Login.css';

export const Registro = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(true);

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden. Por favor verifícalas.');
      return;
    }

    if (!aceptaTerminos) {
      setError('Debes aceptar las condiciones de uso clínico y política de datos para continuar.');
      return;
    }

    setCargando(true);

    try {
      await registro(name, email, password);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : 'Error al registrar la cuenta. Es posible que el correo ya esté en uso.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="dv-auth-viewport">
      {/* ====================================================================
          PANEL IZQUIERDO: BENEFICIOS DE LA PLATAFORMA CLÍNICA
          ==================================================================== */}
      <section className="dv-showcase-panel" aria-label="Beneficios de unirse a DentVision">
        <div className="dv-grid-overlay" aria-hidden="true" />

        {/* Cabecera del showcase */}
        <div className="dv-showcase-header">
          <div className="dv-brand-container">
            <div className="dv-brand-icon-box" aria-hidden="true">
              <ScanLine size={22} strokeWidth={2} />
            </div>
            <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff' }}>
              DentVision
            </span>
          </div>
          <div className="dv-brand-badge">
            <span className="dv-brand-badge-dot" aria-hidden="true" />
            <span>Registro Clínico Profesional</span>
          </div>
        </div>

        {/* Contenido de valor clínico */}
        <div className="dv-showcase-content">
          <div className="dv-showcase-title-area">
            <h2>
              Lleva el diagnóstico de tu clínica al{' '}
              <span className="dv-gradient-text">siguiente nivel</span>.
            </h2>
            <p>
              Crea tu cuenta institucional o profesional y accede a herramientas de visión
              asistida diseñadas para optimizar tus tiempos de lectura radiográfica.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="dv-preview-card" style={{ padding: '18px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(56, 189, 248, 0.15)', borderRadius: '10px', padding: '10px', color: '#38bdf8' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: '#ffffff', marginBottom: '4px' }}>
                  Modelos de segmentación U-Net
                </strong>
                <span style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.5' }}>
                  Detecta caries oclusales, interproximales y patrones de sospecha en radiografías panorámicas con alta precisión.
                </span>
              </div>
            </div>

            <div className="dv-preview-card" style={{ padding: '18px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', borderRadius: '10px', padding: '10px', color: '#10b981' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: '#ffffff', marginBottom: '4px' }}>
                  Privacidad y resguardo médico
                </strong>
                <span style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.5' }}>
                  Tus estudios y datos de consulta protegidos mediante cifrado AES-256 de extremo a extremo.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pie del showcase */}
        <div className="dv-showcase-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
              ))}
            </div>
            <span style={{ fontSize: '12.5px', color: '#cbd5e1' }}>
              Utilizado por más de 1,400 odontólogos y clínicas en Latinoamérica y España.
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PANEL DERECHO: FORMULARIO DE REGISTRO CLÍNICO
          ==================================================================== */}
      <main className="dv-form-panel">
        <header className="dv-panel-top-nav">
          <Link to="/" className="dv-brand-logo" aria-label="Ir a página de inicio de DentVision">
            <div className="dv-brand-icon-box" aria-hidden="true">
              <ScanLine size={20} strokeWidth={2} />
            </div>
            <span>DentVision</span>
          </Link>

          <div className="dv-top-signup-link">
            <span>¿Ya tienes cuenta?</span>
            <Link to="/login">Iniciar sesión</Link>
          </div>
        </header>

        <div className="dv-form-wrapper">
          <div className="dv-form-header">
            <div className="dv-security-chip">
              <User size={14} aria-hidden="true" />
              <span>Nueva Cuenta Profesional</span>
            </div>
            <h1>Crear Cuenta Clínica</h1>
            <p>Completa tus datos profesionales para activar tu estación de trabajo.</p>
          </div>

          {error && (
            <div className="dv-alert-box" role="alert" aria-live="assertive">
              <AlertCircle size={18} aria-hidden="true" />
              <div style={{ flex: 1 }}>{error}</div>
              <button
                type="button"
                className="dv-alert-close"
                onClick={() => setError(null)}
                aria-label="Cerrar mensaje de error"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <form onSubmit={handleRegistro} noValidate>
            <div className="dv-form-group">
              <div className="dv-label-wrapper">
                <label htmlFor="reg-name">Nombre completo o nombre de la clínica</label>
              </div>
              <div className="dv-input-wrapper">
                <input
                  id="reg-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Dr. Carlos Mendoza / Clínica Dental Sur"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <User size={18} className="dv-input-icon" aria-hidden="true" />
              </div>
            </div>

            <div className="dv-form-group">
              <div className="dv-label-wrapper">
                <label htmlFor="reg-email">Correo electrónico profesional</label>
              </div>
              <div className="dv-input-wrapper">
                <input
                  id="reg-email"
                  type="email"
                  autoComplete="email"
                  placeholder="doctor@clinica.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail size={18} className="dv-input-icon" aria-hidden="true" />
              </div>
            </div>

            <div className="dv-form-group">
              <div className="dv-label-wrapper">
                <label htmlFor="reg-password">Contraseña (mínimo 6 caracteres)</label>
              </div>
              <div className="dv-input-wrapper">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Crea una contraseña segura"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock size={18} className="dv-input-icon" aria-hidden="true" />
                <button
                  type="button"
                  className="dv-toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña en texto claro'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="dv-form-group">
              <div className="dv-label-wrapper">
                <label htmlFor="reg-confirm-password">Confirmar contraseña</label>
                {confirmarPassword && password === confirmarPassword && (
                  <span style={{ fontSize: '11.5px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} /> Coinciden
                  </span>
                )}
              </div>
              <div className="dv-input-wrapper">
                <input
                  id="reg-confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Repite tu contraseña"
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)}
                  required
                />
                <Lock size={18} className="dv-input-icon" aria-hidden="true" />
                <button
                  type="button"
                  className="dv-toggle-password-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? 'Ocultar confirmación' : 'Ver confirmación en texto claro'}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="dv-form-options">
              <label className="dv-checkbox-label">
                <input
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                />
                <span style={{ fontSize: '12.5px', lineHeight: '1.4' }}>
                  Acepto los términos de uso clínico y política de confidencialidad de datos.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="dv-submit-btn"
              disabled={cargando || !name || !email || !password || !confirmarPassword}
            >
              {cargando ? (
                <>
                  <Loader2 size={18} className="dv-spinner" aria-hidden="true" />
                  <span>Creando tu cuenta profesional…</span>
                </>
              ) : (
                <>
                  <span>Registrar Cuenta Profesional</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </div>

        <footer className="dv-panel-footer">
          <span>© 2026 DentVision Inc. Todos los derechos reservados.</span>
          <div className="dv-footer-links">
            <Link to="/login">¿Ya tienes cuenta? Accede aquí</Link>
          </div>
        </footer>
      </main>
    </div>
  );
};
