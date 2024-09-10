import request from 'supertest'; // Importa o supertest para testar as rotas HTTP
import {
  describe, expect, it, jest,
} from '@jest/globals'; 
import app from '../../app.js'; // Importa a aplicação Express

// Variável para armazenar o servidor
let server;

// Antes de cada teste, o servidor é iniciado na porta 3000
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

// Após cada teste, o servidor é encerrado
afterEach(() => {
  server.close();
});

// Grupo de testes para o método GET na rota /editoras
describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    // Realiza uma requisição GET para /editoras
    const resposta = await request(app)
      .get('/editoras') // Caminho da rota
      .set('Accept', 'application/json') // Define que o formato de resposta deve ser JSON
      .expect('content-type', /json/) // Verifica se o content-type da resposta contém JSON
      .expect(200); // Espera que o status da resposta seja 200

    // Verifica se o email da primeira editora na lista corresponde ao esperado
    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

// Variável para armazenar o ID da resposta do POST
let idResposta;

// Grupo de testes para o método POST na rota /editoras
describe('POST em /editoras', () => {
  it('Deve adicionar uma nova editora', async () => {
    // Realiza uma requisição POST para /editoras com os dados da nova editora
    const resposta = await request(app)
      .post('/editoras')
      .send({
        nome: 'CDC', // Nome da editora
        cidade: 'Sao Paulo', // Cidade da editora
        email: 's@s.com', // Email da editora
      })
      .expect(201); // Espera que o status da resposta seja 201 (Created)

    // Armazena o ID da editora criada para usar nos próximos testes
    idResposta = resposta.body.content.id;
  });

  // Teste para garantir que não é possível adicionar uma editora com o body vazio
  it('Deve nao adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/editoras') // Caminho da rota
      .send({}) // Body vazio
      .expect(400); // Espera que o status da resposta seja 400 (Bad Request)
  });
});

// Grupo de testes para o método GET em /editoras/id
describe('GET em /editoras/id', () => {
  it('Deve retornar recurso selecionado', async () => {
    // Realiza uma requisição GET para /editoras com o ID da editora criada no teste anterior
    await request(app)
      .get(`/editoras/${idResposta}`)
      .expect(200); // Espera que o status da resposta seja 200
  });
});

// Grupo de testes para o método PUT em /editoras/id
describe('PUT em /editoras/id', () => {
  // Testa vários campos diferentes utilizando `test.each` para evitar repetição de código
  test.each([
    ['nome', { nome: 'Casa do Codigo' }], // Testa a alteração do campo "nome"
    ['cidade', { cidade: 'SP' }], // Testa a alteração do campo "cidade"
    ['email', { email: 'cdc@cdc.com' }], // Testa a alteração do campo "email"
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request }; // Simula a função de requisição
    const spy = jest.spyOn(requisicao, 'request'); // Cria um spy para monitorar a função de requisição

    // Realiza a requisição PUT com o parâmetro especificado
    await requisicao.request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204); // Espera que o status da resposta seja 204 (No Content)

    // Verifica se a função de requisição foi chamada
    expect(spy).toHaveBeenCalled();
  });
});

// Grupo de testes para o método DELETE em /editoras/id
describe('DELETE em /editoras/id', () => {
  it('Deletar o recurso adcionado', async () => {
    // Realiza a requisição DELETE para remover a editora criada no teste de POST
    await request(app)
      .delete(`/editoras/${idResposta}`)
      .expect(200); // Espera que o status da resposta seja 200 (OK)
  });
});
