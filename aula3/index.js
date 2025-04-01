const express = require('express');
const userService = require('./userService');

const app = express(); // Inicializa o Express
app.use(express.json()); // Middleware para interpretar JSON

// Rota para criar um novo usuário
app.post("/users", async (req, res) => {
    try {
        const { nome, email, senha, telefone, cpf,endereco } = req.body;

        // Validação dos campos obrigatórios
        if (!nome || !email || !senha || !telefone || !cpf|| !endereco) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios: nome, email, senha, cpf, telefone" });
        }

        // Adiciona o usuário
        const user = await userService.addUser(nome, email, senha, telefone, cpf,endereco);
        res.status(201).json({ user }); // Retorna o usuário criado com status 201
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

// Rota para listar todos os usuários
app.get("/users", (req, res) => {
    try {
        const users = userService.getUsers();
        res.status(200).json(users); // Retorna a lista de usuários
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

// Configuração da porta do servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});