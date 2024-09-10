import {
  describe, expect, it, jest,
} from '@jest/globals'; 
import Editora from '../../models/editora.js'; 

describe('Testando o modelo Editora', () => {
  // Objeto de exemplo que será utilizado como mock nos testes
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'Sao Paulo',
    email: 'c@c.com',
  };

  // Teste que verifica se uma instância de Editora é criada corretamente
  it('Deve instanciar uma nova editora', () => {
    // Cria uma nova instância de Editora com os dados do objeto mock
    const editora = new Editora(objetoEditora);

    // Verifica se a instância criada contém os mesmos dados que o objeto mock
    expect(editora).toEqual(
      expect.objectContaining(objetoEditora), // Compara se as propriedades da instância correspondem ao mock
    );
  });

  // Teste que verifica se a editora pode ser salva no banco de dados (ignorado temporariamente com `.skip`)
  it.skip('Deve salvar editora no BD', () => {
    const editora = new Editora(objetoEditora); // Cria uma nova instância de Editora

    // Chama o método `salvar` e, ao resolver a promise, verifica se o nome da editora salva é 'CDC'
    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });

  // Teste que usa sintaxe moderna async/await para salvar a editora no banco de dados (ignorado temporariamente)
  it.skip('Deve salvar no BD usando a sintaxe moderna', async () => {
    const editora = new Editora(objetoEditora); // Cria uma nova instância de Editora

    // Usa `await` para esperar o salvamento da editora
    const dados = await editora.salvar();

    // Após salvar, busca a editora pelo ID retornado e verifica se os dados estão corretos
    const retornado = await Editora.pegarPeloId(dados.id);

    // Verifica se o objeto retornado contém os valores esperados
    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number), // Espera que o campo ID seja um número
        ...objetoEditora, // Espera que as demais propriedades correspondam ao mock
        created_at: expect.any(String), // Espera que a data de criação seja uma string
        updated_at: expect.any(String), // Espera que a data de atualização seja uma string
      }),
    );
  });

  // Teste que simula a chamada ao banco de dados usando `jest.fn()` para mockar o método `salvar`
  it('Deve fazer uma chamada simulada ao BD', () => {
    const editora = new Editora(objetoEditora); // Cria uma nova instância de Editora

    // Mocka o método `salvar` para retornar um objeto simulado, sem realmente interagir com o banco de dados
    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'CDC',
      cidade: 'Sao Paulo',
      email: 'c@c.com',
      created_at: '2022-10-01', // Data simulada de criação
      updated_at: '2022-10-01', // Data simulada de atualização
    });

    // Chama o método mockado e armazena o retorno
    const retorno = editora.salvar();

    // Verifica se o retorno contém os valores esperados
    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number), // Verifica se o ID é um número
        ...objetoEditora, // Verifica se as outras propriedades correspondem ao mock
        created_at: expect.any(String), // Verifica se a data de criação é uma string
        updated_at: expect.any(String), // Verifica se a data de atualização é uma string
      }),
    );
  });
});
