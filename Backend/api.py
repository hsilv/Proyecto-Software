from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_jwt_extended import *
import jwt
import json
import dbFunctions
import psycopg2
from datetime import datetime, timedelta

# Test
cadena_json = '{"message": "Test"}'
objeto_json = json.loads(cadena_json)

app = Flask(__name__)
app.config['DATABASE_URI'] = 'postgresql://postgres:agriodude@localhost/asdas'
app.config['SECRET_KEY'] = 'SILVA'

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


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


@app.route('/', methods=['GET', 'POST'])
def hello():
    return objeto_json
    '''connection = connect()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM USUARIO')
    results = cursor.fetchall()
    cursor.close()
    connection.close()
    return results'''


@app.route('/login', methods=['GET'])
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

@app.route('/login2', methods=['POST'])
def login2():
    user = request.get_json()
    print(user)
    return jsonify(dbFunctions.login(user['username'], user['password']))

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

if __name__ == '__main__':
    app.run()

