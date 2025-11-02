const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const config = require('./config');
const { obtenerIdeaAleatoria, obtenerEstadisticas } = require('./ideas-citas');
const Scheduler = require('./scheduler');

/**
 * BOT DE CITAS ROMÁNTICAS PARA WHATSAPP
 *
 * Bot que envía ideas de citas aleatorias cada 2 días
 * a través de WhatsApp Web
 */

class DateBot {
  constructor() {
    // Inicializar cliente de WhatsApp
    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: 'date-bot',
      }),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });

    // Inicializar scheduler
    this.scheduler = new Scheduler();

    // Cargar historial
    this.historial = this.cargarHistorial();

    // Modo prueba
    this.modoPrueba = process.argv.includes('--test');

    // Configurar eventos
    this.configurarEventos();
  }

  /**
   * Configura los eventos del cliente de WhatsApp
   */
  configurarEventos() {
    // Evento: QR generado
    this.client.on('qr', (qr) => {
      console.log('\n📱 ESCANEA ESTE CÓDIGO QR CON WHATSAPP:\n');
      qrcode.generate(qr, { small: true });
      console.log('\n⚠️  Abre WhatsApp en tu teléfono y escanea el código de arriba');
      console.log('   Configuración > Dispositivos vinculados > Vincular dispositivo\n');
    });

    // Evento: Autenticación exitosa
    this.client.on('authenticated', () => {
      console.log('✅ Autenticación exitosa!');
    });

    // Evento: Cliente listo
    this.client.on('ready', () => {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🤖 BOT DE CITAS INICIADO CORRECTAMENTE');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      // Mostrar estadísticas
      this.mostrarEstadisticas();

      // Iniciar programación de envíos
      if (this.modoPrueba) {
        console.log('🧪 MODO PRUEBA ACTIVADO\n');
        this.scheduler.programarEnvioInmediato(() => this.enviarMensajeCita());
      } else {
        this.programarProximoEnvio();
      }
    });

    // Evento: Error de autenticación
    this.client.on('auth_failure', (msg) => {
      console.error('❌ Error de autenticación:', msg);
      console.log('💡 Intenta eliminar la carpeta .wwebjs_auth/ y volver a escanear el QR');
    });

    // Evento: Desconectado
    this.client.on('disconnected', (reason) => {
      console.log('⚠️  Bot desconectado:', reason);
      console.log('🔄 Intentando reconectar...');
    });

    // Evento: Mensaje recibido (opcional, para debugging)
    if (config.DEBUG) {
      this.client.on('message', (msg) => {
        console.log('📨 Mensaje recibido:', msg.from, '-', msg.body);
      });
    }
  }

  /**
   * Carga el historial de ideas enviadas desde el archivo JSON
   * @returns {Array} - Array de ideas ya enviadas
   */
  cargarHistorial() {
    try {
      if (fs.existsSync(config.HISTORIAL_FILE)) {
        const data = fs.readFileSync(config.HISTORIAL_FILE, 'utf8');
        const historial = JSON.parse(data);
        console.log(`📚 Historial cargado: ${historial.ideasEnviadas.length} ideas enviadas`);
        return historial.ideasEnviadas || [];
      }
    } catch (error) {
      console.error('⚠️  Error al cargar historial:', error.message);
    }
    return [];
  }

  /**
   * Guarda el historial de ideas enviadas en el archivo JSON
   */
  guardarHistorial() {
    try {
      const data = {
        ideasEnviadas: this.historial,
        ultimoEnvio: new Date().toISOString(),
        totalEnviados: this.historial.length,
      };

      fs.writeFileSync(
        config.HISTORIAL_FILE,
        JSON.stringify(data, null, 2),
        'utf8'
      );

      if (config.DEBUG) {
        console.log('💾 Historial guardado correctamente');
      }
    } catch (error) {
      console.error('❌ Error al guardar historial:', error.message);
    }
  }

  /**
   * Muestra estadísticas del bot
   */
  mostrarEstadisticas() {
    const stats = obtenerEstadisticas();

    console.log('📊 ESTADÍSTICAS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`💡 Total de ideas disponibles: ${stats.totalIdeas}`);
    console.log(`📨 Ideas ya enviadas: ${this.historial.length}`);
    console.log(`🆕 Ideas restantes: ${stats.totalIdeas - this.historial.length}`);
    console.log(`👥 Número de pareja: ${config.NUMERO_PAREJA}`);
    console.log(`⏱️  Intervalo: cada ${config.INTERVALO_DIAS} días`);
    console.log(`🕐 Horario: ${config.HORA_INICIO}:00 - ${config.HORA_FIN}:00 hs`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }

  /**
   * Envía el mensaje de cita por WhatsApp
   */
  async enviarMensajeCita() {
    try {
      console.log('\n📤 PREPARANDO ENVÍO DE MENSAJE...\n');

      // Obtener idea aleatoria no repetida
      const idea = obtenerIdeaAleatoria(this.historial);

      // Formatear número de WhatsApp
      const numeroFormateado = `${config.NUMERO_PAREJA}@c.us`;

      // Crear mensaje desde la plantilla
      const mensaje = config.MENSAJE_TEMPLATE.replace('{idea}', idea);

      // Enviar mensaje
      await this.client.sendMessage(numeroFormateado, mensaje);

      // Guardar en historial
      this.historial.push(idea);
      this.guardarHistorial();

      // Log de éxito
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ MENSAJE ENVIADO EXITOSAMENTE');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📱 Para: ${config.NUMERO_PAREJA}`);
      console.log(`💡 Idea: ${idea}`);
      console.log(`📝 Mensaje: ${mensaje}`);
      console.log(`⏰ Hora: ${new Date().toLocaleString('es-AR', { timeZone: config.TIMEZONE })}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      // Programar siguiente envío (solo si no está en modo prueba)
      if (!this.modoPrueba) {
        this.programarProximoEnvio();
      } else {
        console.log('🧪 Modo prueba finalizado. El bot seguirá funcionando normalmente.');
        console.log('💡 Próximo envío programado se hará automáticamente.\n');
        this.programarProximoEnvio();
      }

    } catch (error) {
      console.error('\n❌ ERROR AL ENVIAR MENSAJE');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('Detalles:', error.message);
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      // Reintentar en 5 minutos
      console.log('🔄 Reintentando en 5 minutos...\n');
      setTimeout(() => {
        this.enviarMensajeCita();
      }, 5 * 60 * 1000);
    }
  }

  /**
   * Programa el próximo envío de mensaje
   */
  programarProximoEnvio() {
    this.scheduler.programarProximoEnvio(() => {
      this.enviarMensajeCita();
    });
  }

  /**
   * Inicia el bot
   */
  iniciar() {
    console.log('\n🚀 INICIANDO BOT DE CITAS...\n');
    this.client.initialize();
  }

  /**
   * Detiene el bot
   */
  async detener() {
    console.log('\n⏹️  Deteniendo bot...');
    this.scheduler.cancelarEnvio();
    await this.client.destroy();
    console.log('✅ Bot detenido correctamente\n');
    process.exit(0);
  }
}

// ============================================
// INICIAR BOT
// ============================================

const bot = new DateBot();
bot.iniciar();

// Manejo de señales de cierre
process.on('SIGINT', async () => {
  await bot.detener();
});

process.on('SIGTERM', async () => {
  await bot.detener();
});

// Manejo de errores no capturados
process.on('unhandledRejection', (error) => {
  console.error('❌ Error no manejado:', error);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Excepción no capturada:', error);
});
