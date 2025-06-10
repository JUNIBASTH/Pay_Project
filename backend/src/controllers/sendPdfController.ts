import { RequestHandler } from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const upload = multer({ dest: 'uploads/' }).single('pdf');

export const sendPdfByEmail: RequestHandler = (req, res) => {
  upload(req, res, async (err) => {
    if (err || !req.file) {
      return res.status(400).json({ message: 'Error al subir el archivo PDF' });
    }

    const { email } = req.body;
    const pdfPath = req.file.path;

    try {
      // Configura el transporter de Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail', // o usa tu proveedor
        auth: {
          user: 'TU_CORREO@gmail.com',
          pass: 'TU_CONTRASEÑA_O_APP_PASSWORD',
        },
      });

      // Envía el correo
      await transporter.sendMail({
        from: 'PlanillaApp <TU_CORREO@gmail.com>',
        to: email,
        subject: 'Resumen de Pago - PlanillaApp',
        text: 'Adjunto encontrarás el resumen de tu pago.',
        attachments: [
          {
            filename: 'ResumenDePago.pdf',
            path: pdfPath,
          },
        ],
      });

      // Elimina el archivo temporal
      fs.unlinkSync(pdfPath);

      res.status(200).json({ message: 'Correo enviado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al enviar el correo' });
    }
  });
};
