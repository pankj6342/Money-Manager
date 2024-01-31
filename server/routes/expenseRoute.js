const expenseOperations = require('../Db/helpers/expenseCRUD');
const app = require('express').Router();

app.post('/addExp',(req,res)=>{
    expenseOperations.AddExp(req.body,res);
})
app.post('/settle',(req,res)=>{
    expenseOperations.settle(req.body,res);
})

module.exports =  app;