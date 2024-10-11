import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Olá do back-end!' });
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
