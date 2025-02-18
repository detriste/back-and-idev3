const user = require("./user")

class userService{
    constructor(){
        this.users = []; // array para armazenar
        this.nextid;
    }
    adduser(nome,email){
        const user = new user(this.nextid++,);
        this.users.push(user);
        return user;
    }
}