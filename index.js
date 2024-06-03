import express from "express";
import router from './src/api/routes/apiRoute.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerOptions.js';

dotenv.config();
const app = express();

const corsOptions = {
  origin: '*',
  methods: '*',
  allowedHeaders: 'Content-Type, Authorization',
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
