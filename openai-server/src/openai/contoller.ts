import { Request, Response } from 'express';
import talkService from './service/talk.service';

class OpenAiController {
    public async talk(req: Request, res: Response) {
        const { message } = req.body;

        const result = await talkService.run(message);
        res.json(result);
    }
}

export const openAiController = new OpenAiController();