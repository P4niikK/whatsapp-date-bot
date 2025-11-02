/**
 * Ideas de Citas para Buenos Aires
 *
 * Lista completa de ideas de citas adaptadas a CABA
 * Zona: Belgrano (yo) - Almagro (ella)
 *
 * Categorías:
 * - Cafés y bares
 * - Parques y espacios verdes
 * - Cultura y museos
 * - Comida y restaurantes
 * - Actividades y paseos
 * - Indoor (para días de lluvia/frío)
 * - Económicas
 */

const ideasCitas = [
  // ===== CAFÉS Y BARES =====
  'tomar un café en Malvón y charlar toda la tarde',
  'ir a Lattente por un café y después caminar por la zona',
  'probar el café de Full City Coffee y quedarnos leyendo',
  'ir a Coffee Town y compartir unos brownies',
  'recorrer cafés de Palermo Soho hasta encontrar "nuestro favorito"',
  'ir a algún café con libros y pasar la tarde leyendo juntos',
  'desayuno tardío en alguna cafetería de Palermo',

  // ===== PARQUES Y ESPACIOS VERDES =====
  'mates y charla en las Barrancas de Belgrano al atardecer',
  'picnic en el Parque Centenario (está entre nosotros dos!)',
  'caminar por el Rosedal y sacar fotos entre las rosas',
  'tarde de mates en el Jardín Botánico',
  'alquilar bicicletas y recorrer el Parque Tres de Febrero',
  'ver el atardecer en las Barrancas de Belgrano',
  'llevar una manta al Parque Centenario y ver las nubes',
  'caminar descalzos por el pasto en algún parque',
  'alimentar a los patos en los lagos de Palermo',

  // ===== PASEOS Y CAMINATAS =====
  'caminar por Puerto Madero al atardecer y ver las luces',
  'recorrer las callecitas de San Telmo de la mano',
  'perdernos caminando por Palermo Soho',
  'paseo por Recoleta y ver las vidrieras',
  'ir a Caminito y sacarnos fotos coloridas',
  'caminar por la costanera y tomar algo mirando el río',
  'recorrer librerías: ir a El Ateneo Grand Splendid',
  'explorar barrios que no conocemos bien juntos',

  // ===== CULTURA Y MUSEOS =====
  'ir al Malba y después café en algún lugar lindo de Palermo',
  'pasar la tarde en el CCK explorando las salas',
  'concierto gratis en la Usina del Arte',
  'recorrido por el Teatro Colón (visita guiada)',
  'tarde en el Centro Cultural Recoleta viendo exposiciones',
  'ir a alguna muestra de arte que nos llame la atención',
  'visitar el Museo Nacional de Bellas Artes',
  'buscar eventos culturales gratuitos en CABA',

  // ===== COMIDA Y RESTAURANTES =====
  'pizza en una pizzería porteña clásica y caminar por Almagro',
  'helado en Rapanui y caminar por Palermo hasta el Rosedal',
  'ir a Freddo o Grido y hacer competencia de sabores',
  'parrilla argentina y compartir un bife de chorizo',
  'comida coreana en Flores y probar cosas nuevas',
  'pedir delivery de nuestra comida favorita y ver una serie',
  'noche de sushi y película en casa',
  'hacer las compras juntos y cocinar algo rico',
  'probar una comida que ninguno de los dos haya probado',
  'pedir delivery de distintos lugares y hacer un "buffet casero"',

  // ===== FERIAS Y EVENTOS =====
  'ir a la Feria de San Telmo un domingo',
  'Feria de Mataderos (domingos) y probar choripán',
  'buscar ferias de artesanos en Recoleta',
  'La Bomba de Tiempo en Konex (los lunes)',
  'recorrer ferias de diseño independiente',

  // ===== ACTIVIDADES Y EXPERIENCIAS =====
  'recorrido en bici por la ciclovía de Puerto Madero',
  'alquilar bicicletas y explorar la ciudad',
  'hacer un picnic nocturno con luces y mantita',
  'buscar los mejores spots para fotos en CABA',
  'hacer una lista de deseos juntos en un café',
  'jugar juegos de mesa en un bar temático',
  'karaoke y cantar nuestras canciones favoritas',

  // ===== INDOOR (Lluvia/Frío) =====
  'noche de cine con pochoclos y manta en casa',
  'maratón de nuestra serie favorita con delivery',
  'cocinar juntos algo que nunca hicimos',
  'noche de juegos de mesa y vino',
  'armar rompecabezas mientras escuchamos música',
  'tarde de mantita, té y películas',
  'enseñarnos algo mutuamente (cocina, idioma, hobby)',

  // ===== ECONÓMICAS =====
  'mates en cualquier parque y charlar de todo',
  'caminar sin rumbo fijo y ver dónde terminamos',
  'cine con entradas 2x1 (miércoles o promociones)',
  'ver el atardecer desde algún lugar alto',
  'buscar mirados gratis desde terrazas de edificios',
  'recorrer el barrio del otro y que me muestres tus lugares favoritos',
  'tarde de fotos: ser fotógrafos el uno del otro',

  // ===== ROMÁNTICAS ESPECIALES =====
  'escribirnos cartitas y leerlas juntos en un parque',
  'buscar el mejor helado de Buenos Aires (competencia)',
  'hacer una cápsula del tiempo juntos',
  'ir a un lugar que tenga un recuerdo especial para nosotros',
  'recrear nuestra primera cita',
  'planear juntos nuestro próximo viaje',
];

/**
 * Obtiene una idea aleatoria que no haya sido usada recientemente
 * @param {Array} ideasUsadas - Array de ideas ya utilizadas
 * @returns {string} - Idea de cita seleccionada
 */
function obtenerIdeaAleatoria(ideasUsadas = []) {
  // Si ya usamos todas las ideas, reiniciar el historial
  if (ideasUsadas.length >= ideasCitas.length) {
    console.log('🔄 Todas las ideas fueron usadas. Reiniciando el ciclo...');
    ideasUsadas = [];
  }

  // Filtrar ideas que no han sido usadas
  const ideasDisponibles = ideasCitas.filter(idea => !ideasUsadas.includes(idea));

  // Si no hay ideas disponibles (por seguridad), usar todas
  const pool = ideasDisponibles.length > 0 ? ideasDisponibles : ideasCitas;

  // Seleccionar una idea aleatoria
  const indiceAleatorio = Math.floor(Math.random() * pool.length);
  return pool[indiceAleatorio];
}

/**
 * Obtiene estadísticas de las ideas
 * @returns {Object} - Objeto con estadísticas
 */
function obtenerEstadisticas() {
  return {
    totalIdeas: ideasCitas.length,
    categorias: {
      cafes: ideasCitas.filter(i => i.includes('café') || i.includes('Lattente') || i.includes('Malvón')).length,
      parques: ideasCitas.filter(i => i.includes('parque') || i.includes('Barrancas') || i.includes('Rosedal')).length,
      cultura: ideasCitas.filter(i => i.includes('museo') || i.includes('Malba') || i.includes('CCK')).length,
      comida: ideasCitas.filter(i => i.includes('pizza') || i.includes('helado') || i.includes('delivery')).length,
      indoor: ideasCitas.filter(i => i.includes('casa') || i.includes('cine') || i.includes('serie')).length,
    }
  };
}

module.exports = {
  ideasCitas,
  obtenerIdeaAleatoria,
  obtenerEstadisticas,
};
