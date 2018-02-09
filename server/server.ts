import { ValuesController } from "./controllers/valuesController";
import { IConfig } from "./config/config";

export class Server {
  constructor(
    private config: IConfig,
    private app: any,
    private express: any,
    private cors: any,
    private bodyParser: any,
    private path: any,
    private valuesController: ValuesController
  ) {
    this.port = this.config.port;
  }
  private port: number | string;

  public start(): Promise<string | number> {
    return this.initExpressMiddleware()
      .then(this.initRoutes)
      .then(this.listenToServer);
  }

  private listenToServer = (): Promise<string | number> => {
    // Start server
    return new Promise<string | number>((resolve, reject) => {
      this.app.listen(this.port, () => {
        resolve(this.port);
      });
    });
  };

  private initRoutes = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      // Init controllers
      this.valuesController.instantiateRoutes();

      // Index route
      this.app.use(this.express.static(__dirname + "/../dist"));
      this.app.all("*", (req: any, res: any) => {
        res.sendFile(this.path.resolve(__dirname + "/../dist/index.html"));
      });
      resolve();
    });
  };
  private initExpressMiddleware = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.app.use(this.cors());
      this.app.use(this.bodyParser.json());
      resolve();
    });
  };
}
