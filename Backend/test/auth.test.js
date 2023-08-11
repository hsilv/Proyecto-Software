/* eslint-disable no-undef */
import request from 'supertest';
import app from '../bin/index.js';

const server = app;

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
    const response = await request(server).post('/auth/check').send().set(headers);
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

describe('GET /recipe/?id=546545121354', () => {
  // Test de receta inexistente
  test('test should respond with a 404 status code', async () => {
    const response = await request(server).get('/auth/login').query({
      id: 546545121354,
    });
    expect(response.statusCode).toBe(404);
  });
});

export default server;
