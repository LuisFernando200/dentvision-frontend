export const styles = {
  contenedor: {
    display: 'inline-block' as const,
    verticalAlign: 'top' as const,
    width: 'calc(33.333% - 13px)',
    margin: '20px 6px 24px',
    overflow: 'hidden' as const,
    borderRadius: 14,
    border: '1px solid #CBD5E1',
    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
    background: '#fff',
  },
  imagen: {
    display: 'block' as const,
    width: '100%',
    height: 'auto',
    objectFit: 'contain' as const,
  },
};