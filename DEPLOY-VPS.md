# 🚀 GUÍA DE DEPLOY EN VPS HOSTINGER

Sigue estos pasos **en tu VPS** para deployar el bot.

## PASO 1: Conectarse al VPS

Abre una terminal y conéctate a tu VPS:

```bash
ssh usuario@tu-servidor.com
```

*(Reemplaza con tus credenciales de Hostinger)*

---

## PASO 2: Verificar/Instalar Node.js

Ejecuta esto para verificar si tienes Node.js:

```bash
node --version
npm --version
```

### Si NO tienes Node.js instalado:

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18.x (versión LTS recomendada)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalación
node --version
npm --version
```

Deberías ver algo como:
- Node: v18.x.x
- npm: 9.x.x

---

## PASO 3: Clonar el repositorio

```bash
# Ir al directorio home
cd ~

# Clonar el repositorio
git clone https://github.com/P4niikK/whatsapp-date-bot.git

# Entrar al directorio
cd whatsapp-date-bot

# Verificar que los archivos estén ahí
ls -la
```

Deberías ver todos los archivos: bot.js, config.js, package.json, etc.

---

## PASO 4: Instalar dependencias

```bash
npm install
```

Esto instalará whatsapp-web.js y todas las dependencias necesarias.

---

## PASO 5: Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar el archivo (usa nano o vim)
nano .env
```

**Configuración a editar:**

```bash
NUMERO_PAREJA=5491139313218
INTERVALO_DIAS=2
HORA_INICIO=15
HORA_FIN=19
MENSAJE_TEMPLATE=Amor, ¿te gustaría {idea} mañana? 💕
DEBUG=false
```

**Guardar y salir:**
- En nano: `Ctrl+X`, luego `Y`, luego `Enter`
- En vim: `Esc`, luego `:wq`, luego `Enter`

---

## PASO 6: Escanear QR de WhatsApp (PRIMERA VEZ)

**⚠️ IMPORTANTE:** Este paso solo se hace UNA vez para autenticar.

```bash
npm start
```

Vas a ver un código QR en la terminal. Ahora:

1. Abre WhatsApp en tu teléfono
2. Ve a **Configuración > Dispositivos vinculados**
3. Toca **Vincular dispositivo**
4. Escanea el código QR que aparece en la terminal

Cuando veas "✅ BOT DE CITAS INICIADO CORRECTAMENTE", presiona `Ctrl+C` para detener el bot.

---

## PASO 7: Instalar PM2

PM2 mantendrá el bot corriendo 24/7, incluso si se reinicia el servidor.

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Verificar instalación
pm2 --version
```

---

## PASO 8: Iniciar el bot con PM2

```bash
# Opción 1: Usar el archivo de configuración (RECOMENDADO)
pm2 start ecosystem.config.js

# Opción 2: Comando directo
pm2 start bot.js --name "date-bot"

# Ver el estado
pm2 status

# Ver los logs
pm2 logs date-bot

# Si todo está bien, guardar la configuración
pm2 save
```

---

## PASO 9: Configurar auto-inicio

Para que el bot se inicie automáticamente si se reinicia el servidor:

```bash
pm2 startup
```

Este comando te va a dar una línea para ejecutar con `sudo`. **Cópiala y ejecútala**.

Ejemplo de lo que te dará:
```bash
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u usuario --hp /home/usuario
```

Después ejecuta:
```bash
pm2 save
```

---

## ✅ VERIFICACIÓN FINAL

### Ver que el bot esté corriendo:

```bash
pm2 status
```

Debería mostrar:
```
┌─────┬────────────┬─────────────┬─────────┬─────────┬──────────┐
│ id  │ name       │ mode        │ status  │ cpu     │ memory   │
├─────┼────────────┼─────────────┼─────────┼─────────┼──────────┤
│ 0   │ date-bot   │ fork        │ online  │ 0%      │ 50.0mb   │
└─────┴────────────┴─────────────┴─────────┴─────────┴──────────┘
```

### Ver los logs:

```bash
pm2 logs date-bot --lines 50
```

Deberías ver:
- ✅ BOT DE CITAS INICIADO CORRECTAMENTE
- 📊 ESTADÍSTICAS
- ⏰ PRÓXIMO ENVÍO PROGRAMADO

### Detener logs:
Presiona `Ctrl+C` (el bot seguirá corriendo)

---

## 📋 COMANDOS ÚTILES DE PM2

```bash
# Ver estado
pm2 status

# Ver logs en tiempo real
pm2 logs date-bot

# Reiniciar el bot
pm2 restart date-bot

# Detener el bot
pm2 stop date-bot

# Eliminar el bot de PM2
pm2 delete date-bot

# Ver información detallada
pm2 info date-bot

# Ver uso de CPU/memoria
pm2 monit
```

---

## 🔧 TROUBLESHOOTING

### Error: "Cannot find module"

```bash
cd ~/whatsapp-date-bot
rm -rf node_modules package-lock.json
npm install
pm2 restart date-bot
```

### Volver a escanear QR

```bash
cd ~/whatsapp-date-bot
rm -rf .wwebjs_auth/
pm2 restart date-bot
pm2 logs date-bot
# Escanea el nuevo QR
```

### Actualizar el código

```bash
cd ~/whatsapp-date-bot
git pull origin main
npm install
pm2 restart date-bot
```

### Ver historial de ideas enviadas

```bash
cat ~/whatsapp-date-bot/historial-citas.json
```

### Reiniciar el ciclo de ideas

```bash
rm ~/whatsapp-date-bot/historial-citas.json
pm2 restart date-bot
```

---

## 🎉 ¡LISTO!

Tu bot ahora está corriendo 24/7 en el VPS de Hostinger.

**¿Qué hace ahora?**
- Cada 2 días enviará una idea de cita aleatoria
- A una hora aleatoria entre 15:00 y 19:00 hs
- No repetirá ideas hasta usar todas

**Para verificar:**
```bash
pm2 logs date-bot
```

**Para desconectarte del VPS:**
```bash
exit
```

El bot seguirá corriendo aunque cierres la conexión SSH. ✨
