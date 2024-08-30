import db from "../../db/dbconfig";

import { describe, expect } from "@jest/globals";
import db from "../../db/dbconfig";

describe("Testando configDB", () => {
  it("Teste de conexão com o banco de dados", async () => {
    const autorMock = {
      nome: "Rafa",
      nacionalidade: "Brasileiro",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const autorSalvo = await db("autores")
      .insert(autorMock)
      .then((retorno) => db("autores").where("id", retorno[0]))
      .then((autorSelecionado) => autorSelecionado);

      expect(autorSalvo.nome).toBe(autorMock.nome);
  });
});
