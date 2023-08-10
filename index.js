const express = require("express"); //importando o express
const app = express(); //iniciando o express, e atribuindo para a const app
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

//O comando abaixo seta o ejs como view engine (renderizador de html)
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order:[
        ['updatedAt','DESC']
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    let titulo    = req.body.titulo;
    let descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id"){
    
}

app.listen(8080, () =>{
    console.log("app rodando");
});