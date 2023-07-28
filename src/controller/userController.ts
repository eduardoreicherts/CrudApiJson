//Importar o request e response do express
import { Request, Response } from "express";

import db from '../config/database';

//Criando a função assíncrona do GET
async function listUsers(req: Request, res: Response) {
    db.connection.query('select * from clients;', (err, results) => {
        res.send(results);
    });
};

async function registUsers(req: Request, res: Response) {
    const querySql = 'insert into clients(DS_NAME,NM_CELLPHONE,DS_STATUS) values(?,?,?);'

    const params = [
        req.body.DS_NAME,
        req.body.NM_CELLPHONE,
        req.body.DS_STATUS
    ];

    db.connection.query(querySql, params, (err, results) => {
        res.send('Cadastro realizado com sucesso!' + results)
    });
};

async function editUser(req: Request, res: Response) {
    const querySql = 'UPDATE clients SET DS_NAME, NM.CELLPHONE, DS.STATUS = (?, ?, ?)WHERE ID_CLIENTS = ?;'

    const params = [
        req.params.ID_CLIENTS,
        req.body.DS_NAME,
        req.body.NM_CELLPHONE,
        req.body.DS_STATUS
    ];

    const userid: string = req.params.id;

    db.connection.query(querySql, params, (err, results) => {
        res.send('Edição realizada com sucesso!' + results)
    });
};

async function deleteUser(req: Request, res: Response) {
    
};


//Exportando funções assíncronas das rotas
export default {listUsers, registUsers, editUser, deleteUser};