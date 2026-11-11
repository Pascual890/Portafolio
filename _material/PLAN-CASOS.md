# Plan de contenido — los 3 casos

> Revisado el 11/11/2026 con: los `info.md`, los 4 diplomas del DEX, el Pitch, «Problemática y usuarios» y la «Sinopsis VR»
> de Selva, los 19 PNG de ventanas emergentes, el video VR (visto por fotogramas), el sitio del equipo de Dissonance,
> **el sitio de Atlas** (pascual890.github.io/PaginaTaller6, todas sus páginas y sus JS) y el sitio de Pasos de Tradición.
> Lo marcado con **❓** no lo sé: no lo invento, te lo pregunto al final.

---

## Idea general

Cada caso muestra **una fortaleza distinta**, para que el portafolio no repita lo mismo tres veces:

| # | Proyecto | Qué demuestra | Peso |
|---|---|---|---|
| 01 | **Dissonance** | Desarrollo web + diseño de interacción narrativa | Caso principal, el más largo |
| 02 | **Pasos de tradición** | Desarrollo AR en Unity, pruebas en móvil | Medio (ya está casi hecho) |
| 03 | **Selva que alimenta** | VR: interacción, UI dentro del mundo, investigación de usuarios | Medio, depende de tus respuestas |

**Cambio de orden:** hoy Dissonance es el 03. Propongo que pase a ser el **01**, porque es tu mejor proyecto, ganó 4 premios
y es el único donde la pieza es 100 % tuya y se puede abrir en el navegador.

**Esqueleto común** (el que ya tiene la página de Pasos): cabecera (etiqueta, título, 1–2 frases, enlaces) → ficha
(Mi rol · Año · Plataforma · Herramientas · Equipo) → portada → secciones numeradas → «Siguiente proyecto».
Lo que cambia entre casos son las secciones del medio.

---

## 01 · Dissonance

**Etiqueta:** Narrativa interactiva · Web · Terror cósmico
**Frase de entrada:** Dissonance es una experiencia de terror cósmico en tres actos: video interactivo, sitio web y VR
cooperativa. Yo construí el Acto II, el sitio de Atlas Corporation: una empresa espacial ficticia que el participante
investiga antes de la misión, y que no cuadra.
**Enlaces:** Visitar Atlas ↗ (pascual890.github.io/PaginaTaller6) · Sitio del proyecto ↗

**Reconocimientos** (justo debajo de la cabecera, pequeños y sobrios: una lista con regla, sin insignias de colores)
DEX — Muestra de Ingeniería en Diseño de Entretenimiento Digital, UPB · 10 nov 2026
- Mejor producto — Experiencias interactivas
- Mejor interacción jugador-entorno
- Estilo visual más original
- Mención de honor — Taller 6

**Ficha:** Mi rol: Desarrollo web (Acto II) · concepto, narrativa y estética con el equipo — Año: 2026 — Plataforma: Web
(PC) — Herramientas: HTML, CSS, JavaScript, Figma — Equipo: 6 estudiantes

### Secciones

**01 · El proyecto**
- La premisa: crees que te estás postulando a una misión espacial; cuanto más sabes, menos confías.
- Diagrama simple de los 3 actos — I Decidir (video) → **II Buscar (web, mi parte, en rojo)** → III Sobrevivir (VR + PC).
- El nombre: «lo oficial vs. lo observado». La tensión nace del contraste, sin sustos ni violencia.

**02 · Mi rol**
- Mío: diseñar y programar todo el sitio de Atlas (HTML, CSS y JS a mano, sin librerías).
- Compartido: conceptualización, decisiones de narrativa y de estética del proyecto completo (como pediste).
- Nota con el resto del equipo y su rol, igual que en Pasos.

**03 · Investigación** (corta: es del equipo, pero muestra criterio de UX)
- 39 encuestas · 11 entrevistas · 1 ronda de pruebas.
- 2–3 datos que explican el diseño: «sentirse observado» fue el miedo n.º 1 (76,9 %); el miedo viene de la incertidumbre,
  no del peligro.
- Imagen: el tablero de FigJam (revisado). Tiene plan de investigación, encuesta, atomic research
  (hechos → hallazgos → recomendaciones), **user journey map**, **service blueprint** e hipótesis por medio.
  Usaría 2 recortes: el journey map entero (se lee como «mucho trabajo de proceso») y la fila de la página web del
  blueprint.
- Del journey map, lo que toca a la web: el usuario abre «el sitio oficial de la empresa», explora, encuentra pistas y
  se postula. Dolor detectado: *«los easter eggs están tan ocultos que el usuario puede pasarlos por alto, leyendo la web
  como un sitio corporativo aburrido»*.

**04 · Atlas Corporation, el sitio** ← el corazón del caso
Un «terminal público» de 1983. Lo cuento como decisiones de diseño, cada una con su captura:
1. **Una interfaz de 1983.** Pantalla de acceso, ventanas con barra de título, barra de tareas con reloj, íconos pixelados
   dibujados en código.
2. **Lo tachado se filtra.** Los textos censurados no se descifran con el mouse: se revelan seleccionando el texto o
   manteniendo pulsado. El sitio cuenta cada intento de acceso.
3. **Datos que derivan.** El monitor solar empieza en NOMINAL y termina en «NO CLASIFICADO»; el contador de visitas no
   siempre sube.
4. **A.R., el que filtra.** Si te quedas en el inicio, a los 40 s aparece alguien que se apodera de los avisos y te pide
   las claves tachadas. Si las encuentras, se abre `/archive/`: el acta secreta del comité y la grabación del portavoz.
5. **Sonido generado en el navegador.** Teclas, teletipo, pitidos y estática hechos con Web Audio, sin archivos de audio.
6. **El objetivo: postularse.** El formulario asigna los roles del Acto III (astronauta / operador) y calcula un
   «Índice de Perturbación».
Medios: video de recorrido del sitio (el `atlas-acto-ii.mp4` del sitio del equipo) + 4 capturas: acceso, inicio,
documentos, postulación.

**05 · Hipótesis, pruebas e iteración** ← el segundo pilar del caso (aquí se ve el UX)
Contado como un ciclo de 3 tiempos:
1. **Lo que creíamos** (hipótesis del FigJam para la web, con su prueba):
   - Que no entrarían a la web después del video → probar sin indicarles nada, contar cuántos entran solos.
   - Que abandonarían la postulación porque tiene varios pasos → tarea de inscribirse pensando en voz alta.
   - Que navegarían por encima, leyéndola como página informativa y no como ficción → 3 min de exploración libre,
     contar cuántos easter eggs encuentran.
2. **Lo que pasó:** «gusta visualmente, pero tiene demasiado contenido»; tardaban **4 min** en llegar al formulario.
3. **Lo que cambié:** borré partes y compacté todo para que el recorrido fuera fluido y entendible, y la web pasó a
   ser el **puente entre el video inicial y la experiencia VR/PC**: recorrido en 4 pasos (Inicio → Misión → Documentos
   → Postulación) que termina en el formulario que asigna los roles del Acto III.
- Cierre con la idea más fuerte del caso: separar la **disonancia intencional** (la confusión de la historia, se queda)
  de la **fricción de usabilidad** (no saber qué botón tocar, se corrige).
- **Antes/después (encontrado en tu repo):** las versiones viejas siguen publicadas en `/v1/` y `/prueba/`.
  - v1 (sep 2026, misión «HELIOS-1»): 7 secciones en el menú (Inicio, Acerca de, Misión, Puestos, Documentos,
    Postulación, Archivo) y ~8.700 caracteres de texto solo en el inicio.
  - Hoy: 4 pasos en el menú y ~3.800 caracteres en el inicio → **≈ 55 % menos texto** y «Puestos» fundido con «Misión».
  - En el caso: dos capturas del inicio lado a lado + esas dos cifras. Es el dato más claro de iteración del portafolio.

**06 · Resultado**
Los 4 reconocimientos otra vez en una línea y el botón grande «Visitar Atlas ↗». Cerrar con el lema de Atlas:
«La humanidad creyó que estaba explorando el universo…».

---

## 02 · Pasos de tradición (ya publicada, faltan ajustes)

Lo nuevo que me diste y que entra:
- **Contexto:** proyecto académico **con el Museo de Arte Religioso y el Museo Juan del Corral** (Santa Fe de Antioquia).
- **Herramientas:** Unity · **Vuforia** · Android (hoy dice «marcadores de realidad aumentada»).
- **Proceso**, reordenado en 4 etapas:
  1. Investigación de campo (del equipo)
  2. Del boceto al volumen (cómo se pensó la página como portal)
  3. **Tracking con Vuforia**: que los marcadores del libro se reconozcan bien
  4. **Ajuste para el teléfono**: tamaños y sonido para que se vea y se oiga bien en móvil
- **Resultado:** **Mención de honor, Taller 5: Experiencias interactivas — DEX** (mismo formato sobrio que Dissonance).
- Mi rol queda como está, ajustando el texto a «desarrollo de la experiencia AR en Unity y pruebas en móvil».

Siguen faltando: capturas de la escena en Unity y de la prueba en Android (❓).

---

## 03 · Selva que alimenta

Lo que sé por los documentos:
- Es una de **6 piezas de un proyecto transmedia** (web, libro, video, app, cartas AR y **VR**) sobre la gastronomía
  amazónica y la pérdida de su memoria en las ciudades. Personaje guía: **Yarí**, chamán que se vuelve jaguar.
- Investigación: 4 entrevistas, 7 agencias de turismo analizadas (solo 2 tenían algo de gastronomía), 3 usuarios tipo
  (Gertrudis, Daniel Arturo, José Alberto), público de 30–40 años en ciudades capitales.
- La VR: empiezas en un restaurante de la ciudad frente a un **Inchicapi** → «Iniciar recorrido al origen» → canoa por el
  río → Chagra 1 (maíz, maní) → Chagra 2 (yuca, sacha culantro) → Maloca (gallina criolla; a la olla, mezclar, servir)
  → cierre con Yarí.
- Interacción: pellizco, agarrar, teletransporte, **mirar la palma de la mano para abrir el mapa**.
- UI dentro del mundo: tarjetas de tono arena con huellas de jaguar (los 19 PNG).
- El video: grabación en un visor (la interfaz parece de Meta Quest), build de Unity, recorrido en canoa por el río.

**Tu rol (confirmado):** toda la integración de la VR en Unity y todas sus interacciones, siguiendo las directrices del
equipo de diseño. Los assets (modelos, ventanas, arte) no son tuyos. → El caso se centra en **hacer que funcione**:
de un documento de diseño a una experiencia VR jugable.

**Estado (11/11):** página armada con tus 3 retos técnicos, fotogramas y 2 clips sacados de la grabación del visor.
La UI que aparece en la build (paneles blancos, «Mapa del recorrido») no es la de los PNG color arena, así que la página
usa capturas reales y no esos PNG. Falta: año y dónde se presentó / comentarios recibidos.

**Decisión (11/11):** sin nombres de otros integrantes y casi nada del proyecto transmedia completo. Solo una línea:
es parte de un proyecto más grande, hecho en conjunto con estudiantes de diseño gráfico. Todo el foco en la VR.
**Visor:** Meta Quest 3 · **SDK:** Meta XR SDK.

**Etiqueta:** Realidad virtual · Gastronomía amazónica
**Frase de entrada:** Selva que alimenta es una experiencia VR que lleva al usuario desde un plato servido en la ciudad
hasta la chagra amazónica donde nacieron sus ingredientes. Yo la integré en Unity y programé todas sus interacciones.
**Ficha:** Mi rol: Integración VR e interacciones en Unity — Plataforma: ❓ visor — Herramientas: Unity ❓ (+ SDK:
¿XR Interaction Toolkit? ¿Meta SDK?) — Equipo: ❓

Estructura propuesta:
1. **Contexto** (corto): el problema y «una de 6 piezas transmedia»; la investigación del equipo en 2 líneas
   (4 entrevistas, 7 agencias, público de 30–40 años), dejando claro que es del equipo.
2. **Mi rol**: qué es tuyo (integración + interacciones) y qué no (assets, arte, guion) con crédito al equipo.
3. **La experiencia**: el recorrido de 6 escenas como diagrama horizontal
   (restaurante → canoa → chagra 1 → chagra 2 → maloca → cierre).
4. **Del documento a Unity** ← el corazón del caso. La «Sinopsis VR» del equipo traía cada interacción escrita
   («pellizco sobre la mazorca → se desprende y va al canasto»); tú la convertiste en algo que funciona. Una fila por
   interacción, con su captura:
   - Pellizco sobre la cuchara → se detiene la acción y aparece la ventana «¿Alguna vez te has preguntado…?»
   - Botón 3D «Iniciar recorrido al origen» → transición a la selva
   - Subir / bajar de la canoa → recorrido automático por el río con paradas
   - Cosecha: agarrar el ingrediente → canasto (contador de ingredientes)
   - Maloca: poner en la olla → tomar el cucharón y mezclar → servir
   - Mirar la palma → mapa / menú
   - Teletransporte
   - Las ventanas emergentes en escena (las diseñó el equipo; tú las pusiste en el mundo y las conectaste al flujo).
5. **Problemas técnicos que resolviste** ❓ (p. ej. confort al moverse en la canoa, detectar el gesto de la palma,
   rendimiento en el visor). Si me dices 2–3, esta sección es la que más vende para un rol de desarrollo VR.
6. **Resultado**: video recortado + capturas.

⚠️ Los fotogramas del video se ven de prototipo (terreno sin texturas, el menú del visor al final). Para el portafolio
conviene: recortar solo el tramo de la canoa, o mejor, sacar 4–6 capturas limpias dentro del visor (restaurante, canoa,
chagra, maloca, una ventana emergente en escena).

---

## ❓ Lo que me falta

**Selva:**
1. ~~¿Qué hiciste tú?~~ ✅ Integración VR e interacciones en Unity; assets del equipo.
2. ¿Equipo: cuántos? ¿Año/semestre? ¿Materia?
3. ¿Visor y SDK? (¿Meta Quest 2/3? ¿XR Interaction Toolkit?)
4. ¿Hasta dónde llegó la build? (¿se cocina en la maloca o llegó hasta la canoa/chagras?)
5. ¿Algún resultado: muestra, nota, premio, comentarios?
5b. 2–3 problemas técnicos que resolviste (para la sección 5).

**Dissonance:**
6. ~~¿Qué cambiaste tras las pruebas?~~ ✅ Se borraron partes y se compactó; la web quedó de puente entre video y VR/PC.
7. ~~FigJam~~ ✅ Revisado.
8. ¿Puedo usar el video `atlas-acto-ii.mp4` del sitio del equipo y tomar capturas de Atlas (actual y `/v1/`) yo mismo?

**Pasos:**
9. Capturas de Unity y de la prueba en el teléfono, si las tienes.
10. ¿El Taller 5 fue el primer semestre de 2026?
