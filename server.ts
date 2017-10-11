import { Express } from 'express';
import { ValuesController } from './controllers/valuesController';

export class Server {
    private port: number | string = process.env.PORT || 3000;
    private configPath: string = null;

    constructor(
        private express: Express,
        private cors: any,
        private bodyParser: any,
        private fs: any,
        private valuesController: ValuesController
    ) { }

    public start(): Promise<void> {
        this.initExpressMiddleware();
        this.initRoutes();
        return this.readConfigurationFile(this.configPath)
            .then(this.setUpConfiguration)
            .then(this.listenToServer);
    }

    public setConfig = (path: string): void => {
        this.configPath = path;
    }

    private readConfigurationFile = (path: string): Promise<any> => {
        if (!path) {
            return Promise.reject(new Error('No configuration path is provided...'));
        } else {
            return new Promise((resolve, reject) => {
                this.fs.readFile(path, 'utf8', function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(data));
                    }
                });
            });
        }
    }

    private setUpConfiguration = (config: any): Promise<void> => {
        //Use config object her
        console.log(config.rootUrl);
        return Promise.resolve();
    }

    private listenToServer = (): Promise<void> => {
        // Start server
        return new Promise<void>((resolve, reject) => {
            this.express.listen(this.port, () => {
                resolve();
            });
        });
    }

    private initRoutes = (): void => {
        this.valuesController.instantiateRoutes();
        //Index route
        this.express.get('/', (req: any, res: any) => {
            res.sendFile(__dirname + '/dist/index.html');
        });
    }
    private initExpressMiddleware = (): void => {
        this.express.use(this.cors());
        this.express.use(this.bodyParser.json());
    }
}