import express from 'express';
import cors from 'cors';

import appRouter from './router';
import connectMongo from './database';
require('./utils/');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());

appRouter(app);
connectMongo();

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});