import express from 'express';
import cors from 'cors';
import postSignup from './controllers/signup.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

// Access control
app.post('/signup', postSignup);

export default app;
