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

### Rutas
##### auth
* `auth/login`: Solo posee **POST**, recibe como body un JSON non las propiedades `username` y `password`, de existir credenciales incorrectas devolverá un estado HTTP 203 y un mensaje indicándolo, de ser correcto, enviará un JSON con la propiedad `token` que contendrá el token de autenticación.
* `auth/check`: Solo posee **POST**, está destinado a chequear la validez del token, tanto en firma como en expiración, este deberá mandarse como un texto por medio del header `Authorization`, con el cual devolverá un JSON con la información básica del usuario autenticado, o un JSON con el estado de error y su mensaje.
* `auth/register`: Solo posee **POST**, está destinado a registrar al usuario, de recibirá los datos del nuevo usuario, de existir el nombre de usuario o el correo, devolverá un JSON con un estado de error verdadero y un mensaje de la secuencia.