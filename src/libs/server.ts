import express from "express";
import winston from "winston";
import * as http from 'http';
import * as WebSocket from 'ws';

interface ServerConfig {
    port: number
}

export default (logger: winston.Logger, app: express.Express, config: ServerConfig) => {
    const server = http.createServer(app);

    const port = config.port; // default port to listen

    // start the Express server
    server.listen( port, () => {
        logger.info(`server started at http://localhost:${ port }`);
    } );

    return server;
}