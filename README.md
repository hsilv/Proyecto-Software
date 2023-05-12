# Proyecto-Software

## Backend
Para ejecutar el Backend es necesario

Crear un entorno virtual de Python
```
py -3 -m venv .venv
```
Activarlo
```
.venv\Scripts\activate
```
Actualizar pip
```
python -m pip install -U pip
```
Luego instalar dependencias de la aplicación
```
pip install flask psycopg2 jwt flask_jwt_extended python-dotenv
```
Luego instalar dependencias de sistema
```
pip install -U flask-cors
```
Por último, ejecutar el servidor
```
flask --app api run
```
Si se obtiene un error relacionado a JWT:
```
pip install "PyJWT==1.7.1"
```
```
pip install "PyJWT==2.1.0"
```
