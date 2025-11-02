require('dotenv').config();

/**
 * Configuración del Bot de Citas
 *
 * Todas las configuraciones principales del bot están centralizadas aquí.
 * Puedes modificar estos valores según tus necesidades.
 */

const config = {
  // CONFIGURACIÓN DE WHATSAPP
  // Número de teléfono de tu pareja (formato internacional sin +)
  // Ejemplo: '5491123456789' para Argentina
  NUMERO_PAREJA: process.env.NUMERO_PAREJA || '5491123456789',

  // CONFIGURACIÓN DE INTERVALOS
  // Cada cuántos días enviar una idea de cita (2 días por defecto)
  INTERVALO_DIAS: parseInt(process.env.INTERVALO_DIAS) || 2,

  // CONFIGURACIÓN DE HORARIOS
  // Ventana de tiempo para enviar mensajes (hora del día en formato 24hs)
  HORA_INICIO: parseInt(process.env.HORA_INICIO) || 15, // 15:00 hs (3 PM)
  HORA_FIN: parseInt(process.env.HORA_FIN) || 19,       // 19:00 hs (7 PM)

  // CONFIGURACIÓN DE ARCHIVOS
  // Archivo donde se guarda el historial de ideas enviadas
  HISTORIAL_FILE: './historial-citas.json',

  // CONFIGURACIÓN DE MENSAJES
  // Plantilla del mensaje que se enviará
  // {idea} será reemplazado por la idea de cita seleccionada
  MENSAJE_TEMPLATE: process.env.MENSAJE_TEMPLATE || 'Amor, ¿te gustaría hacer {idea} mañana? 💕',

  // MODO DEBUG
  // Si está en true, muestra logs más detallados
  DEBUG: process.env.DEBUG === 'true' || false,

  // ZONA HORARIA
  // Zona horaria de Buenos Aires
  TIMEZONE: 'America/Argentina/Buenos_Aires',
};

module.exports = config;
