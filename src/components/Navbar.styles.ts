import React from 'react';

export const colors = {
  bgNavbar: '#FFFFFF',
  primary: '#0052CC',
  textMain: '#0F172A',
  textMuted: '#64748B',
  logoutBg: '#FEE2E2',
  logoutText: '#DC2626',
};

export const navbarStyles: Record<string, React.CSSProperties> = {
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.bgNavbar,
    padding: '20px 30px',
    border: 'none',
    borderBottom: 'none',
    margin: 0,
    width: '100%',
    boxSizing: 'border-box',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoImage: {
    height: '40px',
    width: 'auto',
    borderRadius: '6px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 700,
    color: colors.primary,
  },
  menuContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  navLink: {
    background: 'none',
    border: 'none',
    color: colors.textMuted,
    fontSize: '17px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  navLinkActive: {
    background: 'none',
    border: 'none',
    color: colors.primary,
    fontSize: '17px',
    fontWeight: 700,
    cursor: 'pointer',
    paddingBottom: '4px',
  },
  logoutBtn: {
    backgroundColor: colors.logoutBg,
    color: colors.logoutText,
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '17px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};