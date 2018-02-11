import * as chai from "chai";
import { spy } from "sinon";
import * as sinonChai from "sinon-chai";
import { Server } from "./server";

chai.use(sinonChai);
let expect = chai.expect;

let uut: Server = null;
let configMock = null;
let appMock = null;
let expressMock = null;
let corsMock = null;
let bodyParserMock = null;
let pathMock = null;
let mongodbMiddlewareMock = null;
let valuesControllerMock = null;
// tslint:disable-next-line:no-empty
let noop = () => {};

describe("Server", () => {
  beforeEach(() => {
    configMock = {};
    appMock = {
      use: noop,
      all: noop,
      listen: noop
    };
    expressMock = {
      static: noop
    };
    corsMock = noop;
    bodyParserMock = {
      json: noop
    };

    mongodbMiddlewareMock = {
      init: noop
    };

    valuesControllerMock = {
      instantiateRoutes: noop
    };

    uut = new Server(
      configMock as any,
      appMock,
      expressMock,
      corsMock,
      bodyParserMock,
      pathMock,
      mongodbMiddlewareMock,
      valuesControllerMock as any
    );
  });

  afterEach(function() {
    // runs after each test in this block
  });

  it("should instantiate valuesController routes", () => {
    // Arrange
    valuesControllerMock.instantiateRoutes = spy();

    // Act
    uut.start().then(result => {
      // Assert
      expect(valuesControllerMock.instantiateRoutes).to.have.been.called;
    });
  });

  it("should listen to server", () => {
    // Arrange
    appMock.listen = spy();

    // Act
    uut.start().then(result => {
      // Assert
      expect(appMock.listen).to.have.been.called;
    });
  });

  it("should use bodyParser.json", () => {
    // Arrange
    bodyParserMock.json = spy();

    // Act
    uut.start().then(result => {
      // Assert
      expect(bodyParserMock.json).to.have.been.called;
    });
  });

  it("should use cors", () => {
    // Arrange
    corsMock = spy();

    // Act
    uut.start().then(result => {
      // Assert
      expect(corsMock).to.have.been.called;
    });
  });

  it("should instantiate mongodb middleware", () => {
    // Arrange
    mongodbMiddlewareMock = spy();

    // Act
    uut.start().then(result => {
      // Assert
      expect(mongodbMiddlewareMock.init).to.have.been.called;
    });
  });
});
