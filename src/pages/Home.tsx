import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Upload, Download, RotateCcw, ScanLine, Sparkles, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/Navarbar';
import { Footer } from '../components/Footer';
import { analizarImagen, type ResultadoPredict } from '../services/predict';
import { ImagenCalor } from '../components/ImagenCalor';

export const Home = () => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoPredict | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [original, setOriginal] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const input = useRef<HTMLInputElement>(null);
  const requestId = useRef(0);

  useEffect(() => () => { requestId.current += 1; }, []);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  useEffect(() => () => { if (resultado) URL.revokeObjectURL(resultado.imagenUrl); }, [resultado]);

  const selectFile = (file?: File) => {
    if (!file || cargando) return;
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      setError('Formato no soportado. Selecciona una radiografía en formato PNG o JPG.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('El archivo supera los 20 MB. Selecciona una imagen de menor tamaño.');
      return;
    }
    setArchivo(file);
    setPreview(URL.createObjectURL(file));
    setResultado(null);
    setError(null);
    setOriginal(false);
    setBrightness(100);
  };

  const analyze = async () => {
    if (!archivo || cargando) return;
    const id = ++requestId.current;
    setCargando(true);
    setError(null);
    try {
      const data = await analizarImagen(archivo);
      if (id === requestId.current) {
        setResultado(data);
        setOriginal(false);
      } else {
        URL.revokeObjectURL(data.imagenUrl);
      }
    } catch (err) {
      if (id === requestId.current) {
        setError(err instanceof Error ? err.message : 'No se pudo completar el análisis. Por favor reintenta.');
      }
    } finally {
      if (id === requestId.current) setCargando(false);
    }
  };

  const reset = () => {
    setArchivo(null);
    setPreview(null);
    setResultado(null);
    setError(null);
    setOriginal(false);
    setBrightness(100);
    if (input.current) input.current.value = '';
  };

  const current = resultado ? 3 : archivo ? 2 : 1;

  return (
    <div className="atlas-page workspace-page">
      <Navbar />
      <main className="workspace">
        <div className="workspace-heading">

          <div>
            <p className="eyebrow">ESTACIÓN DE TRABAJO CLÍNICO</p>
            <h1>Diagnóstico <em>Radiográfico Asistido</em></h1>
          </div>
          <p>
            Visualiza, ajusta y analiza estudios radiográficos dentales con modelos
            de segmentación y detección computacional.
          </p>
        </div>
          <div  className="heat-row">
            <ImagenCalor direcction="/calor_caries.png" description="Mapa de calor de caries" />
            <ImagenCalor direcction="/muelas.png" description="Detección de muelas" />
            <ImagenCalor direcction="/infecciones.png" description="Mapa de calor de infecciones" />
          </div>
        <ol className="workflow" aria-label="Progreso del estudio clínico">
          {['1. Cargar radiografía', '2. Ajustar y visualizar', '3. Resultados asistidos'].map((s, i) => (
            <li
              key={s}
              className={current >= i + 1 ? 'reached' : ''}
              aria-current={current === i + 1 ? 'step' : undefined}
            >
              <span>0{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>

        <div className="reading-desk">
          <section className="lightbox" aria-label="Consola de visualización de radiografía" aria-busy={cargando}>
            <div className="viewer-bar">
              <span>
                <ScanLine size={16} aria-hidden="true" />
                {resultado && !original ? 'ANÁLISIS DEL MODELO IA' : 'ESTUDIO RADIOGRÁFICO ORIGINAL'}
              </span>
              <span>{archivo ? 'ESTUDIO ACTIVO' : 'SIN ARCHIVO'}</span>
              
            </div>
          

            <div
              className={'image-stage' + (drag ? ' drag-active' : '')}
              onDragOver={(e) => {
                e.preventDefault();
                if (!cargando) setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                selectFile(e.dataTransfer.files[0]);
              }}
            >
              {preview ? (
                <img
                  src={resultado && !original ? resultado.imagenUrl : preview}
                  alt={
                    resultado && !original
                      ? 'Radiografía procesada por el modelo de visión'
                      : 'Radiografía original seleccionada'
                  }
                  style={{ filter: 'brightness(' + brightness + '%)' }}
                />
              ) : (
                <div className="empty-viewer">
                  <div className="upload-cross">
                    <Upload size={28} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h2>Cargar radiografía para análisis</h2>
                  <p>
                    Arrastra tu archivo radiográfico aquí (panorámica o periapical)
                    o selecciónalo desde tu computadora.
                  </p>
                  <div className="upload-action-group">
                    <button
                      type="button"
                      className="select-radiography-btn"
                      onClick={() => input.current?.click()}
                    >
                      <Upload size={17} aria-hidden="true" />
                      <span>Seleccionar radiografía</span>
                      <ArrowRight size={17} aria-hidden="true" />
                    </button>
                    <span className="file-hint-badge">
                      Formatos soportados: PNG o JPG · Máx. 20 MB
                    </span>
                    
                  </div>
                  <div className="privacy-notice">


  <div>
    <strong>Privacidad de tus estudios</strong>
    <p>
      No ingreses información personal o identificable del paciente.
      La radiografía se utiliza únicamente para realizar el análisis
      y generar el resultado. Evita subir imágenes que contengan
      nombres, números de expediente u otros datos personales.
    </p>
  </div>
</div>
                </div>
                
              )}

              {cargando && (
                <div className="processing-banner" role="status">
                  <span className="pulse-dot" />
                  Procesando estudio con el modelo de visión computacional…
                </div>
              )}
            </div>

            <input
              ref={input}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              aria-label="Seleccionar radiografía dental"
              hidden
              disabled={cargando}
              onChange={(e) => {
                selectFile(e.target.files?.[0]);
                e.target.value = '';
              }}
            />

            <div className="viewer-controls">
              <div className="view-toggle" aria-label="Alternar vista de radiografía">
                <button
                  disabled={!preview}
                  aria-pressed={!resultado || original}
                  onClick={() => setOriginal(true)}
                >
                  Original
                </button>
                <button
                  disabled={!resultado}
                  aria-pressed={!!resultado && !original}
                  onClick={() => setOriginal(false)}
                >
                  Resultado IA
                </button>
              </div>
              <label className="brightness">
                Brillo{' '}
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={brightness}
                  disabled={!preview}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                />
                <output>{brightness}%</output>
              </label>
            </div>
          </section>

          <aside className="reading-notes" aria-label="Ficha de interpretación del estudio">
            <p className="eyebrow">FICHA CLÍNICA DE ANÁLISIS</p>
            <h2>{resultado ? 'Hallazgos detectados' : 'Preparar análisis'}</h2>
            <p>
              {resultado
                ? 'Contrasta la imagen original con las delimitaciones generadas por la IA.'
                : 'Carga una radiografía nítida para que el sistema procese posibles anomalías y caries.'}
            </p>

            <dl className="study-details">
              <div>
                <dt>Archivo</dt>
                <dd>{archivo?.name || 'Pendiente de cargar'}</dd>
              </div>
              <div>
                <dt>Estado de procesamiento</dt>
                <dd role="status">
                  {cargando
                    ? 'Analizando estudio…'
                    : resultado
                    ? 'Listo para validación clínica'
                    : archivo
                    ? 'Archivo listo para procesar'
                    : 'Esperando radiografía'}
                </dd>
              </div>
              {resultado && (
                <>
                  <div>
                    <dt>Interpretación del modelo</dt>
                    <dd>{resultado.diagnostico || 'Segmentación generada con éxito.'}</dd>
                  </div>
                  <div>
                    <dt>Nivel de confianza reportado</dt>
                    <dd style={{ color: '#0284c7' }}>
                      {resultado.porcentaje ? `${resultado.porcentaje}%` : 'Conforme a umbral clínico'}
                    </dd>
                  </div>
                </>
              )}
            </dl>

            {error && <p className="error-message" role="alert">{error}</p>}

            {!resultado ? (
              <button
                className="primary-button"
                disabled={!archivo || cargando}
                onClick={analyze}
                style={{ width: '100%', marginTop: '12px' }}
              >
                {cargando ? 'Procesando análisis…' : 'Analizar Radiografía'}
                <Sparkles size={18} aria-hidden="true" />
              </button>
            ) : (
              <a
                className="primary-button"
                href={resultado.imagenUrl}
                download="dentvision-diagnostico.png"
                style={{ width: '100%', marginTop: '12px' }}
              >
                Descargar Imagen Procesada
                <Download size={18} aria-hidden="true" />
              </a>
            )}

            {archivo && (
              <button
                className="text-button"
                disabled={cargando}
                onClick={reset}
                style={{ width: '100%', marginTop: '10px', justifyContent: 'center' }}
              >
                <RotateCcw size={15} aria-hidden="true" />
                Cargar otra radiografía
              </button>
            )}

            <div className="clinical-note">
              <span>
                <CheckCircle2 size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                Aviso de Responsabilidad Clínica
              </span>
              <p>
                Los hallazgos señalados por DentVision son herramientas de soporte diagnóstico y deben
                ser correlacionados con la exploración clínica del paciente.
              </p>
            </div>
          </aside>
        </div>
<section className="color-map" aria-label="Mapa de colores de patologías">
  <div className="color-map-header">
    <p className="eyebrow">REFERENCIA VISUAL</p>
    <h2>Mapa de colores</h2>
    <p>
      Los colores utilizados en la imagen procesada permiten identificar
      de manera rápida los elementos y posibles patologías detectadas.
    </p>
  </div>

  <div className="color-map-items">

    <div className="color-map-item">
      <span className="color-indicator red"></span>
      <div>
        <h3>🔴 Caries</h3>
        <p>
          Las áreas marcadas en rojo representan posibles caries dentales.
          En una radiografía pueden observarse como zonas más oscuras o
          cambios en la estructura del diente, principalmente en las áreas
          de contacto entre los dientes.
        </p>
      </div>
    </div>

    <div className="color-map-item">
      <span className="color-indicator blue"></span>
      <div>
        <h3>🔵 Muelas del juicio</h3>
        <p>
          Las áreas marcadas en azul identifican las muelas del juicio o
          terceros molares. Se localizan en la parte posterior de las
          arcadas dentales, detrás de los segundos molares.
        </p>
      </div>
    </div>

    <div className="color-map-item">
      <span className="color-indicator green"></span>
      <div>
        <h3>🟢 Infecciones</h3>
        <p>
          Las áreas marcadas en verde representan posibles zonas
          relacionadas con infecciones. En una radiografía pueden
          observarse como áreas más oscuras alrededor de la raíz del
          diente o cambios en el hueso.
        </p>
      </div>
    </div>

  </div>

</section>



        <div className="desk-caption">
          <span>PLATAFORMA CERTIFICADA PARA RADIOLOGÍA DIGITAL</span>
          <span>Asegúrate de contar con el consentimiento del paciente según la normativa local.</span>
        </div>
      </main>
      <Footer />
    </div>
  );
};
