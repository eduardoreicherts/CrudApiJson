//Importar o request e response do express
import { Request, Response } from "express";
//Importar o banco de dados de extensão .json
const data: string = './database.json';
//Imporatr o pacote file system para manipular arquivos
const fs = require('fs');

//Criando a função assíncrona do GET
async function listUsers(req: Request, res: Response) {
    //Pegar o conteudo do arquivo JSON
    const jsonData = fs.readFileSync(data);
    //Analisar string JSON e transformar em um objeto
    res.send(JSON.parse(jsonData));
};

//Criando função assíncrona do POST
async function registUsers(req: Request, res: Response) {
    //Pegar o conteudo do arquivo JSON
    const jsonDataBase = fs.readFileSync(data);
    //Analisar string JSON e transformar em um objeto
    let content = JSON.parse(jsonDataBase);
    //Numero de usuarios cadastrados no database.json
    let index: number = Object.keys(content).length;
    //criar uma nova chave de objeto somando +1 do total de objeto
    content[index++] = req.body;
    //analisa um objeto em JavaScript e transforma em uma string JSON
    const values = JSON.stringify(content);

    //lê o arquivo da base de dados e adiciona o novo objeto
    fs.writeFileSync(data, values);

    //retorno amigável para o usuário que chamou o endpoint
    res.status(201).send("User '" + req.body.username + "' registered with successfulll!");
};

//Criando função assíncrona do PUT
async function editUser(req: Request, res: Response) {
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
    res.send(`User with id ${userId} has been updated`);
};

//Criando função assíncrona do DELETE
async function delUser(req: Request, res: Response) {
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
};

//Exportando funções assíncronas do CRUD
export default {
    listUsers,
    registUsers,
    editUser,
    delUser
};