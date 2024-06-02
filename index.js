import express from "express";
import router from  './src/api/routes/apiRoute.js'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api',router);
const corsOptions = {
    origin: '*', // Allow requests from this origin
    methods: '*', // Allow only GET and POST requests
    allowedHeaders: 'Content-Type,Authorization', // Allow only specified headers
  };
  
  // Enable CORS with options
  app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app; // Use export default for ES6 modules
``