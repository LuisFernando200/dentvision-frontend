import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
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
import { login } from '../services/auth';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.access_token);
      if (rememberMe) {
        localStorage.setItem('dv_remember_email', email);
      } else {
        localStorage.removeItem('dv_remember_email');
      }
      navigate('/home');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Credenciales inválidas. Verifica tu correo y contraseña e intenta nuevamente.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="dv-auth-viewport">
      {/* ====================================================================
          PANEL IZQUIERDO: SHOWCASE CLÍNICO PROFESIONAL
          ==================================================================== */}
      <section className="dv-showcase-panel" aria-label="Información de la plataforma DentVision">
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
            <span>Sistema Clínico Activo v2.4</span>
          </div>
        </div>

        {/* Demostración y propuesta de valor */}
        <div className="dv-showcase-content">
          <div className="dv-showcase-title-area">
            <h2>
              Diagnóstico radiográfico dental con{' '}
              <span className="dv-gradient-text">precisión asistida</span>.
            </h2>
            <p>
              Plataforma para odontólogos, radiólogos y especialistas maxilofaciales.
              Optimiza la detección temprana de patologías y caries con análisis de imagen de alta fidelidad.
            </p>
          </div>

          {/* Tarjeta de previsualización radiográfica clínica */}
          <div className="dv-preview-card">
            <div className="dv-preview-topbar">
              <div className="dv-preview-status">
                <Sparkles size={15} aria-hidden="true" />
                <span>Estación de Trabajo · Panorámica Digital</span>
              </div>
              <span className="dv-preview-tag">Visión IA Asistida</span>
            </div>

            <div className="dv-preview-image-container">
              <img
                src="/radiografia.png"
                alt="Vista previa de radiografía panorámica en software de análisis clínico"
              />
              <div className="dv-ai-indicator dv-indicator-caries" aria-hidden="true">
                <span className="dv-indicator-label">Caries Oclusal 98.4%</span>
              </div>
            </div>

            <div className="dv-preview-footer">
              <div className="dv-preview-pills">
                <span className="dv-pill">
                  <CheckCircle2 size={13} aria-hidden="true" />
                  Detección multizona
                </span>
                <span className="dv-pill">
                  <CheckCircle2 size={13} aria-hidden="true" />
                  Soporte HD
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Filtro de contraste adaptativo</span>
            </div>
          </div>
        </div>

        {/* Pie del showcase con testimonio de confianza profesional */}
        <div className="dv-showcase-footer">
          <p className="dv-trust-quote">
            “DentVision nos permite una revisión radiográfica ágil y una explicación visual
            mucho más clara y transparente con cada paciente en consulta.”
          </p>
          <div className="dv-trust-author">
            <ShieldCheck size={16} color="#38bdf8" aria-hidden="true" />
            <span>
              <strong>Dr. Javier Morales</strong> — Especialista en Rehabilitación Oral y Diagnóstico
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PANEL DERECHO: FORMULARIO DE INICIO DE SESIÓN PROFESIONAL
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
            <span>¿Nuevo profesional?</span>
            <Link to="/registro">Crear cuenta</Link>
          </div>
        </header>

        <div className="dv-form-wrapper">
          <div className="dv-form-header">
            <div className="dv-security-chip">
              <ShieldCheck size={14} aria-hidden="true" />
              <span>Portal de Acceso Clínico</span>
            </div>
            <h1>Bienvenido de nuevo</h1>
            <p>Ingresa tus credenciales profesionales para acceder a tu estación de trabajo.</p>
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

          <form onSubmit={handleLogin} noValidate>
            <div className="dv-form-group">
              <div className="dv-label-wrapper">
                <label htmlFor="dv-email">Correo electrónico profesional</label>
              </div>
              <div className="dv-input-wrapper">
                <input
                  id="dv-email"
                  type="email"
                  autoComplete="username"
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
                <label htmlFor="dv-password">Contraseña</label>
                <button
                  type="button"
                  className="dv-forgot-password-link"
                  onClick={() => setShowForgotModal(true)}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="dv-input-wrapper">
                <input
                  id="dv-password"
                  type={visible ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock size={18} className="dv-input-icon" aria-hidden="true" />
                <button
                  type="button"
                  className="dv-toggle-password-btn"
                  onClick={() => setVisible(!visible)}
                  aria-label={visible ? 'Ocultar contraseña' : 'Ver contraseña en texto claro'}
                  tabIndex={0}
                >
                  {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="dv-form-options">
              <label className="dv-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Recordar sesión en este equipo</span>
              </label>
            </div>

            <button
              type="submit"
              className="dv-submit-btn"
              disabled={cargando || !email || !password}
            >
              {cargando ? (
                <>
                  <Loader2 size={18} className="dv-spinner" aria-hidden="true" />
                  <span>Verificando credenciales…</span>
                </>
              ) : (
                <>
                  <span>Iniciar sesión en DentVision</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </div>

        <footer className="dv-panel-footer">
          <span>© 2026 DentVision Inc. Todos los derechos reservados.</span>
          <div className="dv-footer-links">
            <button
              type="button"
              onClick={() => alert('Plataforma certificada con protocolos de cifrado AES-256 para resguardo de historias y estudios radiográficos.')}
            >
              Seguridad y Privacidad
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => alert('Centro de soporte clínico: Para asistencia técnica, contacta a soporte@dentvision.com o comunícate con el administrador de tu clínica.')}
            >
              Soporte
            </button>
          </div>
        </footer>
      </main>

      {/* Modal accesible de recuperación de contraseña */}
      {showForgotModal && (
        <div
          className="dv-info-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgot-title"
          onClick={() => setShowForgotModal(false)}
        >
          <div className="dv-info-modal" onClick={(e) => e.stopPropagation()}>
            <h3 id="forgot-title">Restablecimiento de credenciales</h3>
            <p>
              Por motivos de seguridad de datos clínicos de pacientes, el restablecimiento de contraseñas
              debe ser autorizado por el administrador de tu centro odontológico o a través de nuestro
              correo de soporte técnico:
            </p>
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '12px 14px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '13.5px',
              color: '#0369a1',
              fontWeight: 600
            }}>
              soporte@dentvision.com
            </div>
            <button
              type="button"
              className="dv-info-modal-btn"
              onClick={() => setShowForgotModal(false)}
            >
              Entendido, volver al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
