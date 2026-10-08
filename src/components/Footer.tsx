import { ShieldCheck, Activity } from 'lucide-react';

export const Footer = () => (
  <footer className="atlas-footer">
    <div className="footer-left">
      <span className="footer-suite-name">
        <Activity size={14} aria-hidden="true" />
        DentVision Clinical Suite
      </span>
      <p className="footer-disclaimer">
        Herramienta de asistencia diagnóstica digital. La interpretación final de los estudios corresponde exclusivamente al profesional odontológico colegiado.
      </p>
    </div>
    <div className="footer-right">
      <span className="footer-compliance">
        <ShieldCheck size={14} aria-hidden="true" />
        Cifrado AES-256
      </span>
      <span>© 2026 DentVision. Todos los derechos reservados.</span>
    </div>
  </footer>
);
