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


// Exemplo de rota protegida genérica
app.get('/rota_protegida', (req, res) => {
  res.json({ mensagem: 'Acesso permitido à rota protegida!' });
});

// 4) Rota GET com filtros usando query params
const produtos = [
  { id: 1, nome: 'Camiseta', categoria: 'Roupas', preco: 29.99 },
  { id: 2, nome: 'Tênis', categoria: 'Calçados', preco: 99.99 },
  { id: 3, nome: 'Celular', categoria: 'Eletronicos', preco: 999.99 },
  { id: 4, nome: 'Livro', categoria: 'Livros', preco: 19.99 },
  { id: 5, nome: 'Fone de Ouvido', categoria: 'Eletronicos', preco: 59.99 }
];

app.get('/produtos', (req, res) => {
  let produtosFiltrados = [...produtos];

  // Filtragem por categoria
  if (req.query.categoria) {//exemplo de uso: localhost:3000/produtos?categoria=roupas
    produtosFiltrados = produtosFiltrados.filter(produto =>
      produto.categoria.toLowerCase() === req.query.categoria.toLowerCase()
    );
  }
  // Filtragem por preço máximo
  if (req.query.precoMax) {
    produtosFiltrados = produtosFiltrados.filter(produto =>
      produto.preco <= parseFloat(req.query.precoMax)
    );
  }

  res.json(produtosFiltrados);
  
  // Aplicando o middleware nesta instância do Express
  app.use(autenticacaoMiddleware);
});
