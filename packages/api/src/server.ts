import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Ou a porta que você usa

// Configuração básica
app.use(cors());
app.use(express.json());

// Rota de Teste Simples (Se isso funcionar, o servidor está UP)
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('API Server is running!');
});

// 🚨 EXEMPLO DE ROTA QUE PODE ESTAR DANDO 500 🚨
app.get('/api/data', async (req: Request, res: Response) => {
  try {
    // 1. LÓGICA DO BACKEND
    // (Seu código de conexão com banco de dados, lógica de negócio, etc.)
    
    // 2. SE O ERRO 500 ESTIVER ACONTECENDO, GERALMENTE É AQUI:
    // Exemplo de erro comum: Tentar usar uma variável não definida
    // console.log(variavelQueNaoExiste.length); // <--- Isso causaria um 500!

    const data = { message: 'Dados retornados com sucesso!' };
    res.status(200).json(data);
  } catch (error) {
    // 3. CAPTURA DE ERRO: SEMPRE LOGUE O ERRO NO CONSOLE!
    console.error('ERRO INTERNO NA ROTA /api/data:', error);
    // Se você não logar, o erro 500 é silencioso e você não sabe a causa.
    res.status(500).json({ error: 'Falha interna no servidor.' });
  }
});

// Inicia o Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});