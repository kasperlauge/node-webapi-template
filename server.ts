import { ValuesController } from './controllers/valuesController';
import { IConfig } from './config/config';

export class Server {
    private port: number | string = process.env.PORT || 3000;

    constructor(
        private config: IConfig,
        private app: any,
        private express: any,
        private cors: any,
        private bodyParser: any,
        private valuesController: ValuesController
    ) { }

    public start(): Promise<void> {
        return this.initExpressMiddleware()
            .then(this.initRoutes)
            .then(this.listenToServer);
    }

    private listenToServer = (): Promise<void> => {
        // Start server
        return new Promise<void>((resolve, reject) => {
            this.app.listen(this.port, () => {
                resolve();
            });
        });
    }

    private initRoutes = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            //Init controllers
            this.valuesController.instantiateRoutes();

            //Index route
            this.app.use(this.express.static(__dirname + '/dist'));
            this.app.all('*', (req: any, res: any) => {
                res.sendFile(__dirname + '/dist/index.html');
            });
            resolve();
        });
    }
    private initExpressMiddleware = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            this.app.use(this.cors());
            this.app.use(this.bodyParser.json());
            resolve();
        });
    }
}