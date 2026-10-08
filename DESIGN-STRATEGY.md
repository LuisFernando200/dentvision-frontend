# Dentvision — Atlas radiográfico

## 1. Metáfora visual y dirección de arte
Un atlas anatómico editorial se encuentra con un negatoscopio. El objeto central es la radiografía, enmarcada por herramientas y anotaciones, no por tarjetas comerciales. Petróleo #173D3B para estructura, marfil #F2F0E7 para lectura, lima #D8EC85 para acciones y terracota #952F24 para errores. DM Sans en controles, Instrument Serif en titulares expresivos y monoespaciada en folios y metadatos. Las fuentes tienen alternativas locales si Google Fonts no está disponible.

## 2. Arquitectura emocional
El acceso introduce «Otra mirada. Más perspectiva». El trabajo sigue una secuencia visible: preparar imagen → observar → revisar resultado. La ficha lateral cambia con el estado real del estudio. El usuario observa primero el original, decide cuándo enviarlo y después contrasta la respuesta. En móvil, el visor precede a la ficha. No se secuestra el scroll ni se ocultan acciones esenciales tras gestos. La guía explica las tareas, en vez de exponer la arquitectura técnica del modelo.

## 3. Tres microinteracciones
- Acoplamiento al visor: al arrastrar una imagen, el contorno lima señala el destino. Una carga válida revela la placa y actualiza el folio de progreso y el nombre del archivo.
- Negatoscopio regulable: el control de brillo responde de inmediato; su valor es visible y solo afecta la presentación, nunca los píxeles enviados al backend.
- Contraste de lecturas: los botones Original / Resultado intercambian las imágenes en el mismo marco. El estado seleccionado se comunica visualmente y mediante aria-pressed. Durante la espera, un pulso discreto acompaña un mensaje de estado real, sin porcentajes inventados.
Se respeta prefers-reduced-motion. No se añade vibración obligatoria ni sonido en un contexto de trabajo clínico.

## 4. Patrones de interfaz
Navegación numerada y visible en lugar de hamburguesa; visor oscuro y cuaderno lateral en lugar de mosaico de tarjetas; campos con etiquetas persistentes en lugar de placeholders como etiquetas. Selector accesible como alternativa al arrastre, foco visible, controles nativos, mensajes de error con role=alert y estados anunciados. Los controles principales tienen objetivos de al menos 44 px de altura. Estas medidas apoyan accesibilidad, pero no equivalen a una auditoría o certificación WCAG.

## 5. Factor rompedor
Convertir la marca en un instrumento de observación: la radiografía ocupa el centro de la experiencia, incluso en la presentación editorial de acceso. Sin sonrisas de stock, claims de precisión sin validar ni celebraciones por resultados médicos. La decisión audaz es dar protagonismo a la lectura humana y al material clínico, con estética de publicación anatómica. La lámina de acceso se identifica explícitamente como ejemplo.

## Alcance aplicado
Acceso, registro, mesa de lectura, guía y navegación/pie compartidos. Se mantienen las rutas protegidas y los servicios de autenticación y predicción. Ajustes y administración conservan sus contenidos existentes; no se han rediseñado sus formularios internos.

## Verificación
Compilación de producción y lint de los archivos modificados. El lint global presenta problemas preexistentes en ImagenList.tsx y profile.ts. No se ha realizado una validación completa con el backend ni una auditoría WCAG. Formatos de carga actuales: PNG, JPG y WebP, hasta 20 MB; DICOM no está implementado.
