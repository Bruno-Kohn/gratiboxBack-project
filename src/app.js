import express from 'express';
import cors from 'cors';
import postSignup from './controllers/signup.js';
import postLogin from './controllers/login.js';
import postSignAPlan from './controllers/signaplan.js';
import sendInfos from './controllers/sendInfos.js';
import sendDetails from './controllers/sendDetails.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

// Access control
app.post('/signup', postSignup);
app.post('/login', postLogin);

// Pages
app.post('/sign-a-plan', postSignAPlan);
app.get('/sign-a-plan', sendInfos);
app.post('/details', sendDetails);

export default app;
