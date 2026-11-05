const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const db = require('./banco/database');
const session = require('express-session');

app.use(session({
    secret: 'minha-chave-secreta',
    resave: false,
    saveUninitialized: false
}));

app.get('/produto/:id', (req, res) => {
    db.all(
        'SELECT * FROM categorias', 
        [], 
        function (erro, categorias) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao consultar categorias.');
            }
            db.get(
                'SELECT * FROM produtos WHERE id = ?', 
                [req.params.id], 
                function (erro, produto) {
                    if (erro) {
                        console.log(erro.message);
                        return res.send('Erro ao consultar produto.');
                    }
                    db.all(
                        'SELECT * FROM generos',
                        [],
                        function (erro, generos) {
                            if (erro) {
                                console.log(erro.message);
                                return res.send('Erro ao consultar gêneros.');
                            }
                            db.all(
                                'SELECT * FROM produtos',
                                [],
                                function (erro, produtos) {
                                    if (erro) {
                                        console.log(erro.message);
                                        return res.send('Erro ao consultar produtos.')
                                    }
                                    
                                    res.render('produto.ejs', { categorias, produto, generos, produtos });
                                }
                            )
                        }
                    )
                }
            );
        }
    );
});

app.get('/categoria', (req, res) => {
    db.all(
        'SELECT * FROM categorias', 
        [], 
        function (erro, categorias) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao consultar categorias.');
            }
            db.all(
                'SELECT * FROM produtos', 
                [], 
                function (erro, produtos) {
                    if (erro) {
                        console.log(erro.message);
                        return res.send('Erro ao consultar produtos.');
                    }
                    db.all(
                        'SELECT * FROM generos',
                        [],
                        function (erro, generos) {
                            if (erro) {
                                console.log(erro.message);
                                return res.send('Erro ao consultar gêneros.');
                            }
                            res.render('categoria.ejs', { categorias, produtos, generos });
                        }
                    )
                }
            );
        }
    );
});

app.get('/genero', (req, res) => {
    db.all(
        'SELECT * FROM categorias', 
        [], 
        function (erro, categorias) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao consultar categorias.');
            }
            db.all(
                'SELECT * FROM produtos', 
                [], 
                function (erro, produtos) {
                    if (erro) {
                        console.log(erro.message);
                        return res.send('Erro ao consultar produtos.');
                    }
                    db.all(
                        'SELECT * FROM generos',
                        [],
                        function (erro, generos) {
                            if (erro) {
                                console.log(erro.message);
                                return res.send('Erro ao consultar gêneros.');
                            }
                            res.render('generos.ejs', { categorias, produtos, generos });
                        }
                    )
                }
            );
        }
    );
});


//importa as rotas admin
const appAdmin = require('./rotas/rotas-admin');
app.use('/admin', appAdmin);

const appCarrinho = require('./rotas/rotas-carrinho');
app.use('/carrinho', appCarrinho);

const appIndex = require('./rotas/rotas-index');
app.use('/', appIndex);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});