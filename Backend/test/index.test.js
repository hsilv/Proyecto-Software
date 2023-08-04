/* eslint-disable no-undef */
import request from 'supertest';
import app from '../bin/index.js';

describe('GET /auth/login', () => {
  test('test should respond with a 404 status code', async () => {
    const response = await request(app).get('/auth/login').send();
    expect(response.statusCode).toBe(404);
  });
  test('test should respond with a 200 status code', async () => {
    const response = await request(app).get('/auth/login').send();
    expect(response.statusCode).toBe(200);
  });
});
