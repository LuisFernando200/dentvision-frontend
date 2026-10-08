import React from 'react';

export const styles = {
  // Contenedor general para centrar el uploader en la pantalla
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 'auto',
    padding: '20px',
    boxSizing: 'border-box' as const,
  },

  // Área principal de carga (Drag & Drop)
  dropZone: (isDragOver: boolean): React.CSSProperties => ({
    position: 'relative', // 👈 ¡CLAVE N°1! Necesario para fijar elementos flotantes adentro sin que se salgan
    overflow: 'hidden',   // 👈 Evita que la imagen sobresalga de las esquinas redondeadas en pantallas chicas
    width: '1200px',
    maxWidth: '100%',
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    borderRadius: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    boxSizing: 'border-box' as const,
    
    backgroundColor: isDragOver ? '#E0F2FE' : '#EBF3FA',
    border: `3px dashed ${isDragOver ? '#00A3FF' : '#0052CC'}`,
    boxShadow: isDragOver 
      ? '0 20px 40px rgba(0, 163, 255, 0.25)' 
      : '0 10px 30px rgba(0, 52, 204, 0.08)',
  }),
  // Mensaje principal
  title: {
    color: '#0052CC',
    fontSize: '24px',
    fontWeight: '700',
    margin: '16px 0 8px 0',
    textAlign: 'center' as const,
    zIndex: 1, // Asegura que el texto siempre quede por ENCIMA de la imagen si se cruzan
  },

  // Subtexto instructivo
  subtitle: {
    color: '#334155',
    fontSize: '16px',
    margin: 0,
    textAlign: 'center' as const,
    zIndex: 1, // Asegura que el texto quede por encima
  },

  // Previsualización de la imagen cargada
  previewImage: {
    maxWidth: '100%',
    maxHeight: '450px',
    borderRadius: '16px',
    objectFit: 'contain' as const,
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    zIndex: 2,
  },
};