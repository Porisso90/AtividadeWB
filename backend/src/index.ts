import { Command } from 'commander';
import express, { Request, Response } from 'express';
import cors from 'cors';

const program = new Command();

program
  .version('1.0.0')
  .description('Meu sistema CLI com Express')
  .option('-p, --port <number>', 'Porta do servidor', '3030') // Define a opção --port
  .action((options) => {
    const app = express();
    app.use(cors());

    app.get('/api', (req: Request, res: Response) => {
      res.json({ message: 'Olá do back-end!' });
    });

    const PORT = parseInt(options.port, 10) || 3030; // Converte a opção para número
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
    });
  });

program.parse(process.argv); // Parseia os argumentos da linha de comando
