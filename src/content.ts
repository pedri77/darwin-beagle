import laminas from './datos/laminas.json';

type Lamina = {w: number; h: number; fichero: string; licencia: string};
export const L = laminas as Record<string, Lamina>;

const base = import.meta.env.BASE_URL;
export const img = (k: string) => `${base}img/${k}.webp`;
export const commons = (f: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(f.replace(/ /g, '_'))}`;

export const portada = {
  antetitulo: 'HMS Beagle · 27 de diciembre de 1831 – 2 de octubre de 1836',
  titulo: ['El cajón', 'del Beagle'],
  entradilla:
    'Charles Darwin tenía 22 años cuando embarcó como naturalista en un barco que iba a cartografiar las costas de Sudamérica. Volvió casi cinco años después con miles de especímenes. Baja con el barco y mira cómo se llena el cajón.',
  aviso: 'Desplázate para zarpar',
};

/** Un espécimen del cajón: lámina de The Zoology of the Voyage of H.M.S. Beagle (1838–1843). */
export type Especimen = {k: string; nombre: string; latin: string; etiqueta: string; nota: string};

/**
 * Las paradas del viaje. `lon` va «desenrollada» hacia el oeste (puede bajar de −180) para que la ruta sea una
 * sola línea continua en el mapa. `especimenes` son las láminas que caen al cajón al llegar.
 */
export type Parada = {lugar: string; fecha: string; lon: number; lat: number; titulo: string; texto: string; especimenes?: Especimen[]};

export const paradas: Parada[] = [
  {
    lugar: 'Plymouth', fecha: '27 de diciembre de 1831', lon: -4.14, lat: 50.37,
    titulo: 'Salida', texto: 'El Beagle sale de Plymouth. El encargo es cartografiar las costas de Sudamérica; Darwin va como acompañante del capitán FitzRoy y naturalista sin sueldo.',
  },
  {
    lugar: 'Santiago, Cabo Verde', fecha: '16 de enero de 1832', lon: -23.51, lat: 14.93,
    titulo: 'La primera escala', texto: 'Primera tierra. Mientras FitzRoy fija la posición de las islas, Darwin recoge animales marinos en las pozas y un gorrión que Gould describirá como especie nueva.',
    especimenes: [{k: 'gorrion', nombre: 'Gorrión de Cabo Verde', latin: 'Passer iagoensis', etiqueta: 'St. Jago, ene. 1832', nota: 'El primer pájaro nuevo del viaje. Gould lo describió en 1837.'}],
  },
  {
    lugar: 'Río de Janeiro', fecha: '4 de abril de 1832', lon: -43.17, lat: -22.91,
    titulo: 'La selva', texto: 'El Beagle entra en la bahía de Río. Darwin pasa semanas en la selva atlántica recogiendo escarabajos, arañas y ranas.',
  },
  {
    lugar: 'Punta Alta', fecha: '22 de septiembre de 1832', lon: -62.07, lat: -38.88,
    titulo: 'Huesos de gigantes', texto: 'En una excursión por la bahía de Bahía Blanca encuentra fósiles enormes de mamíferos extinguidos. Más tarde se preguntará por qué se parecen tanto a los armadillos y perezosos que aún viven allí.',
  },
  {
    lugar: 'Tierra del Fuego', fecha: '18 de diciembre de 1832', lon: -68.3, lat: -54.8,
    titulo: 'El fin del mundo', texto: 'Llegan a Tierra del Fuego para devolver a casa a tres fueguinos que FitzRoy se había llevado a Inglaterra en el viaje anterior.',
  },
  {
    lugar: 'Islas Malvinas', fecha: 'marzo de 1833', lon: -57.85, lat: -51.69,
    titulo: 'Un zorro sin miedo', texto: 'El único mamífero terrestre de las islas se acerca a la gente sin miedo. Darwin escribe que, en cuanto se colonicen las islas, «este zorro será clasificado con el dodo».',
    especimenes: [{k: 'lobo', nombre: 'Lobo de las Malvinas', latin: 'Canis antarcticus', etiqueta: 'Falkland Isds., 1833', nota: 'Se extinguió en 1876, unos cuarenta años después de que Darwin lo viera.'}],
  },
  {
    lugar: 'Arroyo Sarandí, Uruguay', fecha: '26 de noviembre de 1833', lon: -57.9, lat: -33.2,
    titulo: 'Una calavera por 18 peniques', texto: 'En una granja junto al río Negro le hablan de «huesos de gigante». Compra la calavera por dieciocho peniques: los niños la usaban de blanco para tirarle piedras y le habían saltado los dientes.',
    especimenes: [{k: 'toxodon', nombre: 'Toxodon', latin: 'Toxodon platensis', etiqueta: 'Río Negro, 26 nov. 1833', nota: 'Richard Owen lo bautizó en 1837. Un mamífero del tamaño de un rinoceronte, sin parientes vivos.'}],
  },
  {
    lugar: 'Puerto Deseado', fecha: 'enero de 1834', lon: -65.9, lat: -47.75,
    titulo: 'El ñandú de la cena', texto: 'Los gauchos le habían hablado de un ñandú pequeño y raro. El pintor del barco, Conrad Martens, caza uno y se lo comen antes de que Darwin se dé cuenta de que era ese. Salva la cabeza, el cuello, las patas y muchas plumas.',
    especimenes: [{k: 'nandu', nombre: 'Ñandú de Darwin', latin: 'Rhea darwinii', etiqueta: 'Patagonia, ene. 1834', nota: 'Gould lo describió con lo que sobró de la cena. Hoy se llama Rhea pennata.'}],
  },
  {
    lugar: 'Valparaíso', fecha: '23 de julio de 1834', lon: -71.62, lat: -33.05,
    titulo: 'Al otro lado', texto: 'Tras doblar el cabo de Hornos, el Beagle llega a Chile. Darwin sube a los Andes y encuentra conchas marinas fósiles a miles de metros de altura.',
  },
  {
    lugar: 'Concepción', fecha: 'febrero–marzo de 1835', lon: -73.05, lat: -36.83,
    titulo: 'El terremoto', texto: 'Darwin está en tierra, en Valdivia, cuando le sorprende un gran terremoto. Al llegar a Concepción, el 4 de marzo, encuentran la ciudad arrasada por las sacudidas y el maremoto, con la catedral en ruinas.',
  },
  {
    lugar: 'Galápagos', fecha: '15 de septiembre de 1835', lon: -89.6, lat: -0.9,
    titulo: 'Unas islas sin miedo', texto: 'Los animales no huyen. «Una escopeta aquí casi sobra», anota: con la punta del cañón empuja a un halcón de una rama. En San Cristóbal atrapa vivas varias ratas de una especie que nadie había descrito.',
    especimenes: [
      {k: 'busardo', nombre: 'Busardo de Galápagos', latin: 'Buteo galapagoensis', etiqueta: 'Galápagos, sep. 1835', nota: 'Tan manso que se le podía tocar con la escopeta.'},
      {k: 'rata', nombre: 'Rata arrocera de Galápagos', latin: 'Mus galapagoensis', etiqueta: 'Chatham Isd., 1835', nota: 'La población de San Cristóbal desapareció décadas después; nadie volvió a verla viva.'},
    ],
  },
  {
    lugar: 'Floreana', fecha: 'septiembre de 1835', lon: -90.45, lat: -1.28,
    titulo: 'Un sinsonte distinto', texto: 'En Floreana caza un sinsonte que no se parece del todo al de San Cristóbal. Esta vez anota en qué isla lo cogió, algo que no había hecho con los pinzones.',
    especimenes: [
      {k: 'trifasciatus', nombre: 'Sinsonte de Floreana', latin: 'Mimus trifasciatus', etiqueta: 'Charles Isd., 1835', nota: 'Hoy ya no vive en Floreana, solo en dos islotes cercanos.'},
      {k: 'magnirostris', nombre: 'Pinzón terrestre grande', latin: 'Geospiza magnirostris', etiqueta: 'Charles & Chatham Isds.', nota: 'Darwin lo tomó por un picogordo. Gould le dijo que era un pinzón.'},
    ],
  },
  {
    lugar: 'Tahití', fecha: '15 de noviembre de 1835', lon: -149.57, lat: -17.53,
    titulo: 'El Pacífico', texto: 'Tras casi un mes de mar abierto, Tahití: vegetación exuberante y una gente que a Darwin le pareció amable e inteligente.',
  },
  {
    lugar: 'Sídney', fecha: '12 de enero de 1836', lon: 151.21 - 360, lat: -33.87,
    titulo: 'Un ornitorrinco', texto: 'Al ver Australia por primera vez le recuerda a Patagonia. Una tarde ve un ornitorrinco vivo y se da cuenta de que su pico es blando, nada que ver con los ejemplares disecados que conocía.',
  },
  {
    lugar: 'Islas Cocos (Keeling)', fecha: '1 de abril de 1836', lon: 96.83 - 360, lat: -12.19,
    titulo: 'Arrecifes de coral', texto: 'Toda la tripulación se pone a medir el atolón. Darwin pone a prueba aquí su idea sobre cómo se forman los arrecifes de coral sobre islas que se hunden poco a poco.',
  },
  {
    lugar: 'Ciudad del Cabo', fecha: '31 de mayo de 1836', lon: 18.42 - 360, lat: -33.92,
    titulo: 'Una visita', texto: 'Visita al astrónomo John Herschel, que meses antes había escrito sobre «el misterio de los misterios»: cómo unas especies sustituyen a otras.',
  },
  {
    lugar: 'Falmouth', fecha: '2 de octubre de 1836', lon: -5.07 - 360, lat: 50.15,
    titulo: 'De vuelta', texto: 'Cuatro años y nueve meses después, el Beagle fondea en Falmouth una noche de tormenta. Darwin coge la diligencia a casa esa misma noche. No volverá a salir de Gran Bretaña.',
  },
];

/** Puntos intermedios entre paradas, solo para que la línea no cruce continentes. Índice = parada de destino. */
export const intermedios: Record<number, [number, number][]> = {
  1: [[-16.3, 28.4]],
  2: [[-30, 0], [-38.5, -12.97]],
  3: [[-50, -30], [-56.2, -35.2]],
  4: [[-63, -46], [-65.5, -54]],
  5: [[-62, -54]],
  6: [[-56.2, -35.2]],
  7: [[-57.5, -38]],
  8: [[-67, -50.5], [-68.4, -52.4], [-70.9, -53.4], [-73.8, -52.7], [-75.6, -50], [-75.2, -43], [-73.5, -36.5]],
  9: [[-73.2, -34]],
  10: [[-77.2, -12.05], [-85, -4]],
  13: [[174.1 - 360, -35.3], [161 - 360, -36]],
  14: [[147.3 - 360, -42.9], [117.9 - 360, -35], [105 - 360, -20]],
  15: [[57.5 - 360, -20.16], [35 - 360, -33]],
  16: [[-5.7 - 360, -15.95], [-14.36 - 360, -7.95], [-38.5 - 360, -12.97], [-27.2 - 360, 38.7]],
};

export const islas = {
  antetitulo: 'Galápagos · 1835',
  titulo: 'Islas a la vista unas de otras',
  intro:
    'Darwin y la tripulación cazaron sinsontes en cuatro islas. Cada isla tenía el suyo, un poco distinto. Meses después, ya de vuelta en el Atlántico, pasando a limpio sus notas, Darwin escribió la frase más famosa del viaje.',
  sinsontes: [
    {k: 'trifasciatus', nombre: 'Sinsonte de Floreana', latin: 'Mimus trifasciatus', isla: 'Floreana (Charles)'},
    {k: 'melanotis', nombre: 'Sinsonte de San Cristóbal', latin: 'Mimus melanotis', isla: 'San Cristóbal (Chatham)'},
    {k: 'parvulus', nombre: 'Sinsonte de Galápagos', latin: 'Mimus parvulus', isla: 'Varias islas del centro y del oeste'},
  ],
  cita: '«Cuando veo estas islas, a la vista unas de otras, habitadas por estas aves que apenas difieren en su estructura y ocupan el mismo lugar en la naturaleza, debo sospechar que solo son variedades. […] Si hay el menor fundamento para estas observaciones, la zoología de los archipiélagos merecerá ser estudiada, porque tales hechos minarían la estabilidad de las especies.»',
  fuente: 'Charles Darwin, Notas ornitológicas, verano de 1836. Cambridge University Library, DAR 29.2.',
  pinzonesTitulo: 'Los pinzones, sin etiqueta',
  pinzonesTexto:
    'Los famosos pinzones no le llamaron la atención en las islas: los tomó por mirlos, picogordos, pinzones y hasta un chochín, y no anotó de qué isla era cada uno. Al volver, el ornitólogo John Gould le explicó que eran todos pinzones, un grupo nuevo de doce especies. Para saber de dónde venía cada uno, Darwin tuvo que tirar de los ejemplares etiquetados por FitzRoy, por el mayordomo del capitán y por su propio criado, Syms Covington.',
  pinzones: [
    {k: 'magnirostris', nombre: 'Pinzón terrestre grande', latin: 'Geospiza magnirostris', pico: 'Pico enorme, para semillas duras'},
    {k: 'parvula', nombre: 'Pinzón arbóreo pequeño', latin: 'Geospiza parvula', pico: 'Pico corto y fino'},
    {k: 'psittacula', nombre: 'Pinzón arbóreo grande', latin: 'Camarhynchus psittacula', pico: 'Pico de loro'},
    {k: 'scandens', nombre: 'Pinzón de los cactus', latin: 'Cactornis scandens', pico: 'Pico largo, para flores de cactus'},
  ],
};

/** Los años entre la vuelta y el libro. `año` con decimales para colocarlos a escala. */
export type Hito = {año: number; fecha: string; texto: string; clave?: boolean};

export const anos: {antetitulo: string; titulo: string; intro: string; hitos: Hito[]; cierre: string} = {
  antetitulo: '1836 – 1859',
  titulo: 'Veintitrés años de cajón',
  intro: 'Darwin volvió con la sospecha en 1836. El libro salió en 1859. Cada año ocupa aquí la misma altura: los huecos son tiempo de verdad.',
  hitos: [
    {año: 1836.75, fecha: '2 de octubre de 1836', texto: 'El Beagle llega a Falmouth.'},
    {año: 1837.01, fecha: '4 de enero de 1837', texto: 'Entrega sus aves y mamíferos a la Sociedad Zoológica de Londres.'},
    {año: 1837.03, fecha: '10 de enero de 1837', texto: 'Gould anuncia que los pájaros de Galápagos son un grupo nuevo de pinzones.', clave: true},
    {año: 1837.54, fecha: 'Julio de 1837', texto: 'Abre el cuaderno B, sobre la «transmutación de las especies». Dibuja un árbol y escribe encima «I think».', clave: true},
    {año: 1838.74, fecha: '28 de septiembre de 1838', texto: 'Leyendo a Malthus da con la idea de la lucha por la existencia: ya tiene «una teoría con la que trabajar».', clave: true},
    {año: 1839.4, fecha: '1839', texto: 'Publica el diario del viaje, que le hace conocido fuera de los círculos científicos.'},
    {año: 1844.5, fecha: '1844', texto: 'Convierte sus notas en un ensayo de 230 páginas, pensado para publicarse si él muere antes de terminar el libro.'},
    {año: 1858.46, fecha: '18 de junio de 1858', texto: 'Recibe un paquete de Alfred Russel Wallace, desde las Molucas, con la misma idea.', clave: true},
    {año: 1858.5, fecha: '1 de julio de 1858', texto: 'Se leen juntos los textos de Wallace y Darwin en la Sociedad Linneana.'},
    {año: 1859.9, fecha: '24 de noviembre de 1859', texto: 'Se publica El origen de las especies.', clave: true},
  ],
  cierre: 'Entre el ensayo de 1844 y la carta de Wallace pasan catorce años. Darwin los dedicó, entre otras cosas, a estudiar percebes durante ocho años.',
};

export const creditos = {
  titulo: 'Fuentes',
  fuentes: [
    {nombre: 'The Zoology of the Voyage of H.M.S. Beagle (Wikimedia Commons)', url: 'https://commons.wikimedia.org/wiki/Category:The_Zoology_of_the_Voyage_of_H.M.S._Beagle'},
    {nombre: 'Second voyage of HMS Beagle (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Second_voyage_of_HMS_Beagle'},
    {nombre: 'Inception of Darwin’s theory (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Inception_of_Darwin%27s_theory'},
    {nombre: 'Darwin’s finches (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Darwin%27s_finches'},
    {nombre: 'Varieties and species: the Thencas (Cambridge University Library)', url: 'https://wwwe.lib.cam.ac.uk/CUL/exhibitions/Darwin/Thencas.html'},
    {nombre: 'Falkland Islands wolf, Darwin’s rhea, Toxodon, Aegialomys galapagoensis (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Falkland_Islands_wolf'},
    {nombre: 'On the Origin of Species (Wikipedia)', url: 'https://en.wikipedia.org/wiki/On_the_Origin_of_Species'},
    {nombre: 'Costas: Natural Earth vía world-atlas', url: 'https://github.com/topojson/world-atlas'},
  ],
  laminas:
    'Láminas de The Zoology of the Voyage of H.M.S. Beagle (1838–1843), dirigida por Darwin: aves de John Gould, mamíferos de George R. Waterhouse y fósiles de Richard Owen. Dominio público, escaneos en Wikimedia Commons.',
  metodo:
    'Las fechas de las paradas salen de la historia del viaje en Wikipedia; en Galápagos solo se da el mes. La ruta del mapa es aproximada y no incluye todas las idas y vueltas del barco por Sudamérica. Las citas están traducidas al castellano para esta página. Textos propios, escritos con ayuda de IA y revisados contra las fuentes.',
  firma: 'Hecho con datos abiertos y material de dominio público.',
};
