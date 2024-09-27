const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


// 2)Saudação com parâmetro de nome
app.get('/saudacao/:nome', (req, res) => {
  const nome = req.params.nome;
  res.send(`Olá, ${nome}!`);
});

// 3)Middleware de autenticação
const autenticacaoMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    // Se o token estiver presente, continue para a próxima rota/middleware
    next();
  } else {
    // Se não houver token, retorne um erro 401
    res.status(401).json({ mensagem: 'Não autorizado. Token de autenticação ausente.' });
  }
};
// Aplicando o middleware nesta instância do Express
app.use(autenticacaoMiddleware);

// Exemplo de rota protegida genérica
app.get('/rota_protegida', (req, res) => {
  res.json({ mensagem: 'Acesso permitido à rota protegida!' });
});

