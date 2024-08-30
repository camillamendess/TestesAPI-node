import request from 'supertest';
import {
  afterEach, beforeEach, describe, it,
} from '@jest/globals';
import app from '../../app.js';

let servidor;
beforeEach(() => {
  const porta = 3000;
  servidor = app.listen(porta);
});

afterEach(() => {
  servidor.close();
});

describe('Testando a rota da API Login (POST)', () => {
  it('O login deve possuir um email e senha para se autenticar', async () => {
    const loginMock = {
      email: 'rapha@teste.com.br',
    };

    await request(servidor)
      .post('/login')
      .send(loginMock)
      .expect(500)
      .expect('"A senha de usuario é obrigatório."'); // Corrigir a mensagem conforme o esperado pela API
  });

  it('O login deve validar se o usuário está cadastrado', async () => {
    const loginMock = {
      email: 'raphael.teste@teste.com.br',
      senha: '123456',
    };

    await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(500)
      .expect('"Usuario não cadastrado."'); // Sem acentuação para alinhar com a mensagem da API
  });

  it('O login deve validar email e senha incorreto', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
      senha: '12345',
    };

    await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(500)
      .expect('"Usuario ou senha invalido."'); // Sem acentuação para alinhar com a mensagem da API
  });

  it('O login deve validar se está sendo retornado um accessToken', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
      senha: '123456',
    };

    const resposta = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(201);

    expect(resposta.body.message).toBe('Usuario conectado'); // Sem acentuação para alinhar com a mensagem da API
    expect(resposta.body).toHaveProperty('accessToken');
  });
});
