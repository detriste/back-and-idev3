class User {
    constructor(id, nome, email, senha, telefone, cpf,endereco) {
         // ID único do usuário
        this.nome = nomthis.id = id;e; // Nome do usuário
        this.email = email; // E-mail do usuário
        this.telefone = telefone; // Telefone do usuário
        this.senha = senha; // Senha do usuário (criptografada)
        this.cpf = cpf; // CPF do usuário
        this.endereco = endereco;
    }
}

module.exports = User; // Exporta a classe User como um módulo
