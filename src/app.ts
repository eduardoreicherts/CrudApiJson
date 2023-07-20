//Iportando o arquivo router
import router from "./userRouter";
//Importar o pacote express para criar o servidor servidor
const express = require('express');
//Instancia o express na variável app
const app = express();

//Para o express utilizar o JSON
app.use(express.json());
//Para o app usar o router
app.use(router)

//Exportando o app para o server.ts
export default app;