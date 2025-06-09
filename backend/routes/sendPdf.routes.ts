import { Router } from 'express';
import { sendPdfByEmail } from '../controllers/sendPdfController';

const router = Router();

router.post('/send-pdf', sendPdfByEmail);

export default router;
