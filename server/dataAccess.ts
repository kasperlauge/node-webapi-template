import { MongodbMiddleware } from "./customMiddleware/mongodb.middleware";
import { Db, Collection } from "mongodb";

export class DataAccess {
  constructor(private mongodbMiddleware: MongodbMiddleware) {
    this.db = this.mongodbMiddleware.db;
  }

  private db: Db;

  getCollection(name: string): Collection {
    return this.db.collection(name);
  }
}
