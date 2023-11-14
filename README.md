# Proyecto-Software

## Backend
Para ejecutar el Backend es necesario poseer el manejador de paquetes `pnpm` de NodeJS.

Para instalar pnpm hace falta abrir una terminal con permisos de administrador en cualquier sistema operativo y colocar:
```
corepack enable
```
Luego se deben instalar las dependencias dentro de la carpeta **Backend** con:
```
pnpm i
```
Para correr el servidor existen varios scripts:
- Para testing: `pnpm run test`
- Para simular un deploy en desarrollo: `pnpm run start`
- Para debugging: `pnpm run inspect`
- Para desarrollo: `pnpm run dev`
- Para deploy de producción: `pnpm run production`
