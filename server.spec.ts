import * as chai from 'chai';
import { spy, assert } from 'sinon';
import * as sinonChai from 'sinon-chai';
import { Server } from './server';
import { IConfig } from './config/config';


chai.use(sinonChai);
let expect = chai.expect;

let uut: Server = null;
let configMock = null;
let appMock = null;
let expressMock = null;
let corsMock = null;
let bodyParserMock = null;
let valuesControllerMock = null;


describe('Server', () => {
    beforeEach(() => {
        configMock = {};
        appMock = {
            use: () => { },
            all: () => { },
            listen: () => { }
        };
        expressMock = {
            static: () => { }
        };
        corsMock = () => { };
        bodyParserMock = {
            json: () => { }
        };
        valuesControllerMock = {
            instantiateRoutes: () => { }
        };

        uut = new Server(configMock as any, appMock, expressMock, corsMock, bodyParserMock, valuesControllerMock as any);
    });

    afterEach(function () {
        // runs after each test in this block
    });

    it('should instantiate valuesController routes', () => {
        //Arrange
        valuesControllerMock.instantiateRoutes = spy();

        //Act
        uut.start().then(result => {

            //Assert
            expect(valuesControllerMock.instantiateRoutes).to.have.been.called;
        });
    });
    
    it('should listen to server', () => {
        //Arrange
        appMock.listen = spy();

        //Act
        uut.start().then(result => {

            //Assert
            expect(appMock.listen).to.have.been.called;
        });
    });

    it('should use bodyParser.json', () => {
        //Arrange
        bodyParserMock.json = spy();

        //Act
        uut.start().then(result => {

            //Assert
            expect(bodyParserMock.json).to.have.been.called;
        });
    });

    it('should use cors', () => {
        //Arrange
        corsMock = spy();

        //Act
        uut.start().then(result => {

            //Assert
            expect(corsMock).to.have.been.called;
        });
    });
});