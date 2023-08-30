const express = require ("express");
const jwt = require ('jsonwebtoken');
const { get } = require("../routes/userRoutes");
const router = express.router(get);
const bcrypt = require('bcrypt');





router.get('/cadastrar'), async (req, res) => { 

    let {email, senha} = req.bcrypt;

}
   

    try{   
     
     let hashedSenha = await bcrypt.hash(senha, 20);
     console.log(hashedSenha);
     await client.query('INSERT INTO usuario (email, senha) VALUES ($1, $2)', [email, hashedSenha]);
     res.json({ message: 'Usuário registrado com sucesso' });
    
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
