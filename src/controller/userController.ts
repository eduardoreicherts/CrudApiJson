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


export default {listUsers};