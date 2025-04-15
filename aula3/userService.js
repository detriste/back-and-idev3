const User = require("./user")
const path = require("path") //modulo para manipular caminhos
const fs = require("fs")// modulo para manipular arquivos file system
const bcrypt = require("bcryptjs")// modulo para criptografar senha
const mysql = require("./mysql");


class userService {
    constructor() { //quando não passa parâmetro traz um valor fixo, que não muda
        this.filePath = path.join(__dirname, 'user.json')
        this.users = this.loadUsers()
        this.nextID = this.getNextId()
    }

    loadUsers() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath)
                return JSON.parse(data)
            }
        } catch (erro) {
            console.log("Erro ao carregar arquivo", erro)
        }
        return [] //retorna um array vazio
    }

    getNextId(users) { //função para buscar próximo id
        try {
            if (this.users.length === 0) return 1
            return Math.max(...this.users.map(user => user.id)) + 1
        } catch (erro) {
            console.log("Erro ao buscar próximo id", erro)
        }
    }

    saveUsers() { //função para salvar os usuários
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users))
        } catch (erro) {
            console.log("Erro ao salvar arquivo", erro)
        }
    }

    async addUser(nome, email, senha, endereco, telefone, cpf, idade) {
        try {
            const senhaCripto = await bcrypt.hash(senha, 10)
            const resultados = await mysql.execute(
                `INSERT INTO usuario (nome, email, idade, endereço, cpf,  telefone, senha)
                      VALUES (?, ?, ?, ?, ?, ?, ?);`,
                      [nome, email, idade, endereco, cpf, telefone, senhaCripto]
            )
            return resultados
        } catch (error) {
            console.log("Erro ao adicionar usuário", error)
            throw error
        }
    }
    getUsers() {
        try {
            return this.users
        } catch (erro) {
            console.log("Erro ao buscar usuários", erro)
        }
    }

    deleteUser(id) {
        try {
            this.users = this.users.filter(user => user.id !== id)
            this.saveUsers()
        } catch (erro) {
            console.log("Erro ao deletar usuário", erro)
        }
    }

    async updateUser(id, nome, email, senha, endereco, telefone, cpf, idade) {
        try {            
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            const resultados = await mysql.execute(`
                UPDATE usuario
                   SET nome      = ?, 
                       email     = ?,
                       idade     = ?, 
                       endereço  = ?,
                       cpf       = ?, 
                       telefone  = ?,
                       senha     = ?
                 WHERE idusuario = ?;`, [nome, email, idade, endereco, cpf, telefone, senhaCriptografada, id]);
           return resultados;
            
        } catch (erro) {
            console.log("Erro", erro)
            throw erro
        }
    }
}

module.exports = new userService