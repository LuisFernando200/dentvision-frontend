import { useEffect, useState } from 'react';
import {
  Download,
  Maximize2,
  Search,
  MessageSquare,
  Users,
  Image as ImageIcon,
  CheckCircle2,
  X,
  AlertCircle
} from 'lucide-react';
import { imageService, type ImagenFeedback } from '../services/imagenServices';

export const ImageList = () => {
  const [imagenes, setImagenes] = useState<ImagenFeedback[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [imagenModal, setImagenModal] = useState<ImagenFeedback | null>(null);

  useEffect(() => {
    cargarImagenes();
  }, []);

  const cargarImagenes = async () => {
    try {
      const data = await imageService.obtenerImagenes();
      setImagenes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el repositorio de radiografías');
    } finally {
      setCargando(false);
    }
  };

  const handleDescargar = async (imagen: ImagenFeedback) => {
    try {
      const url = `http://localhost:8000${imagen.url_img}`;
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      const nombreLimpio = imagen.usuario?.name ? imagen.usuario.name.replace(/\s+/g, '_') : 'doctor';
      a.download = `radiografia-${nombreLimpio}-caso_${imagen.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      alert('No se pudo descargar la imagen. Verifica la conexión con el servidor.');
    }
  };

  // Filtrado reactivo en tiempo real
  const imagenesFiltradas = imagenes.filter((img) => {
    const term = busqueda.toLowerCase().trim();
    if (!term) return true;
    const nombre = img.usuario?.name?.toLowerCase() || '';
    const email = img.usuario?.email?.toLowerCase() || '';
    const comentario = img.comentario?.toLowerCase() || '';
    const id = String(img.id);
    return nombre.includes(term) || email.includes(term) || comentario.includes(term) || id.includes(term);
  });

  // Cálculo de estadísticas
  const totalCasos = imagenes.length;
  const usuariosUnicos = new Set(imagenes.map((img) => img.usuario?.email)).size;

  if (cargando) {
    return (
      <div className="admin-cards-grid">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="admin-skeleton-card" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="hm-alert-error" style={{ margin: '20px 0', padding: '16px 20px' }}>
        <AlertCircle size={20} />
        <div>
          <strong>Error al consultar el repositorio:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Tarjetas de Estadísticas Rápidas */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper">
            <ImageIcon size={22} />
          </div>
          <div>
            <h3 className="admin-stat-number">{totalCasos}</h3>
            <p className="admin-stat-label">Radiografías Recibidas</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper" style={{ background: '#f0fdf4', color: '#16a34a' }}>
            <Users size={22} />
          </div>
          <div>
            <h3 className="admin-stat-number">{usuariosUnicos}</h3>
            <p className="admin-stat-label">Especialistas Contribuyentes</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper" style={{ background: '#faf5ff', color: '#9333ea' }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h3 className="admin-stat-number" style={{ fontSize: '18px', color: '#166534' }}>Activo</h3>
            <p className="admin-stat-label">Conexión con Base de Calibración</p>
          </div>
        </div>
      </div>

      {/* Barra de Herramientas: Buscador y Contador */}
      <div className="admin-toolbar">
        <div className="admin-search-wrapper">
          <Search size={18} className="admin-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="admin-search-input"
            placeholder="Buscar por especialista, correo o comentario clínico…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <span className="admin-counter-pill">
          {imagenesFiltradas.length} {imagenesFiltradas.length === 1 ? 'caso mostrado' : 'casos mostrados'}
        </span>
      </div>

      {/* Grid de Cards Clínicas */}
      {imagenesFiltradas.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <ImageIcon size={30} />
          </div>
          <h3 className="admin-empty-title">
            {busqueda ? 'No se encontraron casos que coincidan con la búsqueda' : 'No hay radiografías registradas aún'}
          </h3>
          <p className="admin-empty-desc">
            {busqueda
              ? 'Intenta con otro término de búsqueda o limpia el filtro para ver todo el historial.'
              : 'Cuando los odontólogos suban imágenes en la sección "Modelos IA", aparecerán organizadas en este panel.'}
          </p>
        </div>
      ) : (
        <div className="admin-cards-grid">
          {imagenesFiltradas.map((imagen) => {
            const inicial = imagen.usuario?.name ? imagen.usuario.name.charAt(0).toUpperCase() : 'D';
            return (
              <article key={imagen.id} className="admin-card">
                {/* Cabecera de la Card */}
                <div className="admin-card-header">
                  <div className="admin-user-info">
                    <div className="admin-user-avatar" title={imagen.usuario?.name}>
                      {inicial}
                    </div>
                    <div className="admin-user-text">
                      <h4 className="admin-user-name">{imagen.usuario?.name || 'Profesional no identificado'}</h4>
                      <p className="admin-user-email">{imagen.usuario?.email || 'Sin correo asociado'}</p>
                    </div>
                  </div>
                  <span className="admin-case-badge">#{String(imagen.id).padStart(3, '0')}</span>
                </div>

                {/* Área de la Imagen Radiográfica */}
                <div
                  className="admin-card-media"
                  onClick={() => setImagenModal(imagen)}
                  role="button"
                  tabIndex={0}
                  aria-label="Haz clic para inspeccionar en alta resolución"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setImagenModal(imagen);
                  }}
                >
                  <img
                    src={`http://localhost:8000${imagen.url_img}`}
                    alt={`Radiografía del caso ${imagen.id}`}
                    loading="lazy"
                  />
                  <div className="admin-card-media-overlay">
                    <Maximize2 size={16} />
                    <span>Ver en alta resolución</span>
                  </div>
                </div>

                {/* Contenido: Observación Clínica */}
                <div className="admin-card-body">
                  <div className="admin-observation-title">
                    <MessageSquare size={13} color="#0284c7" />
                    <span>Observación del profesional:</span>
                  </div>
                  <div className="admin-observation-box">
                    {imagen.comentario || 'Sin observaciones adicionales registradas.'}
                  </div>
                </div>

                {/* Pie de Acciones */}
                <div className="admin-card-footer">
                  <button
                    type="button"
                    className="admin-download-btn"
                    onClick={() => handleDescargar(imagen)}
                  >
                    <Download size={15} />
                    <span>Descargar radiografía</span>
                  </button>

                  <button
                    type="button"
                    className="admin-preview-btn"
                    onClick={() => setImagenModal(imagen)}
                    title="Inspeccionar en grande"
                    aria-label="Inspeccionar en grande"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Modal Lightbox para Inspección en Detalle */}
      {imagenModal && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setImagenModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <span id="modal-title" style={{ fontWeight: 700, fontSize: '15px' }}>
                Estudio Radiográfico #{String(imagenModal.id).padStart(3, '0')} — {imagenModal.usuario?.name}
              </span>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setImagenModal(null)}
                aria-label="Cerrar visor"
              >
                <X size={20} />
              </button>
            </div>
            <div className="admin-modal-body">
              <img
                src={`http://localhost:8000${imagenModal.url_img}`}
                alt={`Radiografía caso ${imagenModal.id}`}
              />
            </div>
            <div style={{ padding: '14px 24px', background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                <strong>Observación:</strong> {imagenModal.comentario}
              </span>
              <button
                type="button"
                className="admin-download-btn"
                style={{ width: 'auto', padding: '8px 20px', minHeight: '38px' }}
                onClick={() => handleDescargar(imagenModal)}
              >
                <Download size={15} />
                <span>Descargar archivo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};