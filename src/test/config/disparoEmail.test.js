import { describe } from '@jest/globals'; 
import nodemailer from 'nodemailer'; // Importa o nodemailer, que é a biblioteca responsável por enviar e-mails
import 'dotenv/config'; 

// Cria o transportador de e-mail, que será responsável por enviar os e-mails.
// Ele é configurado com o host, porta, e credenciais do e-mail fornecidas pelas variáveis de ambiente.
const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL, // O host do servidor de e-mail
  port: 587, // A porta do servidor de e-mail (587 para STARTTLS)
  secure: false, // Utiliza STARTTLS para segurança, mas não SSL diretamente
  auth: {
    user: process.env.USER_EMAIL, // O usuário de autenticação (normalmente o e-mail)
    pass: process.env.PASS_EMAIL, // A senha do usuário para autenticação
  },
});

// Função que verifica a conexão com o servidor de e-mail.
// Ela retorna uma Promise, onde tenta verificar se o transportador está pronto para enviar e-mails.
const verificarConexao = () => new Promise((resolver, reject) => {
  transporter.verify((error, success) => {
    if (error) {
      reject(error); // Se houver erro, rejeita a Promise com o erro
    } else {
      resolver(success); // Se a verificação for bem-sucedida, resolve a Promise com sucesso
    }
  });
});

// Descreve o grupo de testes para o sistema de disparo de e-mail
describe('Testando Disparo de email', () => {
  // Primeiro teste: verifica se a conexão com o servidor de e-mail funciona corretamente
  it('O sistema deve validar se a conexão com o sistema de disparo de email', async () => {
    const estaConectado = true; // Valor esperado: que a conexão esteja estabelecida com sucesso

    // Chama a função para verificar a conexão
    const validarConexao = await verificarConexao();

    // Compara o resultado da verificação com o valor esperado
    expect(validarConexao).toStrictEqual(estaConectado);
  });

  // Segundo teste: verifica se o sistema consegue enviar um e-mail corretamente
  it('O sistema deve enviar um email', async () => {
    // Define um objeto que simula os dados do e-mail que será enviado
    const dadosEmailMock = {
      from: '"Fred Foo" <foo@example.com>', // Remetente do e-mail
      to: 'teste@teste.com', // Destinatário do e-mail
      subject: 'Aluguel de Livro', // Assunto do e-mail
      text: 'Olá, Raphael, você alugou o livro Harry Potter e o Cálice de Fogo por 5 dias.', // Corpo do e-mail
    };

    // Usa o transportador para enviar o e-mail com os dados fornecidos
    const info = await transporter.sendMail(dadosEmailMock);

    // Verifica se o destinatário do e-mail enviado corresponde ao destinatário esperado
    expect(info.accepted[0]).toBe(dadosEmailMock.to);
  });
});
