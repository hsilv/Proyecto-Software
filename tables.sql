CREATE TABLE coleccion(
    "id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "nombre" TEXT NOT NULL
);

CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    pfp VARCHAR(255) NOT NULL,
    followers BIGINT NOT NULL,
    password TEXT NOT NULL,
    rol TEXT NOT NULL
);
ALTER TABLE
    usuario ADD CONSTRAINT usuario_username_unique UNIQUE("username");

CREATE TABLE receta_guardada(
    id SERIAL PRIMARY KEY,
    receta_id BIGINT NOT NULL,
    coleccion_id BIGINT NOT NULL
);
	
CREATE TABLE follow(
    id SERIAL PRIMARY KEY,
    seguidor BIGINT NOT NULL,
    seguido BIGINT NOT NULL
);

CREATE TABLE paso(
    id SERIAL PRIMARY KEY,
    receta_id BIGINT NOT NULL,
    numero SMALLINT NOT NULL,
    descripcion TEXT NOT NULL,
    multimedia_url TEXT NOT NULL
);

CREATE TABLE miniatura(
    id SERIAL PRIMARY KEY,
    receta_id BIGINT NOT NULL,
    url TEXT NOT NULL
);

CREATE TABLE receta(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    autor_id BIGINT NOT NULL,
    tiempo INTEGER NOT NULL,
    ingredientes TEXT[][] NOT NULL,
    fecha DATE NOT NULL,
    avg_calificacion REAL NOT NULL,
    pais VARCHAR(50) NULL,
    categoria_id BIGINT NOT NULL
);

CREATE TABLE Categoria(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL
);

CREATE TABLE comentario(
    id SERIAL PRIMARY KEY,
    autor_id BIGINT NOT NULL,
    receta_id BIGINT NOT NULL,
    fecha TIMESTAMP WITH TIME ZONE NOT NULL,
    comentario TEXT NOT NULL,
    calificacion DOUBLE PRECISION NULL
);

ALTER TABLE comentario 
ADD CONSTRAINT "fk_receta_id" FOREIGN KEY(receta_id) REFERENCES Receta(id);
	
ALTER TABLE follow
ADD CONSTRAINT "fk_follower" FOREIGN KEY(seguidor) REFERENCES usuario(id);
	
ALTER TABLE comentario 
ADD CONSTRAINT "fk_autor_id" FOREIGN KEY(autor_id) REFERENCES Usuario(id);
	
ALTER TABLE receta
ADD CONSTRAINT "fk_autor_id" FOREIGN KEY(autor_id) REFERENCES usuario(id);
	
ALTER TABLE receta
ADD CONSTRAINT "fk_categoria_id" FOREIGN KEY(categoria_id) REFERENCES categoria(id);
	
ALTER TABLE follow 
ADD CONSTRAINT "fk_followee" FOREIGN KEY(seguido) REFERENCES usuario(id);
	
ALTER TABLE receta_guardada
ADD CONSTRAINT "fk_coleccion_id" FOREIGN KEY(coleccion_id) REFERENCES coleccion(id);
	
ALTER TABLE miniatura
ADD CONSTRAINT "fk_receta_id" FOREIGN KEY(receta_id) REFERENCES receta(id);
	
ALTER TABLE receta_guardada
ADD CONSTRAINT "fk_receta_id" FOREIGN KEY(receta_id) REFERENCES receta(id);
	
ALTER TABLE coleccion 
ADD CONSTRAINT "fk_user_id" FOREIGN KEY(user_id) REFERENCES usuario(id);
	
ALTER TABLE paso
ADD CONSTRAINT "fk_receta_id" FOREIGN KEY(receta_id) REFERENCES receta(id);	

ALTER TABLE paso ALTER COLUMN multimedia_url DROP NOT NULL;
