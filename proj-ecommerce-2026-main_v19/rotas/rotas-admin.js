const express = require('express');
const appAdmin = express();
const db = require('../banco/database');
const upload = require('../util/imagens');


//================== ROTAS DE LOGIN/INDEX ==================//
appAdmin.get('/index', (req, res) => {
    res.render('admin/index-admin');
});

appAdmin.get('/', (req, res) => {
    res.render('admin/login');
});

appAdmin.post('/login', (req, res) => {
    //algoritmo de autenticação do usuário - FUTURO
    res.redirect('/admin/index');
});


//================== ROTAS DE CATEGORIAS ==================//
appAdmin.get('/categorias', (req, res) => {
    db.all(
        'SELECT * FROM categorias', 
        [], 
        function (erro, categorias) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao consultar categorias.');
            }
            res.render('admin/categorias/lista.ejs', { categorias });
        }
    );
});

appAdmin.get('/categorias/form-cadastrar', (req, res) => {
    res.render('admin/categorias/cadastro.ejs');
});

appAdmin.post('/categorias/cadastrar', (req, res) => {
    const nome = req.body.nome;
    const descricao = req.body.descricao;

    db.run(
        `INSERT INTO categorias (nome, descricao) VALUES (?, ?)`,
        [nome, descricao],
        function (erro) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao cadastrar categoria.');
            }
            res.redirect('/admin/categorias');
        }
    );
});

appAdmin.get('/categorias/excluir/:id', (req, res) => {
    const id = req.params.id;
    db.run(
        'DELETE FROM categorias WHERE id = ?',
        [id],
        function (erro) {
            if (erro) {
                console.log(erro.message);
                return res.send ('Erro ao excluir categoria.')
            }
            res.redirect('/admin/categorias');
        }
    );
});

//================== ROTAS DE LOGIN/INDEX ==================//
appAdmin.get('/index', (req, res) => {
    res.render('admin/index-admin');
});

appAdmin.get('/', (req, res) => {
    res.render('admin/login');
});

appAdmin.post('/login', (req, res) => {
    //algoritmo de autenticação do usuário - FUTURO
    res.redirect('/admin/index');
});


//================== ROTAS DE GÊNEROS ==================//

appAdmin.get('/generos', (req, res) => {
    db.all(
        'SELECT * FROM generos', 
        [], 
        function (erro, generos) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao consultar gêneros.');
            }
            res.render('admin/generos/lista.ejs', { generos });
        }
    );
});

appAdmin.get('/generos/form-cadastrar', (req, res) => {
    res.render('admin/generos/cadastro.ejs');
});

appAdmin.post('/generos/cadastrar', (req, res) => {
    const nome = req.body.nome;

    db.run(
        `INSERT INTO generos (nome) VALUES (?)`,
        [nome],
        function (erro) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao cadastrar gênero.');
            }
            res.redirect('/admin/generos');
        }
    );
});

appAdmin.get('/generos/excluir/:id', (req, res) => {
    const id = req.params.id;
    db.run(
        'DELETE FROM generos WHERE id = ?',
        [id],
        function (erro) {
            if (erro) {
                console.log(erro.message);
                return res.send ('Erro ao excluir gênero.')
            }
            res.redirect('/admin/generos');
        }
    );
});

//================== ROTAS DE PRODUTOS ==================//


//ROTA PARA CONSULTAR TODOS OS PRODUTOS
appAdmin.get('/produtos', (req, res) => {
    db.all(
        'SELECT * FROM produtos',
        [],
        function (erro, produtos) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao consultar produtos.');
            }
            res.render('admin/produtos/lista.ejs', {produtos});
        }        
    );
});

//ROTA PARA EXIBIR O FORMULÁRIO DE CADASTRO DE PRODUTOS
//Precisa consultar as categorias para popular o select do formulário
appAdmin.get('/produtos/form-cadastrar', (req, res) => {
    db.all(
        'SELECT * FROM categorias', 
        [], 
        function (erro, categorias) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao consultar categorias.');
            }
            
            db.all(
                'SELECT * FROM generos', 
                [], 
                function (erro, generos) {
                    if (erro) {
                        console.log(erro.message);
                        return res.send('Erro ao consultar gêneros.');
                    }
                    res.render('admin/produtos/cadastro.ejs', {categorias, generos});
                }      
            )                                
        }      
    );
    
});

appAdmin.post('/produtos/cadastrar', upload.single('imagem'), (req, res) => {
    const imagem = req.file.filename; // Obtém o nome do arquivo enviado
    const nome = req.body.nome;
    const categoria = req.body.categoria;
    const valor = req.body.valor;
    const estoque = req.body.estoque;
    const genero = req.body.genero;
    const artista = req.body.artista;
    const descricao = req.body.descricao;

    db.run(
        `INSERT INTO produtos (nome, categoria, valor, estoque, descricao, imagem, genero, artista) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nome, categoria, valor, estoque, descricao, imagem, genero, artista],
        function (erro) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao cadastrar produto.');
            }
            res.redirect('/admin/produtos');
        }
    );
});

appAdmin.get('/produtos/excluir/:id', (req, res) => {
    const id = req.params.id;
    db.run(
        'DELETE FROM produtos WHERE id = ?',
        [id],
        function (erro) {
            if (erro) {
                console.log(erro.message);
                return res.send ('Erro ao excluir produto.')
            }
            res.redirect('/admin/produtos');
        }
    );
});

module.exports = appAdmin;