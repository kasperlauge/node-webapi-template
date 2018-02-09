import { Express } from "express";
import { ValuesService } from "../services/valuesService";
import { IController } from "./controller";

export class ValuesController implements IController {
  constructor(private express: Express, private valuesService: ValuesService) {}

  public instantiateRoutes = (): void => {
    this.express.get("/api/values", this.getValues);
  };

  public getValues = async (req: any, res: any) => {
    let values = await this.valuesService.getValues();
    res.send(values);
  };
}
