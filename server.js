const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');

const app = express();


dotenv.config({path: './configuration.env'});
app.use(morgan('dev'));



const database_url = process.env.DATABASE_LOCAL;
mongoose.set('strictQuery', false);
mongoose.connect(database_url,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
}).then(()=>{
    console.log("[itskios-09]: Database connected successfully")
});

const port = process.env.PORT;

const server = app.listen(port,()=>{
    console.log(`[itskios-09]: Message app is running successfully at port ${port}`);
});

process.on('unhandledRejection', err => {
    console.log('[itskios-09]: UNHANDLED REJECTION! 💥 Shutting down...');
    console.log('[itskios-09]: ',err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });