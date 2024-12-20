
import express from 'express';
import cors from 'cors';

const app = express(); 
const PORT = 5000; 


app.use(express.json());


app.use(cors());


app.post('/application-form', (req, res) => {
  const dataFromFrontEnd = req.body;


  if (dataFromFrontEnd) {
    // kulang pa sa validation hahaha
    console.log("Received data: ", dataFromFrontEnd);
    res.json({ message: "This is data from backend", dataFromFrontEnd });
  } else {
    res.status(400).json({ message: "Invalid data"});
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
