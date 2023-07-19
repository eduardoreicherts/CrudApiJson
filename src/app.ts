//Importar o pacote express para criar o servidor servidor
const express = require('express');
//Importar o banco de dados de extensão .json
const data: string = './database.json';
//Imporatr o pacote file system para manipular arquivos
const fs = require('fs');
//Instancia o express na variável app
const app = express();
//Para o express utilizar o JSON
app.use(express.json());
//Exportar o arquivo app
//Listar usuarios
app.get('/api/users', (req:any, res:any) => {
    //Pegar o conteudo do arquivo JSON
        const jsonData = fs.readFileSync(data);
    //Analisar string JSON e transformar em um objeto
        res.send(JSON.parse(jsonData))
    });
    
    //Cadastrar usuarios
    app.post('/api/users', (req:any, res:any) => {
    //Pegar o conteudo do arquivo JSON
        const jsonDataBase = fs.readFileSync(data);
    //Analisar string JSON e transformar em um objeto
        let content = JSON.parse(jsonDataBase);
    //Numero de usuarios cadastrados no database.json
        let index: number = Object.keys(content).length;
    //criar uma nova chave de objeto somando +1 do total de objeto
        content[index++] = req.body
    //analisa um objeto em JavaScript e transforma em uma string JSON
        const values = JSON.stringify(content);
        
    //lê o arquivo da base de dados e adiciona o novo objeto
        fs.writeFileSync(data, values);
    
    //retorno amigável para o usuário que chamou o endpoint
    res.status(201).send("User '" + req.body.username + "' registered with successfulll!");
    });
    
    //Editar usuario
    app.put('/api/user/:id', (req: any, res: any) => {
    //atribui a base de dados em nova variavel
    const jsonDataBase = fs.readFileSync(data);
    
    //recupera o id enviado por parametro
    const userId = req.params.id;
    
    //analisa string JSON e transforma em um objeto JavaScript
    let content = JSON.parse(jsonDataBase);
    
    //atribui os dados da requisição ao usuario existente na base de dados
    content[userId] = req.body;
    
    //analisa um objeto em JavaScript e transforma em uma string JSON
    const values = JSON.stringify(content);
    
    //lê o arquivo da base de dados e adiciona o novo objeto
    fs.writeFileSync(data, values);
    
    //retorno amigável para o usuário que o endpoint
    res.send(`User with id ${userId} has been updated`)
    });
    
    app.delete('/api/user/:id', (req: any, res: any) => {
    //atribui a base de dados em nova variavel
    const jsonDataBase = fs.readFileSync(data);
    
    //recupera o id enviado por parametro
    const userId = req.params.id;
    
    //analisa string JSON e transforma em um objeto JavaScript
    let content = JSON.parse(jsonDataBase);
    
    //delete
    delete content[userId];
    
    //analisa um objeto em JavaScript e transforma em uma string JSON
    const values = JSON.stringify(content);
    
    //lê o arquivo da base de dados e adiciona o novo objeto
    fs.writeFileSync(data, values);
    
    //retorno amigável para o usuário que o endpoint
    res.send(`User with id ${userId} has been deleted`);
    });
    //Exportando o app para o server.ts
    export default app;