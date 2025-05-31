import { Express } from 'express';

import authRouter from './auth.router';
import errorHandler from 'src/middlewares/errorHandler';

const route = (app: Express) => {
    app.use('/api/auth',authRouter);
    app.use(errorHandler);
}

export default route;