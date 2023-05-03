from flask import Flask, request, jsonify
import psycopg2
import jwt
from flask_jwt_extended import *
from datetime import datetime, timedelta

app = Flask(__name__)
app.config['DATABASE_URI'] = 'postgresql://postgres:1234@localhost/Proyecto'
app.config['SECRET_KEY'] = 'SILVA'


def connect():
    connection = psycopg2.connect(app.config['DATABASE_URI'])
    return connection


def generate_token(payload, expiration):
    payload['exp'] = datetime.utcnow() + timedelta(hours=5)
    token = jwt.encode(
        payload,
        app.config['SECRET_KEY'],
        algorithm='HS256',
    )
    return token


@app.route('/')
def hello():
    connection = connect()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM USUARIO')
    results = cursor.fetchall()
    cursor.close()
    connection.close()
    return results


@app.route('/login', methods=['POST'])
def login():
    info = request.get_json()
    username = info['username']
    password = info['password']
    print(checkAuth(username, password))
    if(checkAuth(username, password)):
        payload = {'username': username}
        expiration = datetime.utcnow() + timedelta(hours=3)
        token = generate_token(payload, expiration)
        return {'token': token}, 200
    else:
        return {'error': 'Autenticación incorrecta'}, 401

def checkAuth(username, password):
    connection = connect()
    cursor = connection.cursor()
    cursor.execute(f"SELECT USERNAME, PASSWORD FROM USUARIO WHERE USERNAME='{username}' AND PASSWORD='{password}'")
    results = cursor.fetchall()
    cursor.close()
    connection.close()
    if(len(results) == 1):
        return True
    else:
        return False
    
@app.route('/protected')
@jwt_required()
def protected():
    username = get_jwt_identity()
    return {'message': 'Esta es una ruta protegida'}

@app.route('/register', methods=['POST'])
def register():
    info = request.get_json()
    username = info['username']
    pfp = info['img']
    followers = 0
    password = info['password']
    rol = info['role']
    connection = connect()
    cursor = connection.cursor()
    cursor.execute(f"SELECT MAX(ID) FROM USUARIO")
    results = cursor.fetchall()
    id = results[0][0] + 1
    print(id)
    cursor.execute(f"INSERT INTO USUARIO(ID, USERNAME, PFP, FOLLOWERS, PASSWORD, ROL) VALUES ({id}, '{username}', '{pfp}', {followers}, '{password}', '{rol}')")
    cursor.execute("COMMIT")
    cursor.close()
    connection.close()
    return {'message': f"Usuario registrado con ID: {id}"}

