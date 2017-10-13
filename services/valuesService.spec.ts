import { expect } from 'chai';
import { ValuesService } from './valuesService';

let uut: ValuesService = null;


describe('ValuesService', () => {
    beforeEach(() => {
        uut = new ValuesService();
    });

    it('should return two values', () => {
        //Arrange
        let values = null;

        //Act
        values = uut.getValues();

        //Assert
        expect(values.length).to.equal(2);
    });

    it('should return correct first value', () => {
        //Arrange
        let values = null;

        //Act
        values = uut.getValues();
        let flattenedValue = JSON.stringify(values[0]);

        //Assert
        expect(flattenedValue).to.equal(JSON.stringify({param: 1, prop: "test"}));
    });
});