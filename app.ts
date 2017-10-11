import { Container } from "addict-ioc";
import { Ioc } from "./ioc";
import { Server } from "./server";

//Set up IOC
const container = new Container();
Ioc.setUpDependencyInjections(container);

// Instantiate and start the server
let server = container.resolve<Server>('server');
server.setConfig('./config.json');
server.start().then(() => {
    console.log('Server started');
});