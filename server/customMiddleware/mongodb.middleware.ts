import { MongoClient, Db } from "mongodb";

export class MongodbMiddleware {
  public db: Db;

  public init(dburl: string, dbName: string) {
    return new Promise<void>(resolve => {
      MongoClient.connect(dburl, (err, client) => {
        if (err) {
          console.log(
            "Error connecting to db, did you start a mongodb instance?"
          );
        } else {
          console.log("Connected successfully to database server");

          this.db = client.db(dbName);
          resolve();
        }
      });
    });
  }
}
