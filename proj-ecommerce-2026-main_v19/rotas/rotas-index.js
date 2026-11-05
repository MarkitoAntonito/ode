const express = require('express');
const appIndex = express();
const db = require('../banco/database');

//rota para a página inicial do site principal
appIndex.get('/', (req, res) => {
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
                            res.render('index.ejs', { categorias, produtos, generos });
                        }
                    )
                }
            );
        }
    );
});

module.exports = appIndex;