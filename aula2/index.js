//clase base usuario
class usuario {

    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this._senha = senha;//atributo privado
    }

    autenticar(senha) {

        return senha === this._senha;

    }

    alterarsenha(novaSenha) {

        this._senha = novaSenha

        console.log("senha alterada com sucesso");
        return ""
    }
}
//clas admin que herda de usuario

class admin extends usuario {
    constructor(nome, email, senha, nivelAcesso) {
        super(nome, email, senha);
        this.nivelAcesso = nivelAcesso;
    }

    banirusuario(usuario) {
        console.log(`${usuario.nome}foi banido pelo admin ${this.nome}`);

    }
    //polimorfismo sobrepondo o método já existente
    autenticar(senha) {
        return senha === this._senha && this.nivelAcesso === 'alto';

    }

}

const usuario1 = new usuario('luiz', 'luiz@gmail', '1234')//definição dos parametrod
const usuario2 = new admin('maria', 'maria@gmail', '6789', 'alto');

console.log(usuario1.autenticar('1234'));
console.log(usuario2.autenticar('6789'));
usuario2.banirusuario(usuario1);
