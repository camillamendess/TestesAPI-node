import db from "../../db/dbconfig"; 
import { describe, expect } from "@jest/globals"; 

// Descreve um grupo de testes relacionado à configuração e funcionamento do banco de dados
describe("Testando configDB", () => {
  
  // Define um teste que verifica a conexão e manipulação de dados no banco de dados
  it("Teste de conexão com o banco de dados", async () => {
    // Cria um objeto mock (simulação) de um autor, que será inserido no banco de dados
    const autorMock = {
      nome: "Rafael", // Nome do autor
      nacionalidade: "Brasileiro", // Nacionalidade do autor
      created_at: new Date().toISOString(), // Data de criação (ISO 8601)
      updated_at: new Date().toISOString(), // Data de atualização
    };

    // Insere o autor no banco de dados e, em seguida, recupera o autor recém-criado
    const autorSalvo = await db("autores")
      .insert(autorMock) // Insere os dados do autor na tabela "autores"
      .then((retorno) => db("autores").where("id", retorno[0])) // Busca o autor inserido com o ID retornado
      .then((autorSelecionado) => autorSelecionado[0]); // Retorna o primeiro autor encontrado

    // Compara se o nome do autor salvo no banco de dados é igual ao nome do autor simulado
    expect(autorSalvo.nome).toBe(autorMock.nome);

    // Após a verificação, deleta o autor inserido para garantir que o banco de dados não fique poluído com dados de teste
    await db("autores").where({ id: autorSalvo.id }).del();
  });
});
