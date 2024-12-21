import express from 'express'; 
import cors from 'cors'
import createAccountRoute from './src/routes/createAccountRoute.js';

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api', createAccountRoute); 


export default app; 
