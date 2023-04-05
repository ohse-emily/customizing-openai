require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAi from './openai';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.use('/', OpenAi);


app.listen(port, () => {
    console.log('node server is listening ', port);
})