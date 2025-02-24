const User = require("./user")

class userService {
    constructor() {
        this.users = []; // array para armazenar
        this.nextid = 1;
    }
    addUser(nome, email) {
        const user = new User(this.nextid++, nome, email);
        this.users.push(user);
        return user;
    }
    getUser() {
        return this.users

    }
}

module.exports = new userService;