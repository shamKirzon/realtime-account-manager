import express from 'express'; 
import getFilteredNames from '../controllers/filterableNamesController.js';

const getFilteredNamesRoute = express.Router(); 

getFilteredNamesRoute.get('/filterable-names', getFilteredNames);

export default getFilteredNamesRoute; 