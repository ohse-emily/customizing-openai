import { Router } from 'express';
import { openAiController } from './contoller';

const router = Router();

router.post('/', openAiController.talk);

export default router;