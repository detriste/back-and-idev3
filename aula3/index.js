const express = require('express')
const userService = require('./userService');

const app = express(); //nome qualquer para express
app.use(express.json());
 

app.post("/users", (req, res,) => {
    const { nome, email,senha,cpf,telefone } = req.body;
    if (!nome || !email|| !senha ||!cpf ||!telefone){
        return res.status(400).json
            ({ error: "nome e email são obrigátorios" })
    }
    const user = userService.adduser(nome, email,senha,cpf,telefone);
    res.status(200).json({ user });
})
// rota pra listar os usuarios

app.get("/users", (req, res) => {
    res.json(userService.getusers());
})

const port = 3000;
app.listen(port, () => {
    console.log("servidor rodando na porta", port);
})