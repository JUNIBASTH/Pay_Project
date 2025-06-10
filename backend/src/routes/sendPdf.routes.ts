import { Router } from 'express';
import { sendPdfByEmail } from '../controllers/sendPdfController';

const router = Router();

router.post('/send-pdf', (req, res, next) => {
  console.log("📩 Ruta /api/pdf/send-pdf fue llamada");
  next();
}, sendPdfByEmail);
export default router;
