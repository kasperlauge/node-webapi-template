import { Container } from "addict-ioc";
import { ConfigDevelopment } from "./config/config.development";
import { ConfigProduction } from "./config/config.production";
import { Server } from "./server";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as path from "path";
import { Router } from "express";
import { ValuesController } from "./controllers/valuesController";
import { ValuesService } from "./services/valuesService";

export class Ioc {
  public static setUpDependencyInjections(container: Container) {
    container.registerObject("di", container);
    if (process.env.NODE_ENV === "production") {
      container.register("config", ConfigProduction).singleton();
    } else {
      container.register("config", ConfigDevelopment).singleton();
    }
    container.registerObject("express", express);
    container.registerObject("app", express());
    container.registerObject("cors", cors);
    container.registerObject("bodyParser", bodyParser);
    container.registerObject("router", Router);
    container.registerObject("path", path);

    // Register services here
    container.register("valuesService", ValuesService);

    // Register controllers here
    container
      .register("valuesController", ValuesController)
      .dependencies("app", "valuesService")
      .singleton();

    container
      .register("server", Server)
      .dependencies(
        "config",
        "app",
        "express",
        "cors",
        "bodyParser",
        "path",
        "valuesController"
      )
      .singleton();
  }
}
