
import express from 'express';
import cors from 'cors';

const app = express(); 
const PORT = 5000; 


app.use(express.json());


app.use(cors());


app.post('/application-form', (req, res) => {
  const { username, password } = req.body;


  if (username && password) {
    // kulang pa sa validation hahaha
    console.log("Received data: ", { username, password });
    res.json({ message: "Form submitted successfully" });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
