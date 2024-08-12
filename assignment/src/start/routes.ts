import { Express } from 'express';
import patients from '../routes/patients';
import appointments from '../routes/appointments';
import { exception } from '../middlewares/exception';

export default function setupRoutes(app: Express): void {

    app.use('/api/patients', patients);
    app.use('/api/appointments', appointments);

    app.use(exception);
}