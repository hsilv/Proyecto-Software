import jwt
import psycopg2

def connect():
    connection = psycopg2.connect('postgresql://postgres:agriodude@localhost/asdas')
    return connection

def login(user, password):
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