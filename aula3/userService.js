const User = require("./user");
const path = require('path'); //modulo para manipular caminhos
const fs = require('fs'); // modulo para manipular arquivos files system

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

    addUser(nome, email, senha, cpf, telefone) {
        try {
            const user = new User(this.nextId++, nome, email, senha, cpf, telefone); // ++ vai adicionar mais 1 no número do id a cada novo usuário, que inicialmente é 1.
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
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();
        } catch (erro) {
            console.log("Erro ao deletar o usuario", erro);
        }
    }
}

module.exports = new userService();