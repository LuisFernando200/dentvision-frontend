import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import {
  UploadCloud,
  FileCheck,
  Trash2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send
} from 'lucide-react';
import { Navbar } from '../components/Navarbar';
import { Footer } from '../components/Footer';
import { subirImagen } from '../services/imagenhelp';
import './HelpModels.css';

export const HelpModels = () => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [comentario, setComentario] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file) return;
    const formatosValidos = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!formatosValidos.includes(file.type)) {
      setError('Formato no válido. Por favor selecciona una radiografía en formato PNG o JPG.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('El archivo supera los 20 MB. Selecciona una imagen de menor tamaño.');
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setArchivo(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
      e.target.value = '';
    }
  };

  const handleDiscard = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setArchivo(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivo) {
      setError('Por favor selecciona o arrastra una radiografía antes de enviar.');
      return;
    }
    if (!comentario.trim()) {
      setError('Por favor describe la ubicación o el problema no detectado por el modelo.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await subirImagen(archivo, comentario.trim());
      setArchivo(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      setComentario('');
      setExito(true);
      setTimeout(() => setExito(false), 4500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar la imagen en el sistema.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hm-viewport">
      <Navbar />

      <main className="hm-main">
        {/* Cabecera */}
        <header className="hm-header">
          <div className="hm-badge">
            <Sparkles size={14} aria-hidden="true" />
            <span>Calibración Continua · DentVision IA</span>
          </div>
          <h1 className="hm-title">
            Ayudar al <em>Modelo de IA</em>
          </h1>
          <p className="hm-subtitle">
            Sube radiografías donde el modelo no haya detectado un problema o presente un hallazgo incorrecto.
            Tu retroalimentación fortalece el entrenamiento del sistema.
          </p>
        </header>

        {/* Estación de Trabajo (Workbench) */}
        <form className="hm-workbench" onSubmit={handleSubmit}>
          {/* Columna Izquierda: Carga del Estudio */}
          <div className="hm-upload-column">
            <div className="hm-section-title">
              <h3>Radiografía del caso</h3>
              <span className="hm-section-hint">PNG o JPG · Máx. 20 MB</span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              style={{ display: 'none' }}
              onChange={handleInputChange}
            />

            {!preview ? (
              <div
                className={`hm-dropzone ${isDragOver ? 'drag-active' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label="Arrastra una radiografía o haz clic para seleccionar"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
                }}
              >
                <div className="hm-dropzone-icon">
                  <UploadCloud size={28} strokeWidth={2} aria-hidden="true" />
                </div>
                <h4 className="hm-dropzone-title">Arrastra tu radiografía aquí</h4>
                <p className="hm-dropzone-desc">
                  O haz clic en este recuadro para seleccionar una imagen desde tu equipo.
                </p>
                <button
                  type="button"
                  className="hm-select-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Seleccionar imagen
                </button>
                <span className="file-hint-badge" style={{ marginTop: '14px', background: '#ffffff', color: '#64748b', borderColor: '#e2e8f0' }}>
                  Formatos: PNG o JPG · Máx. 20 MB
                </span>
              </div>
            ) : (
              <div className="hm-preview-container">
                <div className="hm-preview-header">
                  <span className="hm-file-pill">
                    <FileCheck size={14} color="#38bdf8" aria-hidden="true" />
                    {archivo?.name}
                  </span>
                  <span>{(archivo ? (archivo.size / (1024 * 1024)).toFixed(2) : 0)} MB</span>
                </div>
                <div className="hm-preview-image-box">
                  <img src={preview} alt="Vista previa del caso a subir" />
                </div>
                <div className="hm-preview-footer">
                  <button
                    type="button"
                    className="hm-discard-btn"
                    onClick={handleDiscard}
                  >
                    <Trash2 size={14} aria-hidden="true" />
                    Quitar imagen
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Columna Derecha: Observación y Envío */}
          <div className="hm-form-column">
            <div className="hm-section-title">
              <h3>Observaciones clínicas</h3>
            </div>

            <div className="hm-form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="hm-comentario" className="hm-form-label">
                Ubicación y problema no detectado por el modelo
              </label>
              <textarea
                id="hm-comentario"
                className="hm-textarea"
                style={{ flex: 1, minHeight: '180px' }}
                placeholder="Ejemplo: Caries en pieza dental 16 (molar superior derecho)"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                required
              />
              <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', lineHeight: '1.4' }}>
                Detalla la pieza dental afectada y el hallazgo omitido para orientar el ajuste del algoritmo.
              </span>
            </div>

            {error && (
              <div className="hm-alert-error" role="alert">
                <AlertCircle size={18} aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {exito && (
              <div className="hm-alert-success" role="status">
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Imagen subida correctamente. ¡Gracias por tu aporte!</span>
              </div>
            )}

            <button
              type="submit"
              className="hm-submit-btn"
              disabled={loading || !archivo || !comentario.trim()}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="hm-spinner" aria-hidden="true" />
                  <span>Subiendo imagen…</span>
                </>
              ) : (
                <>
                  <Send size={16} aria-hidden="true" />
                  <span>Subir imagen</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};