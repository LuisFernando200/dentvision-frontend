import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, Square, Sparkles, BookOpen } from 'lucide-react';
import { Navbar } from '../components/Navarbar';
import { Footer } from '../components/Footer';
import './HowItWorks.css';

const guideSteps = [
  ['1. Carga y preparación del estudio', 'Selecciona una radiografía en formato PNG, JPG o WebP de hasta 20 MB. Verifica la nitidez de la toma para asegurar que las estructuras óseas y coronarias sean legibles.'],
  ['2. Visualización e inspección previa', 'Examina la radiografía original en el visor y ajusta los niveles de brillo o contraste según el negatoscopio digital. Pulsa "Analizar Radiografía" para enviar la imagen al servicio.'],
  ['3. Contraste de hallazgos y segmentación', 'Alterna entre la imagen original y la máscara procesada por el modelo de visión. La ficha clínica muestra la estimación de confianza y las zonas de interés delimitadas.'],
  ['4. Validación y criterio del especialista', 'Toda inferencia computacional debe ser contrastada con la historia clínica y exploración del paciente. DentVision asiste y agiliza la lectura, pero el diagnóstico definitivo es potestad profesional.'],
];

const modelSteps = [
  { title: 'Selección del conjunto de datos', phase: 'PREPARACIÓN DE DATOS', image: '/eleccion_de_datos.png', alt: 'Esquema de curación de datos radiográficos panorámicos', description: 'El pipeline comienza con un conjunto diverso de ortopantomografías dentales anonimizadas, normalizadas y clasificadas por tipología de estudio.' },
  { title: 'Máscaras de referencia clínica', phase: 'ANOTACIÓN EXPERTA', image: '/dientes.png', alt: 'Anotación y delimitación anatómica de piezas dentales', description: 'Radiólogos maxilofaciales anotan polígonos de referencia sobre piezas dentales, ápices radiculares y caries para establecer el estándar de verdad terreno (ground truth).' },
  { title: 'Aumento de datos (Augmentation)', phase: 'ENTRENAMIENTO', image: '/dientes.png', animation: '/animacion_im.gif', alt: 'Técnicas de aumento sintético de variabilidad radiográfica', description: 'Se aplican rotaciones controladas, ligeras deformaciones elásticas y variaciones de exposición para que el modelo sea robusto ante equipos de diferentes fabricantes.' },
  { title: 'Normalización dimensional (512x512)', phase: 'PREPROCESAMIENTO', image: '/ajusto.png', alt: 'Redimensionamiento y normalización de tensores de imagen', description: 'Las radiografías se redimensionan a tensores estandarizados de 512 × 512 píxeles con normalización z-score de intensidades para una computación convolucional eficiente.' },
  { title: 'División Train / Val / Test', phase: 'VALIDACIÓN CLÍNICA', image: '/test.png', alt: 'Estrategia de validación cruzada y test ciego', description: 'Los datos se particionan de forma estratificada en conjuntos de entrenamiento, validación y prueba independiente para certificar la generalización del algoritmo.' },
  { title: 'Arquitectura de red U-Net', phase: 'INFERENCIA', image: '/radiografia.png', alt: 'Arquitectura convolucional U-Net para segmentación semántica', description: 'La red U-Net captura tanto el contexto global anatómico como las sutilezas espaciales a nivel de píxel mediante conexiones directas (skip connections).' },
  { title: 'Encoder: Extracción de características', phase: 'ENCODER', image: '/encoder.jpeg', animation: '/decoder.gif', alt: 'Diagrama del flujo descendente del encoder', description: 'Capas sucesivas de convolución y max pooling comprimen la información visual, aislando patrones de densidad radiológica compatibles con caries o rarefacción periapical.' },
  { title: 'Decoder: Reconstrucción y mapa de calor', phase: 'DECODER & HEATMAP', image: '/radiografia.png', animation: '/decoder_panoramico.gif', alt: 'Reconstrucción de la máscara de probabilidad diagnóstica', description: 'El bloque expansivo restaura las dimensiones espaciales y genera la máscara de segmentación con la probabilidad de hallazgos para su visualización clínica.' },
];

export const HowltWorks = () => {
  const [section, setSection] = useState<'guide' | 'model'>('guide');
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = modelSteps[step];
  const changeStep = (next: number) => { setStep(next); setPlaying(false); };

  return (
    <div className="atlas-page learning-page">
      <Navbar />
      <main className="learning-guide">
        <header className="learning-heading">
          <div>
            <p className="eyebrow">METODOLOGÍA Y DOCUMENTACIÓN TÉCNICA</p>
            <h1>Cómo funciona <em>DentVision</em></h1>
          </div>
          <Link className="text-button" to="/home">
            Ir a Estación de Diagnóstico <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </header>

        <div className="learning-switch" role="group" aria-label="Secciones metodológicas">
          <button
            aria-pressed={section === 'guide'}
            aria-controls="learning-content"
            onClick={() => { setSection('guide'); setPlaying(false); }}
          >
            <BookOpen size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Flujo de Trabajo Clínico
          </button>
          <button
            aria-pressed={section === 'model'}
            aria-controls="learning-content"
            onClick={() => setSection('model')}
          >
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Arquitectura del Modelo U-Net
          </button>
        </div>

        <div id="learning-content">
          {section === 'guide' ? (
            <div className="usage-guide">
              {guideSteps.map(([title, body], index) => (
                <section className="usage-step" key={title}>
                  <span aria-hidden="true">{index + 1}</span>
                  <div>
                    <h2>{title}</h2>
                    <p>{body}</p>
                  </div>
                </section>
              ))}
              <button className="model-invitation" onClick={() => setSection('model')}>
                <span>
                  ¿Deseas conocer la base científica del modelo?{' '}
                  <strong>Explora la arquitectura de redes neuronales U-Net.</strong>
                </span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <section className="model-tour" aria-label="Recorrido técnico del modelo de segmentación">
              <figure className="model-plate">
                <div className="model-plate-label">
                  <span>ETAPA {String(step + 1).padStart(2, '0')} / {current.phase}</span>
                  <a
                    href={playing && current.animation ? current.animation : current.image}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Abrir imagen técnica en tamaño completo"
                  >
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </div>
                <div className="model-image">
                  <img
                    key={String(step) + playing}
                    src={playing && current.animation ? current.animation : current.image}
                    alt={current.alt}
                  />
                </div>
                <figcaption>
                  <span>{playing ? 'Animación dinámica del proceso' : 'Esquema técnico demostrativo'}</span>
                  {current.animation && (
                    <button
                      className="text-button"
                      aria-pressed={playing}
                      onClick={() => setPlaying(!playing)}
                    >
                      {playing ? <Square size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
                      {playing ? 'Pausar animación' : 'Reproducir animación'}
                    </button>
                  )}
                </figcaption>
              </figure>

              <div className="model-explanation">
                <label htmlFor="model-stage">SELECCIONAR FASE DEL PIPELINE</label>
                <select
                  id="model-stage"
                  value={step}
                  onChange={(e) => changeStep(Number(e.target.value))}
                >
                  {modelSteps.map((item, index) => (
                    <option key={item.title} value={index}>
                      {String(index + 1).padStart(2, '0')} — {item.title}
                    </option>
                  ))}
                </select>

                <div className="model-description" aria-live="polite" aria-atomic="true">
                  <p className="eyebrow">{current.phase} · FASE {step + 1} DE {modelSteps.length}</p>
                  <h2>{current.title}</h2>
                  <p>{current.description}</p>
                </div>

                <div className="model-pagination">
                  <button
                    className="text-button"
                    disabled={step === 0}
                    onClick={() => changeStep(step - 1)}
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Anterior
                  </button>
                  <span aria-hidden="true">
                    Paso {step + 1} de {modelSteps.length}
                  </span>
                  <button
                    className="text-button"
                    disabled={step === modelSteps.length - 1}
                    onClick={() => changeStep(step + 1)}
                  >
                    Siguiente
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
