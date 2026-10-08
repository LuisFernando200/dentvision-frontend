import React from 'react';

// Paleta de colores
export const colors = {
  bgWindow: '#FFFFFF',
  bgPage: '#F4F7F6',
  primary: '#0077B6',
  primaryHover: '#0096C7',
  textMain: '#333333',
  textSecondary: '#666666',
  border: '#E0E0E0',
};

// Objeto con todos los estilos
export const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: colors.bgPage,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: colors.bgWindow,
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    border: `1px solid ${colors.border}`,
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    margin: '10px 0 10px 0',
    color: colors.primary,
    fontWeight: '600',
    fontSize: '24px',
  },
  subtitle: {
    margin: 0,
    color: colors.textSecondary,
    fontSize: '14px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: colors.textMain,
    fontWeight: '500',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
    fontSize: '16px',
    color: colors.textMain,
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop:'10px'
  },
  link: {
    color: colors.textSecondary,
    textDecoration: 'none',
    fontSize: '13px',
  },
};