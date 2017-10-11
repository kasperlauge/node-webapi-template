import { Value } from "../models/value";

export class ValuesService {
    constructor(){}

    getValues(): Value[] {
        let valuesArray = new Array<Value>();
        let value1 = new Value();
        value1.param = 1;
        value1.prop = "test";
        
        let value2 = new Value();
        value2.param = 2;
        value2.prop = "test2";

        valuesArray.push(value1, value2);

        return valuesArray;
    }
}