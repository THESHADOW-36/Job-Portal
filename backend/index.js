import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';
import { config } from 'dotenv';
import { connectDB } from './config/database.js';

const app = express();

app.use(cors());

app.use(morgan('tiny'));

app.use(express.json());

config({ path: './config/.env' });

connectDB();

app.use('/api/v1', router);

const port = 8000;

app.listen(port, () => { console.log(`Server is running on ${port}`) })

console.log("Hello world")