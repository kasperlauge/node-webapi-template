import { Container } from "addict-ioc";
import { Ioc } from "./ioc";
import { Server } from "./server";

// Set up IOC
const container = new Container();
Ioc.setUpDependencyInjections(container);

// Instantiate and start the server
let server = container.resolve<Server>("server");
server.start().then(port => {
  console.log(`Server started on port ${port}`);
});
