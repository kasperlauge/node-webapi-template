import * as chai from 'chai';
import { spy, assert } from 'sinon';
import * as sinonChai from 'sinon-chai';
import { ValuesController } from './valuesController';


chai.use(sinonChai);
let expect = chai.expect;

let valuesController: ValuesController = null;
let valuesServiceMock = null;
let reqMock = null;
let resMock = {
    send: () => { }
};


describe('ValuesController', () => {
    beforeEach(() => {
        let expressMock = {
            use: () => { }
        };
        valuesServiceMock = {
            getValues: () => null
        };

        valuesController = new ValuesController(expressMock as any, valuesServiceMock);
    });

    it('should call getValues on valuesService', () => {
        //Arrange
        let values = null;
        valuesServiceMock.getValues = spy();

        //Act
        valuesController.getValues(reqMock, resMock);

        //Assert
        expect(valuesServiceMock.getValues).to.have.been.called;
    });
});