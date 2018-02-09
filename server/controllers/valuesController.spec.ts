import * as chai from "chai";
import { spy } from "sinon";
import * as sinonChai from "sinon-chai";
import { ValuesController } from "./valuesController";

chai.use(sinonChai);
let expect = chai.expect;
// tslint:disable-next-line:no-empty
let noop = () => {};

let uut: ValuesController = null;
let valuesServiceMock = null;
let reqMock = null;
let resMock = {
  send: noop
};

describe("ValuesController", () => {
  beforeEach(() => {
    let appMock = {
      use: noop
    };
    valuesServiceMock = {
      getValues: () => null
    };

    uut = new ValuesController(appMock as any, valuesServiceMock);
  });

  it("should call getValues on valuesService", () => {
    // Arrange
    valuesServiceMock.getValues = spy();

    // Act
    uut.getValues(reqMock, resMock);

    // Assert
    expect(valuesServiceMock.getValues).to.have.been.called;
  });
});
