import { logger } from './middlewares/exception';
import connectToDb from './start/db';
import logging from './start/logging';
import createServer from './start/createServer';

logging();
console.log('app.ts')
connectToDb();

const app = createServer();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});