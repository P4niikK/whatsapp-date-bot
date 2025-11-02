# 💕 Bot de Citas Románticas para WhatsApp

Bot automatizado que envía ideas de citas románticas aleatorias cada 2 días por WhatsApp, adaptado específicamente para Buenos Aires (zona Belgrano-Almagro).

## 📋 Características

- ✅ Envío automático cada 2 días (configurable)
- ✅ Horarios aleatorios entre 15:00 y 19:00 hs
- ✅ +70 ideas de citas adaptadas a CABA
- ✅ No repite ideas hasta usar todas
- ✅ Historial persistente de ideas enviadas
- ✅ Autenticación permanente (LocalAuth)
- ✅ Logs detallados y informativos
- ✅ Manejo robusto de errores con reintentos
- ✅ Modo prueba para testing

## 🚀 Instalación

### Requisitos previos

- Node.js 16 o superior ([Descargar aquí](https://nodejs.org/))
- npm (viene con Node.js)
- Cuenta de WhatsApp

### Paso 1: Clonar o descargar el proyecto

```bash
cd whatsapp-date-bot
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar variables de entorno

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Edita el archivo `.env` y configura tu número de WhatsApp:
```
NUMERO_PAREJA=5491123456789
```

**Formato del número:**
- Sin espacios, guiones ni el símbolo +
- Incluye código de país (54 para Argentina)
- Incluye código de área (11 para CABA)
- Ejemplo: `5491123456789`

### Paso 4: Iniciar el bot

```bash
npm start
```

### Paso 5: Escanear código QR

1. Al iniciar, aparecerá un código QR en la terminal
2. Abre WhatsApp en tu teléfono
3. Ve a **Configuración > Dispositivos vinculados > Vincular dispositivo**
4. Escanea el código QR
5. ¡Listo! El bot está conectado

## 🎯 Modo Prueba

Para probar que el bot funciona correctamente sin esperar 2 días:

```bash
npm run test
```

Esto enviará un mensaje inmediatamente (después de 5 segundos) y luego continuará con el horario normal.

## ⚙️ Configuración

### Variables de entorno (.env)

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `NUMERO_PAREJA` | Número de WhatsApp de tu pareja | - |
| `INTERVALO_DIAS` | Días entre cada mensaje | 2 |
| `HORA_INICIO` | Hora mínima de envío (formato 24hs) | 15 |
| `HORA_FIN` | Hora máxima de envío (formato 24hs) | 19 |
| `MENSAJE_TEMPLATE` | Plantilla del mensaje | Ver .env.example |
| `DEBUG` | Modo debug (true/false) | false |

### Personalizar ideas de citas

Edita el archivo `ideas-citas.js` para:
- Agregar nuevas ideas
- Eliminar ideas que no te gusten
- Organizar por categorías
- Adaptar a tus lugares favoritos

Ejemplo:
```javascript
const ideasCitas = [
  'ir a nuestro café favorito y charlar toda la tarde',
  'picnic en el Parque Centenario con mates',
  // ... más ideas
];
```

## 📁 Estructura del Proyecto

```
whatsapp-date-bot/
├── bot.js                    # Archivo principal del bot
├── config.js                 # Configuración centralizada
├── ideas-citas.js            # Lista de ideas de citas
├── scheduler.js              # Lógica de programación de horarios
├── package.json              # Dependencias del proyecto
├── .env                      # Variables de entorno (crear desde .env.example)
├── .env.example              # Plantilla de variables de entorno
├── .gitignore                # Archivos a ignorar en Git
├── historial-citas.json      # Historial de ideas enviadas (se crea automáticamente)
└── README.md                 # Este archivo
```

## 🖥️ Deployar en PC Local

### Opción 1: Mantener la terminal abierta

Simplemente ejecuta:
```bash
npm start
```

**Desventajas:**
- Debes mantener la PC encendida 24/7
- Si cierras la terminal, el bot se detiene

### Opción 2: Usar PM2 (Recomendado)

PM2 es un gestor de procesos que mantiene el bot corriendo en segundo plano.

#### Instalar PM2

```bash
npm install -g pm2
```

#### Iniciar el bot con PM2

```bash
pm2 start bot.js --name "date-bot"
```

#### Comandos útiles de PM2

```bash
# Ver estado del bot
pm2 status

# Ver logs en tiempo real
pm2 logs date-bot

# Detener el bot
pm2 stop date-bot

# Reiniciar el bot
pm2 restart date-bot

# Eliminar el bot de PM2
pm2 delete date-bot

# Guardar la configuración para que se inicie automáticamente
pm2 save
pm2 startup
```

## ☁️ Deployar en VPS Hostinger

### Paso 1: Conectarse al VPS

```bash
ssh usuario@tu-servidor.com
```

### Paso 2: Instalar Node.js

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalación
node --version
npm --version
```

### Paso 3: Subir el proyecto al VPS

**Opción A: Usando Git (Recomendado)**

```bash
# En tu servidor
cd ~
git clone https://github.com/tu-usuario/whatsapp-date-bot.git
cd whatsapp-date-bot
npm install
```

**Opción B: Usando SCP**

```bash
# En tu PC local
scp -r whatsapp-date-bot/ usuario@tu-servidor.com:~/
```

### Paso 4: Configurar variables de entorno

```bash
cd ~/whatsapp-date-bot
cp .env.example .env
nano .env
# Edita las variables y guarda (Ctrl+X, Y, Enter)
```

### Paso 5: Instalar PM2

```bash
sudo npm install -g pm2
```

### Paso 6: Escanear QR por primera vez

```bash
# Iniciar el bot una vez para escanear el QR
npm start
```

Escanea el código QR desde tu teléfono. Una vez conectado, detén el bot con `Ctrl+C`.

### Paso 7: Iniciar con PM2

```bash
pm2 start bot.js --name "date-bot"
pm2 save
pm2 startup
```

El último comando te dará una línea para ejecutar con `sudo`. Ejecútala.

### Paso 8: Verificar que funcione

```bash
pm2 logs date-bot
pm2 status
```

## 📊 Monitoreo y Logs

### Ver logs en tiempo real

```bash
pm2 logs date-bot --lines 100
```

### Ver logs solo de este bot

```bash
pm2 logs date-bot
```

### Ver estadísticas

```bash
pm2 monit
```

## 🔧 Troubleshooting

### El bot no envía mensajes

**Posibles causas:**

1. **Número incorrecto**: Verifica el formato en `.env`
   ```
   NUMERO_PAREJA=5491123456789
   ```

2. **No está autenticado**: Vuelve a escanear el QR
   ```bash
   rm -rf .wwebjs_auth/
   npm start
   ```

3. **WhatsApp cerrado en el teléfono**: Asegúrate de que WhatsApp esté activo

### Error: "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
```

### El QR no aparece

```bash
# Asegúrate de que no haya sesiones previas
rm -rf .wwebjs_auth/
npm start
```

### Error de autenticación

```bash
# Eliminar autenticación y volver a escanear
rm -rf .wwebjs_auth/
npm start
```

### El bot se detiene solo

Si usas PC local, usa PM2:
```bash
pm2 start bot.js --name "date-bot"
pm2 save
```

### Ver historial de ideas enviadas

```bash
cat historial-citas.json
```

### Reiniciar el ciclo de ideas

Si quieres que el bot vuelva a enviar todas las ideas desde el principio:

```bash
rm historial-citas.json
pm2 restart date-bot
```

### Cambiar la hora de envío

Edita `.env`:
```
HORA_INICIO=16
HORA_FIN=20
```

Luego reinicia:
```bash
pm2 restart date-bot
```

## 🛠️ Mantenimiento

### Actualizar el bot

```bash
git pull origin main
npm install
pm2 restart date-bot
```

### Backup del historial

```bash
cp historial-citas.json historial-citas.backup.json
```

### Ver cuántas ideas quedan

El bot muestra esto al iniciar, o puedes ver el archivo:
```bash
node -e "console.log(require('./ideas-citas').obtenerEstadisticas())"
```

## 📝 Notas Importantes

- **Mantén tu PC o VPS encendido**: El bot necesita estar corriendo 24/7
- **No cierres WhatsApp en tu teléfono**: Debe estar activo para recibir mensajes
- **Revisa los logs periódicamente**: Para detectar posibles errores
- **El historial persiste**: No se pierden las ideas ya enviadas aunque reinicies el bot
- **Formato del número**: Es crucial usar el formato correcto (sin + ni espacios)

## 🎨 Personalización Avanzada

### Cambiar el mensaje

Edita `.env`:
```
MENSAJE_TEMPLATE=Mi amor, ¿qué te parece si {idea}? ❤️
```

### Cambiar el intervalo

Para enviar cada 3 días en vez de 2:
```
INTERVALO_DIAS=3
```

### Agregar más ideas

Edita `ideas-citas.js` y agrega al array:
```javascript
const ideasCitas = [
  // ... ideas existentes
  'tu nueva idea de cita aquí',
  'otra idea romántica',
];
```

## 📞 Soporte

Si tienes problemas:
1. Revisa la sección **Troubleshooting** arriba
2. Verifica los logs con `pm2 logs date-bot`
3. Asegúrate de que todas las dependencias estén instaladas
4. Verifica que el formato del número sea correcto

## 📄 Licencia

ISC

## 💖 Hecho con amor para mantener viva la chispa

¡Disfruta de las citas románticas! 🌹
