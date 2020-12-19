import winston from "winston";
import * as http from 'http';
import Primus from 'primus';
import { Request } from './types'
import auth from '../logic/authentication'
import { handleClient } from "../logic/gateway";

interface PrimusConfig {
    pathname: string
}

interface Config {
    primus: PrimusConfig
}

export default (logger: winston.Logger, server: http.Server, config: Config) => {
    const primus = new Primus(server, config.primus);

    primus.authorize( (req: Request, done) => auth(req)
        .then(context => {
            req.context = context
            return done()
        }).catch(e => {
            logger.error('Can\'t authenticate user.', e)
            done({statusCode: e.status, message: 'username is required'})
        }));

    primus.on('connection', handleClient);

    return primus;
}