/* eslint-disable no-undef */
import request from 'supertest';
import app from '../bin/index.js';

describe('GET /auth/login', () => {
  // Test de ruta inexistente para /auth/login con GET
  test('test should respond with a 404 status code', async () => {
    const response = await request(app).get('/auth/login').send();
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /auth/login username: silva, password: 1234', () => {
  // Test de ruta existente y aceptación de /auth/login con POST
  test('test should respond with a 200 status code', async () => {
    const response = await request(app).post('/auth/login').send({
      username: 'silva',
      password: '1234',
    });
    expect(response.statusCode).toBe(200);
  });

  // Test de devolución de JSON con token definido al hacer POST válido con /auth/login
  test('test should respond with a JSON with a defined token inside', async () => {
    const response = await request(app).post('/auth/login').send({
      username: 'silva',
      password: '1234',
    });
    expect(response.body.token).toBeDefined();
  });
});
