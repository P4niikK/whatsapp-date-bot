/**
 * Configuración de PM2 para el Bot de Citas
 *
 * Este archivo permite gestionar el bot con PM2 de forma más eficiente
 * Uso: pm2 start ecosystem.config.js
 */

module.exports = {
  apps: [{
    name: 'date-bot',
    script: './bot.js',

    // Opciones de ejecución
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',

    // Variables de entorno (se pueden sobrescribir con .env)
    env: {
      NODE_ENV: 'production',
    },

    // Configuración de logs
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,

    // Reiniciar si crashea
    min_uptime: '10s',
    max_restarts: 10,
  }]
};
