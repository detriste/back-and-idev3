const express = require ('express')
const userService = require('./userService');
const { error } = require('console');

const app = express (); //nome qualquer para express
app.use(express.json)


app.post("/users",(req,res) =>{
const {nome,email} = req.body;
if(!nome|| !email){
    return res.status(400).json
    ({error:"nome e email são obrigátorios"})
}
const user = userService.adduser(nome,email);
res.status(200).json({user});
})
// rota pro usuario
app.get("")