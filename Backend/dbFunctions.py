import os
from dotenv import load_dotenv
import jwt
import psycopg2
from datetime import datetime, timedelta

load_dotenv()

def connect():
    connection = psycopg2.connect(os.environ["POSTGRESQL_URL"])
    return connection

def login2(user, password):
  db = connect()
  cur = db.cursor()
  cur.execute(f"""
    SELECT 
      *
    FROM
      usuario
    WHERE
      username = \'{user}\' AND password = \'{password}\'
  """
  )
  row = cur.fetchone()
  db.commit()

  if row is None:
    return { "success": False, "message": "User does not exist" }

  else:
    return { "success": True, "id": row[0]}
  

def login(username, password):
  db = connect()
  cursor = db.cursor()
  cursor.execute(f"""
    SELECT 
      *
    FROM
      usuario
    WHERE
      username = \'{username}\' AND password = \'{password}\'
  """
  )
  results = cursor.fetchall()
  cursor.close()
  db.close()
  if(len(results) == 1):
    payload = {'username': username}
    expiration = datetime.utcnow() + timedelta(hours=3)
    token = generate_token(payload, expiration)
    return {'token': token}
  else:
    return False

def signup(username, password, email):
    db = connect()
    cursor = db.cursor()
    cursor.execute(f"""
        INSERT INTO usuario (username, password, email)
        VALUES ('{username}', '{password}', '{email}')
        RETURNING id
    """
    )
    inserted_id = cursor.fetchone()[0]
    db.commit()
    cursor.close()
    db.close()

    payload = {'username': username}
    expiration = datetime.utcnow() + timedelta(hours=3)
    token = generate_token(payload, expiration)

    return {'token': token, 'id': inserted_id}


def generate_token(payload, expiration):
    payload['exp'] = datetime.utcnow() + timedelta(hours=3)
    token = jwt.encode(
        payload,
        os.environ['SECRET'],
        algorithm='HS256',
    )
    return token