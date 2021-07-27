import getTimeInterval from '../../src/utils/intervals';

describe('intervals tests', () => {
  describe('getTimeInterval', () => {
    describe('When the total of frames value is 0 or 1', () => {
      it('should return always 100', () => {
        expect(getTimeInterval(0, 0)).toEqual(100);
        expect(getTimeInterval(1, 0)).toEqual(100);
        expect(getTimeInterval(0, 1)).toEqual(100);
        expect(getTimeInterval(1, 1)).toEqual(100);
      });
    });
    describe('When the total of frames value is greater than 1', () => {
      it('should return the proper interval', () => {
        expect(getTimeInterval(0, 2)).toEqual(50);
        expect(getTimeInterval(1, 2)).toEqual(100);
        expect(getTimeInterval(0, 3)).toEqual(33.3);
        expect(getTimeInterval(1, 3)).toEqual(66.7);
        expect(getTimeInterval(2, 3)).toEqual(100);
        expect(getTimeInterval(0, 4)).toEqual(25);
        expect(getTimeInterval(1, 4)).toEqual(50);
        expect(getTimeInterval(2, 4)).toEqual(75);
        expect(getTimeInterval(3, 4)).toEqual(100);
      });
    });
  });
});
