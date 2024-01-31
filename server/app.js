const express = require('express');
const userRoute = require('./routes/userRoute');
const groupRoute = require('./routes/groupRoute');
const expenseRoute = require('./routes/expenseRoute');

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(require('./utils/cors'));

app.use('/',userRoute);
app.use('/group', groupRoute);
app.use('/expense', expenseRoute);

app.listen(process.env.PORT || 1234,(err)=>{
    if(err){
        console.log("Error in sever Staring ",err);
    }else{
        console.log("Server started .....")
    }
})