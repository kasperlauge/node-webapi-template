import * as chai from 'chai';
import { spy, assert } from 'sinon';
import * as sinonChai from 'sinon-chai';
import { ValuesController } from './valuesController';


chai.use(sinonChai);
let expect = chai.expect;

let uut: ValuesController = null;
let valuesServiceMock = null;
let reqMock = null;
let resMock = {
    send: () => { }
};


describe('ValuesController', () => {
    beforeEach(() => {
        let appMock = {
            use: () => { }
        };
        valuesServiceMock = {
            getValues: () => null
        };

        uut = new ValuesController(appMock as any, valuesServiceMock);
    });

    it('should call getValues on valuesService', () => {
        //Arrange
        let values = null;
        valuesServiceMock.getValues = spy();

        //Act
        uut.getValues(reqMock, resMock);

        //Assert
        expect(valuesServiceMock.getValues).to.have.been.called;
    });
});