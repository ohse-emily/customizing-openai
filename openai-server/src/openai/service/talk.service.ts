import tablingInfo from '../../../data/tabling-info';

const OpenAi = require('openai');
const { Configuration, OpenAIApi } = OpenAi;
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let addingPrompt = [ ...tablingInfo ];

const storeUserQuestion = (message: string) => {
    addingPrompt.push({ role: 'user', content: message });
    return addingPrompt;
}

const storeGPTResponse = (response: string) => {
    addingPrompt.push({ role: 'assistant', content: response });
    return addingPrompt;
}

const run = async(message: string) => {
    const messages = storeUserQuestion(message);
    console.log(' mesg ====', messages);

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 500,
        temperature: 1,
    }).catch((err:any) => {
        console.log('error=', err);
        console.log('exact error msg =', err.response.data)
        return false;
    })
    
    if (!response) {
        addingPrompt = [ ...tablingInfo ];
        return { message: `저의 메모리가 꽉 찼어요! 새로고침을 해주세요. \n 지금까지 우리가 나눈 대화 내용은 리셋됩니다.` };
    }

    // console.log('response =', response);
    // console.log('message =', response.data.choices[0].message);

    const chatGPTResponse = response?.data?.choices[0]?.message?.content;
    
    if(chatGPTResponse) {
        storeGPTResponse(chatGPTResponse);
        console.log('토큰 사용량 :', response.data.usage);
        
        return { message: chatGPTResponse };
        
    } else {
        return { message: '뭔가 잘못됐어,,,' };
    }
}

export default {
    run,
}


