class User {
    constructor(id, nome, email, senha) {
        this.id = id; // id do usuário
        this.nome = nome; // nome do usuário
        this.email = email; // e-mail do usuário
        this.senha = senha; // senha do usuário
    }
}

module.exports = User; // exporta o módulo
