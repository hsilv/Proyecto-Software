/* eslint-disable no-undef */
import dotenv from 'dotenv';
import request from 'supertest';
import app from '../bin/index.js';
import storage from '../config/storage.cjs';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'testing') {
  dotenv.config({ path: '.env.test' });
}

const server = app;

describe('Strings from an ENV', () => {
  test('The item of .env should convert into JSON', async () => {
    expect(typeof process.env.STORAGE_CONFIG).toBe('string');
    console.log(process.env.STORAGE_CONFIG);
  });
});

describe('JSON from an ENV', () => {
  test('The item of .env should convert into JSON', async () => {
    const strJSON = JSON.parse(process.env.STORAGE_CONFIG);
    expect(typeof strJSON).toBe('object');
  });
});

describe('initStorage', () => {
  test('The LocalStorage should init propperly', async () => {
    const options = JSON.parse(process.env.STORAGE_CONFIG);
    if (options.stringify) {
      options.stringify = options.stringify === 'JSON.stringify' ? JSON.stringify : undefined;
    }
    if (options.parse) {
      options.parse = options.parse === 'JSON.parse' ? JSON.parse : undefined;
    }
    // eslint-disable-next-line new-cap
    const store = new storage().initStorage(options);
    expect(typeof store).toBe('object');
  });
});

describe('set and get in LocalStorage', () => {
  test('The LocalStorage should save a item', async () => {
    const options = JSON.parse(process.env.STORAGE_CONFIG);
    if (options.stringify) {
      options.stringify = options.stringify === 'JSON.stringify' ? JSON.stringify : undefined;
    }
    if (options.parse) {
      options.parse = options.parse === 'JSON.parse' ? JSON.parse : undefined;
    }
    // eslint-disable-next-line new-cap
    const store = new storage(options);
    store.setItem('ITEM', '12345');
    const x = store.getItem('ITEM');
    expect(x).toBe('12345');
  });
});

describe('GET /auth/login', () => {
  // Test de ruta inexistente para /auth/login con GET
  test('test should respond with a 404 status code', async () => {
    const response = await request(server).get('/auth/login').send();
    expect(response.statusCode).toBe(404);
  });
});

describe('PUT /auth/login', () => {
  // Test de ruta inexistente para /auth/login con PUT
  test('test should respond with a 404 status code', async () => {
    const response = await request(server).put('/auth/login').send();
    expect(response.statusCode).toBe(404);
  });
});

describe('PATCH /auth/login', () => {
  // Test de ruta inexistente para /auth/login con PATCH
  test('test should respond with a 404 status code', async () => {
    const response = await request(server).patch('/auth/login').send();
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /auth/login username: silva, password: 1234', () => {
  // Test de ruta existente y aceptación de /auth/login con POST
  test('test should respond with a 200 status code', async () => {
    const response = await request(server).post('/auth/login').send({
      username: 'silva',
      password: '1234',
    });
    expect(response.statusCode).toBe(200);
  });

  // Test de devolución de JSON con token definido al hacer POST válido con /auth/login
  test('test should respond with a JSON with a defined token inside', async () => {
    const response = await request(server).post('/auth/login').send({
      username: 'silva',
      password: '1234',
    });
    expect(response.body.token).toBeDefined();
  });

  // Test de rechazo de credenciales al hacer POST de credenciales no válidas
  test('test should respond with a 203 status code', async () => {
    const response = await request(server).post('/auth/login').send({
      username: 'silva',
      password: '12345678',
    });
    expect(response.statusCode).toBe(203);
  });

  // Test de rechazo de credenciales al hacer POST de credenciales sin body
  test('test should respond with a 203 status code', async () => {
    const response = await request(server).post('/auth/login');
    expect(response.statusCode).toBe(203);
  });
});

describe('POST /auth/check with valid token', () => {
  // Test de ruta existente y aceptación de /auth/check con POST y token válido
  test('test should respond with a 200 status code', async () => {
    const login = await request(server).post('/auth/login').send({
      username: 'silva',
      password: '1234',
    });
    const headers = {
      Authorization: login.body.token,
      'Content-Type': 'serverlication/json',
    };
    const response = await request(server)
      .post('/auth/check')
      .send()
      .set(headers);
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /auth/check without Authorization header', () => {
  // Test de ruta existente y rechazo de /auth/check con POST sin header de Autorización
  test('test should respond with a 200 status code', async () => {
    const response = await request(server).post('/auth/check').send();
    expect(response.statusCode).toBe(400);
  });
});

export default server;
