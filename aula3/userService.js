const User = require("./user");
const path = require('path'); //modulo para manipular caminhos
const fs = require('fs'); // modulo para manipular arquivos files system
const bcrypt = require('bcryptjs');

class userService {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json');
        this.users = this.loadUsers(); // Carregar usuários ao iniciar o serviço
        this.nextId = this.getNextId(); // Inicializar o próximo ID
    }

    loadUsers() {
        try {
            if (fs.existsSync(this.filePath)) { // Verifica se o arquivo existe
                const data = fs.readFileSync(this.filePath); // Lê o arquivo
                return JSON.parse(data); // Transforma o JSON em objeto
            }
        } catch (erro) { // Caso ocorra um erro
            console.log("Erro ao carregar arquivo", erro);
        }
        return [];
    }

    getNextId() {
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1;
        } catch (erro) { // Caso ocorra um erro
            console.log("Erro ao carregar arquivo", erro);
        }
    }

    saveUsers() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users));
        } catch (erro) {
            console.log("Erro ao salvar arquivo", erro);
        }
    }

    async addUser(nome, email, senha, telefone, cpf) {
        try {
            const senhaCripto = await bcrypt.hash(senha, 10);
            const user = new User(this.nextId++, nome, email, senhaCripto, telefone, cpf); // ++ vai adicionar mais 1 no número do id a cada novo usuário, que inicialmente é 1.
            this.users.push(user);
            this.saveUsers();
            return user;
        } catch (erro) {
            console.log("Erro", erro);
        }
    }

    getUsers() {
        try {
            return this.users;
        } catch (erro) {
            console.log("Erro", erro);
        }
    }

    deleteUser(id) {
        try {
            const userIndex = this.users.findIndex(user => user.id === id);
            if (userIndex === -1) {
                throw new Error("Usuário não encontrado");
            }
    
            this.users.splice(userIndex, 1); // Remove o usuário pelo índice
            this.saveUsers(); // Salva a lista atualizada no arquivo
            return { message: "Usuário deletado com sucesso" };
        } catch (erro) {
            console.log("Erro ao deletar o usuário:", erro.message);
            return { error: erro.message };
        }
    }


    async updateUser(id, nome, email, senha, telefone, cpf,endereco) {
        try {
            const user = this.users.find(user => user.id === id);
            if (!user) throw new Error("Usuário não encontrado");

            user.nome = nome || user.nome;
            user.email = email || user.email;
            user.telefone = telefone || user.telefone;
            user.cpf = cpf || user.cpf;
            user.endereco = endereco || user.endereco;

            if (senha) {
                user.senha = await bcrypt.hash(senha, 10); // Atualiza a senha criptografada
            }

            this.saveUsers(); // Salva as alterações no arquivo
            return user;
        } catch (erro) {
            console.log("Erro ao atualizar o usuario", erro);
        }
    }
}

module.exports = new userService();