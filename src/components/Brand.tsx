import { ScanLine } from 'lucide-react';

export const Brand = () => (
  <span className="brand">
    <span className="brand-icon-wrapper" aria-hidden="true">
      <ScanLine size={18} strokeWidth={2.2} />
    </span>
    <span className="brand-name">
      DentVision<span className="brand-dot">®</span>
    </span>
  </span>
);
