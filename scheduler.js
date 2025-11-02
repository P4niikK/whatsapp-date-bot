const config = require('./config');

/**
 * Módulo de Programación de Horarios
 *
 * Gestiona la lógica de cuándo enviar los mensajes de citas.
 * Calcula fechas futuras y horas aleatorias dentro de la ventana configurada.
 */

class Scheduler {
  constructor() {
    this.timeoutId = null;
  }

  /**
   * Obtiene una hora aleatoria entre HORA_INICIO y HORA_FIN
   * @returns {Object} - Objeto con hora y minutos aleatorios
   */
  obtenerHoraAleatoria() {
    const horaInicio = config.HORA_INICIO;
    const horaFin = config.HORA_FIN;

    // Generar hora aleatoria entre horaInicio y horaFin
    const hora = Math.floor(Math.random() * (horaFin - horaInicio)) + horaInicio;

    // Generar minutos aleatorios (0-59)
    const minutos = Math.floor(Math.random() * 60);

    return { hora, minutos };
  }

  /**
   * Calcula la próxima fecha de envío
   * @returns {Date} - Fecha del próximo envío
   */
  calcularProximaFecha() {
    const ahora = new Date();
    const proximaFecha = new Date();

    // Sumar los días configurados
    proximaFecha.setDate(ahora.getDate() + config.INTERVALO_DIAS);

    // Obtener hora aleatoria
    const { hora, minutos } = this.obtenerHoraAleatoria();

    // Establecer la hora aleatoria
    proximaFecha.setHours(hora, minutos, 0, 0);

    return proximaFecha;
  }

  /**
   * Calcula cuántos milisegundos faltan hasta la próxima fecha
   * @param {Date} proximaFecha - Fecha objetivo
   * @returns {number} - Milisegundos hasta la fecha
   */
  calcularMilisegundosHasta(proximaFecha) {
    const ahora = new Date();
    return proximaFecha.getTime() - ahora.getTime();
  }

  /**
   * Formatea una fecha para mostrar en los logs
   * @param {Date} fecha - Fecha a formatear
   * @returns {string} - Fecha formateada
   */
  formatearFecha(fecha) {
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: config.TIMEZONE,
    };

    return fecha.toLocaleDateString('es-AR', opciones);
  }

  /**
   * Programa el próximo envío
   * @param {Function} callback - Función a ejecutar cuando llegue el momento
   * @returns {Object} - Información sobre el envío programado
   */
  programarProximoEnvio(callback) {
    // Cancelar cualquier timeout anterior
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Calcular próxima fecha
    const proximaFecha = this.calcularProximaFecha();
    const milisegundos = this.calcularMilisegundosHasta(proximaFecha);

    // Validar que no sea en el pasado
    if (milisegundos < 0) {
      console.error('⚠️  Error: La fecha calculada está en el pasado');
      return null;
    }

    // Programar el envío
    this.timeoutId = setTimeout(() => {
      callback();
    }, milisegundos);

    // Log de información
    console.log('\n⏰ PRÓXIMO ENVÍO PROGRAMADO');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📅 Fecha: ${this.formatearFecha(proximaFecha)}`);
    console.log(`⏱️  Faltan: ${this.formatearTiempoRestante(milisegundos)}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return {
      proximaFecha,
      milisegundos,
      fechaFormateada: this.formatearFecha(proximaFecha),
    };
  }

  /**
   * Formatea milisegundos a un formato legible
   * @param {number} ms - Milisegundos
   * @returns {string} - Tiempo formateado
   */
  formatearTiempoRestante(ms) {
    const segundos = Math.floor(ms / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    const horasRestantes = horas % 24;
    const minutosRestantes = minutos % 60;

    if (dias > 0) {
      return `${dias}d ${horasRestantes}h ${minutosRestantes}m`;
    } else if (horas > 0) {
      return `${horas}h ${minutosRestantes}m`;
    } else {
      return `${minutos}m`;
    }
  }

  /**
   * Cancela el envío programado
   */
  cancelarEnvio() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      console.log('❌ Envío programado cancelado');
    }
  }

  /**
   * Programa un envío inmediato (para pruebas)
   * @param {Function} callback - Función a ejecutar
   * @param {number} segundos - Segundos de espera (por defecto 5)
   */
  programarEnvioInmediato(callback, segundos = 5) {
    console.log(`\n🧪 MODO PRUEBA: Enviando mensaje en ${segundos} segundos...\n`);

    this.timeoutId = setTimeout(() => {
      callback();
    }, segundos * 1000);
  }
}

module.exports = Scheduler;
