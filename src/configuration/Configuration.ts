import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import type { Dialect } from 'sequelize';
import type { IConfig } from 'configuration/Configuration.interfaces';
import { routerPaths } from './libs/RouterPaths';

dotenv.config();

export const Configuration: IConfig = {
    orm: {
        name: process.env.NAME as string,
        port: process.env.DB_PORT as string,
        host: process.env.HOST as string,
        dialect: process.env.DIALECT as Dialect,
        user: process.env.USERNAME as string,
        password: process.env.PASSWORD as string
    },
    bcrypt: {
        rounds: process.env.ROUNDS as unknown as number
    },
    port: process.env.PORT as string,
    routers: routerPaths(),
    middlewares: [
        express.json({
            limit: "100mb"
        }),
        // express.static("public"),
        cors({
            origin: ["http://localhost:3000"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        })
    ]
};