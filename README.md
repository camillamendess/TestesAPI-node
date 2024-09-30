# API de Livraria - Testes Unitários e de Integração

## Resumo do projeto

Este projeto é uma API de Livraria construída para gerenciar livros, autores, editoras e usuários, com foco em testes unitários e de integração usando o framework Jest e Supertest para validação de rotas e funcionalidades da API.

## O que são Testes Unitários e de Integração?
### Testes Unitários
Os testes unitários focam em validar partes específicas do código, como funções ou métodos, isoladamente. Eles garantem que uma função individual se comporte conforme o esperado em diferentes cenários. No contexto de uma API, por exemplo, podemos testar a função que valida os dados de entrada ou gera tokens de autenticação.

### Testes de Integração
Os testes de integração, por outro lado, têm como objetivo verificar se diferentes partes do sistema funcionam corretamente quando integradas. Isso pode envolver o teste de uma rota de API que depende de várias camadas de lógica, como validação de dados, acesso ao banco de dados e retorno de respostas adequadas ao cliente.

### Importância dos Testes
Esses dois tipos de testes são fundamentais para garantir a qualidade e estabilidade do sistema. Eles ajudam a detectar erros precocemente, facilitando a manutenção e o crescimento do projeto de forma segura. Além disso, automatizar testes diminui o risco de falhas que podem comprometer a experiência do usuário ou causar problemas maiores em produção.

## Estrutura dos Testes
Neste projeto, os testes são executados utilizando o Jest e Supertest.

### Principais Funções do Jest
- describe(): Utilizado para agrupar uma série de testes relacionados a uma mesma funcionalidade ou rota. Dentro de um describe, você pode organizar melhor seus testes e entender claramente quais partes da aplicação estão sendo testadas.
- it(): Define um caso de teste específico. Cada it() representa um teste isolado que verifica um comportamento ou funcionalidade específica.
- expect(): Utilizado para fazer asserções, ou seja, verificar se o resultado de uma operação ou função é o esperado. Essa função é essencial para definir o comportamento que estamos validando nos testes.
- beforeEach() e afterEach(): Executam código antes ou depois de cada teste. Por exemplo, no nosso caso, usamos para iniciar e fechar o servidor em cada execução de teste, evitando conflitos de porta.

### Supertest
Supertest é uma biblioteca utilizada para simular e testar requisições HTTP em APIs. Ele facilita o processo de testar rotas RESTful sem precisar executar a aplicação de fato, o que torna os testes mais rápidos e eficientes. Funções principais:

- request(): Inicia uma requisição HTTP para a API. Geralmente, utilizamos o request(app) para testar as rotas da nossa aplicação.
- set(): Define cabeçalhos da requisição, como Content-Type ou Authorization.
- send(): Envia dados para o corpo da requisição (como no caso de uma requisição POST ou PUT).
- expect(): Similar ao Jest, o expect() do Supertest verifica se a resposta da API contém o que esperamos. Ele pode verificar status de resposta, cabeçalhos e conteúdo JSON.

## Stack utilizada

* `Node.js`: Plataforma de back-end.
* `express` Framework para criar a API.
* `sqlite3`: Banco de dados SQL.
* `Jest`: Framework de testes para JavaScript.
* `Supertest`: Biblioteca para testar requisições HTTP.
