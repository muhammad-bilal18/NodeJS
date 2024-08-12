import express from 'express';
import { logger } from './middlewares/exception';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

import logging from './start/logging';
logging();

// import config from './start/config';
import connectToDb from './start/db';
import setupRoutes from './start/routes';

// config()
connectToDb();
setupRoutes(app);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    logger.warn(`Server listening on port ${port}`);
});

module.exports = server;