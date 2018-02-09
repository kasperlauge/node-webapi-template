import { expect } from "chai";
import { ValuesService } from "./valuesService";
import { Value } from "../models/value";

let uut: ValuesService = null;

describe("ValuesService", () => {
  beforeEach(() => {
    uut = new ValuesService();
  });

  it("should return two values", async done => {
    // Arrange
    let values: Value[] = null;

    // Act
    values = await uut.getValues();

    // Assert
    expect(values.length).to.equal(2);
    done();
  });

  it("should return correct first value", async done => {
    // Arrange
    let values: Value[] = null;

    // Act
    values = await uut.getValues();
    let flattenedValue = JSON.stringify(values[0]);

    // Assert
    expect(flattenedValue).to.equal(JSON.stringify({ param: 1, prop: "test" }));
    done();
  });
});
