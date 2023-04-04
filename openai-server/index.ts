require('dotenv').config();

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const OpenAi = require('openai');
const { Configuration, OpenAIApi } = OpenAi;
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req: Request, res: Response) => {
    const { message } = req.body;
    const messages = [
        {role: 'user', content: message },
    ]

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 4000,
        temperature: 1,
    }).catch((err:any) => {
        console.log('error=', err);
    })

    // console.log('response =', response);
    // console.log('message =', response.data.choices[0].message);
    
    const chatGPTResponse = response.data.choices[0].message.content;
    if(chatGPTResponse) {
        res.json({
            message: chatGPTResponse,
        })
    } else {
        res.json({
            message: 'Something went wrong',
        })
    }
})

app.listen(port, () => {
    console.log('node server is listening ', port);
})