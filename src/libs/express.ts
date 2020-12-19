import path from "path";
import express from "express";
import winston from "winston";
import morgan from "morgan";
import router from '../modules/workspace/router'
import { Request } from '../libs/types'
import auth from '../logic/authentication'

export default (logger: winston.Logger) => {
    const app: express.Express = express();
    const publicPath = path.join(process.cwd(), 'app/dist')
    app.use(morgan('tiny'))
    app.use(express.json())
    logger.info(`Serving static content from ${publicPath}`)
    app.use(express.static(publicPath))
    app.use((req: Request, res, next) => {
        auth(req)
        .then(a => {
            req.context = a;
            next()
        })
        .catch(e => res.status(401).send(e))
    })
    app.use(router);
    app.use((error: object, req: express.Request, res: express.Response, next: express.NextFunction) => {
        logger.error('Uncought exception.', error)
        res.status(404).send()
    });
    return app;
}