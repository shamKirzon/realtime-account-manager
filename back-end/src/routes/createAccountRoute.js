import express from 'express'; 
import createAccount from '../controllers/createAccountController.js';



const createAccountRoute = express.Router();

createAccountRoute.post('/create-account', createAccount); 

export default createAccountRoute; 