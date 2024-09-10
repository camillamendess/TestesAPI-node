import request from 'supertest'; // Importa o Supertest para testar requisições HTTP
import { afterEach, beforeEach, describe } from '@jest/globals'; 
import app from '../../app'; // Importa o aplicativo Express

// Variável para armazenar o servidor
let servidor;

// Inicializa o servidor antes de cada teste
beforeEach(() => {
  const porta = 3000; // Define a porta em que o servidor será executado
  servidor = app.listen(porta); // Inicia o servidor na porta definida
});

// Fecha o servidor após cada teste para evitar conflitos de porta
afterEach(() => {
  servidor.close();
});

// Grupo de testes para a rota de login (POST)
describe('Testando a rota login (POST)', () => {

  // Teste para garantir que o login deve conter email e senha
  it('O login deve possuir um email e senha para se autenticar', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br', // Apenas email enviado, sem senha
    };

    // Faz uma requisição POST para a rota /login
    await request(servidor)
      .post('/login')
      .send(loginMock) // Envia o objeto com apenas o email
      .expect(500) // Espera um status de erro 500 (Internal Server Error)
      .expect('"A senha de usuario é obrigatório."'); // Verifica a mensagem de erro
  });

  // Teste para verificar se o usuário está cadastrado
  it('O login deve validar se o usuario esta cadastrado', async () => {
    const loginMock = {
      email: 'raphael.teste@teste.com.br', // Email não cadastrado
      senha: '123456', // Senha enviada
    };

    // Faz uma requisição POST para a rota /login
    await request(app)
      .post('/login')
      .set('Accept', 'application/json') // Define o cabeçalho Accept para JSON
      .send(loginMock) // Envia o objeto com email e senha
      .expect(500) // Espera um status de erro 500 (Internal Server Error)
      .expect('"Usuario não cadastrado."'); // Verifica a mensagem de erro
  });

  // Teste para validar email e senha incorretos
  it('O login deve validar email e senha incorreto', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br', // Email cadastrado
      senha: '12345', // Senha incorreta
    };

    // Faz uma requisição POST para a rota /login
    await request(app)
      .post('/login')
      .set('Accept', 'application/json') // Define o cabeçalho Accept para JSON
      .send(loginMock) // Envia o objeto com email e senha incorreta
      .expect(500) // Espera um status de erro 500 (Internal Server Error)
      .expect('"Usuario ou senha invalido."'); // Verifica a mensagem de erro
  });

  // Teste para verificar se um token de acesso é retornado ao realizar login com sucesso
  it('O login deve validar se esta sendo retornado um accessToken', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br', // Email cadastrado
      senha: '123456', // Senha correta
    };

    // Faz uma requisição POST para a rota /login
    const resposta = await request(app)
      .post('/login')
      .set('Accept', 'application/json') // Define o cabeçalho Accept para JSON
      .send(loginMock) // Envia o objeto com email e senha corretos
      .expect(201); // Espera um status 201 (Created), indicando sucesso na autenticação

    // Verifica se a resposta contém a mensagem de sucesso e um accessToken
    expect(resposta.body.message).toBe('Usuario conectado'); // Verifica a mensagem de sucesso
    expect(resposta.body).toHaveProperty('accessToken'); // Verifica se o accessToken foi retornado
  });
});
