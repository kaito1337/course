import express from 'express';
import type { Application } from 'express';
import { HttpMiddlewares, IConfig } from 'configuration/Configuration.interfaces';
import { createServer, Server as HttpServer } from 'http';
import { SequelizeProvider } from 'database/Provider/Provider';
export class HttpApplication {
    private readonly _app: Application = express();
    private readonly _port: number;
    private readonly _sequelizeProvider: SequelizeProvider;
    private readonly _httpServer: HttpServer;

    constructor(config: IConfig) {
        this._port = +config.port;
        this._httpServer = createServer(this._app);
        this._sequelizeProvider = new SequelizeProvider();
        this._sequelizeProvider.alterSync();
        this.middlewares(config.middlewares!);
        this.routers(config.routers);
    }

    private middlewares(middlewares: HttpMiddlewares[]) {
        if (middlewares) {
            middlewares.forEach((middleware: HttpMiddlewares) => {
                this._app.use(middleware);
            });
        }
    }

    private async routers(routers: string[]) {
        routers.map(async (router: string) => {
            const routerInstance = await import(router);

            if (routerInstance) {
                this._app.use("/", new routerInstance.default()._router);
            }
        })
    }

    public listen() {
        this._httpServer.listen(this._port, () => {
            console.log(`App listen port: ${this._port}`);
        })
    }
}