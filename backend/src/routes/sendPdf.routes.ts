import { sendPdfByEmail } from '../controllers/sendPdfController';
import { Router } from 'express';

const router = Router();

router.get('/ping', (req, res) => {
  res.send('pong desde sendPdf.routes');
});

export default router;
