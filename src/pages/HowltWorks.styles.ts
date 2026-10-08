import React from 'react';

// Paleta con colores vivos y contrastados
export const colors = {
  bgWindow: '#FFFFFF',
  bgPage: '#F8FAFC',
  primary: '#0284C7',
  primaryHover: '#0369A1',
  primaryAccent: '#38BDF8',
  textMain: '#0F172A',
  textSecondary: '#475569',
  border: '#E2E8F0',
  badgeBg: '#F0F9FF',
};

export const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: colors.bgPage,
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: '0 0 60px 0',
    boxSizing: 'border-box',
    position: 'relative',
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  mainTitle: {
    margin: '0 0 20px 0',
    fontFamily: "'Inter', sans-serif",
    color: '#0F172A', // Azul pizarra oscuro y formal
    fontWeight: '800',
    fontSize: '52px', // Tamaño más equilibrado para el panel
    letterSpacing: '-0.025em', // Interletreado ajustado característico de Inter
    lineHeight: '1.2',
  },
  subtitle: {
    margin: '0 auto 30px auto',
    color: colors.textSecondary,
    fontSize: '20px',
    maxWidth: '900px',
    lineHeight: '1.6',
    fontWeight: '400',
  },
  techBadge: {
    display: 'flex',
    justifyContent: 'center', // Centra el contenido horizontalmente (puedes cambiarlo a 'space-between' o 'flex-start' si lo prefieres)
    alignItems: 'center',
    gap: '30px',
    width: '100%',
    backgroundColor: colors.bgWindow,
    borderBottom: `4px solid ${colors.bgWindow}`, // Pasa a ser un subrayado
    padding: '16px 28px',
    borderRadius: '0px', // Eliminamos los bordes redondeados para alinearse al ancho total
    boxShadow: 'none', // Quitamos la sombra flotante
    color: colors.textMain,
    fontSize: '20px',
    fontWeight: '600',
    boxSizing: 'border-box',
  },
  methodologySection: {
    maxWidth: '1600px', // Aumentado para dar mayor alcance a los cuadros en pantallas grandes
    margin: '0 auto',
    width: '100%',
  },
  sectionTitle: {
    textAlign: 'center',
    color: colors.textMain,
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '40px',
  },
  stepsGrid: {
    display: 'grid',
    // Fuerza exactamente 4 columnas iguales por fila
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '28px',
    alignItems: 'stretch',
  },
  stepCard: {
    backgroundColor: colors.bgWindow,
    border: `2px solid ${colors.border}`,
    borderRadius: '18px',
    padding: '28px', // Aumentado para que el contenido respire mejor
    boxShadow: '0 12px 30px rgba(0, 82, 204, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    boxSizing: 'border-box',
    minHeight: '420px', // Asegura una altura sólida y uniforme para las tarjetas
    position: 'relative', // 👈 Para asegurar que las imágenes internas se ubiquen bien
    overflow: 'hidden',
  },
  stepNumber: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: colors.primary,
    backgroundColor: colors.badgeBg,
    padding: '6px 16px',
    borderRadius: '20px',
    alignSelf: 'flex-start',
    marginBottom: '18px',
  },
  cardTitle: {
    margin: '0 0 12px 0',
    color: colors.textMain,
    fontSize: '22px',
    fontWeight: '700',
  },
  cardDescription: {
    color: colors.textSecondary,
    fontSize: '15px',
    lineHeight: '1.5',
    margin: '0 0 24px 0',
    flexGrow: 1,
  },
  cardImage: {
    width: '100%',
    aspectRatio: '16 / 9',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '12px',
    border: `1px solid ${colors.border}`,
  },
  cardImageContain: {
    width: '100%',
    height: '140px',
    display: 'block',
    borderRadius: '12px',
    border: `1px solid ${colors.border}`,
    backgroundColor: '#1E1E1E', // Opcional: Color de fondo oscuro (como VSCode) para que no se vea el borde
    objectFit: 'contain',
  },
  filaImagenes: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '100px',
    width: '100%',
  },
  saveButton: {
    color: colors.bgWindow,
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '14.5px',
  }, formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px',
  },
  label: {
  fontSize: '14px',
  fontWeight: '600',
  color: colors.textMain,
  marginBottom: '8px',
},
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14.5px',
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
    backgroundColor: '#FFFFFF',
    color: colors.textMain,
    outline: 'none',
    boxSizing: 'border-box',
    fontWeight: '400',
    marginBottom: '8px',
  },
  container: {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '900px',
  margin: '30px auto',
  padding: '24px 28px',
  border: `1px solid ${colors.border}`,
  borderRadius: '16px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.05)',
},

};