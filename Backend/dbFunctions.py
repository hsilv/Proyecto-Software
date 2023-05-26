import os
from dotenv import load_dotenv
import jwt
import psycopg2
from datetime import datetime, timedelta

load_dotenv()

def connect():
    connection = psycopg2.connect(os.environ["POSTGRESQL_URL"])
    return connection

def home():
    top_recipes = []
    db = connect()
    cur = db.cursor()
    
    cur.execute("""
        SELECT RECETA.ID, RECETA.NOMBRE, USUARIO.USERNAME, RECETA.TIEMPO, RECETA.DESCRIPCION, RECETA.AVG_CALIFICACION, MINIATURA.URL
        FROM RECETA
        JOIN MINIATURA ON RECETA.ID = MINIATURA.RECETA_ID
        JOIN USUARIO ON RECETA.AUTOR_ID = USUARIO.ID
        ORDER BY RECETA.AVG_CALIFICACION DESC
        ;
    """)

    results = cur.fetchall()
    cur.close()
    db.close()

    for row in results:
        recipe = {
            "id": row[0],
            "nombre": row[1],
            "username": row[2],
            "tiempo": row[3],
            "descripcion": row[4],
            "avg_calificacion": row[5],
            "url_minatura": row[6]
        }
        top_recipes.append(recipe)

    return top_recipes

def details(receta_id):
    details_recipe = []
    db = connect()
    cur = db.cursor()

    cur.execute("""
        SELECT RECETA.ID, RECETA.NOMBRE, USUARIO.USERNAME, RECETA.TIEMPO, RECETA.DESCRIPCION, RECETA.AVG_CALIFICACION, RECETA.PAIS, CATEGORIA.NOMBRE, PASO.NUMERO, PASO.DESCRIPCION, PASO.MULTIMEDIA_URL, RECETA.INGREDIENTES, RECETA.AUTOR_ID, COMENTARIO.FECHA, COMENTARIO.COMENTARIO, COMENTARIO.CALIFICACION, MINIATURA.URL
        FROM RECETA
        JOIN MINIATURA ON RECETA.ID = MINIATURA.RECETA_ID
        JOIN USUARIO ON RECETA.AUTOR_ID = USUARIO.ID
        JOIN CATEGORIA ON RECETA.CATEGORIA_ID = CATEGORIA.ID
        JOIN PASO ON RECETA.ID = PASO.RECETA_ID
        LEFT JOIN COMENTARIO ON RECETA.ID = COMENTARIO.RECETA_ID
        WHERE RECETA.ID = %s
    """, (receta_id,))

    results = cur.fetchall()
    cur.close()
    db.close()
    print(results)

    for row in results:
        recipe_details = {
            "id": row[0],
            "nombre": row[1],
            "username": row[2],
            "tiempo": row[3],
            "descripcion": row[4],
            "avg_calificacion": row[5],
            "pais": row[6],
            "categoria": row[7],
            "numero_paso": row[8],
            "descripcion_paso": row[9],
            "multimedia_url_paso": row[10],
            "ingredientes": row[11],
            "autor_id": row[12],
            "fecha_comentario": row[13],
            "comentario": row[14],
            "calificacion": row[15],
            "url_minatura": row[16]
        }
        details_recipe.append(recipe_details)

    return details_recipe


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

def signup(username, password):
    db = connect()
    cursor = db.cursor()
    pfp = 'foto'
    rol = 'usuario'
    followers = 0
    cursor.execute(f"""
        INSERT INTO usuario (username, password, pfp, followers, rol)
        VALUES ('{username}', '{password}', '{pfp}', '{followers}', '{rol}')
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

def updateUser(username, name, desc):
  db = connect()
  cursor = db.cursor()
  cursor.execute(f"""
    UPDATE usuario SET name = '{name}', descr = '{desc}' WHERE username = '{username}'
  """
  )
  db.commit()
  cursor.close()
  db.close()

def generate_token(payload, expiration):
    payload['exp'] = datetime.utcnow() + timedelta(hours=3)
    token = jwt.encode(
        payload,
        'SILVA',
        algorithm='HS256',
    )
    return token