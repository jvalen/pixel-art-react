import { List, Map } from 'immutable';
import generateFramesOutput from '../../src/utils/outputParse';

const gridMock = ['#111111', '#222222', '#222222', '#111111'];
const generateFrames = grid =>
  List([
    Map({
      grid: List(grid)
    })
  ]);

describe('generateFramesOutput', () => {
  const frames = generateFrames(gridMock);
  const columns = 2;

  describe('Color format', () => {
    describe('When the colorFormat is 0', () => {
      it('should return the output with the color formatted like: #000000', () => {
        const options = {
          colorFormat: 0,
          reverseOdd: false,
          reverseEven: false
        };
        expect(
          generateFramesOutput({
            frames,
            columns,
            options
          })
        ).toEqual(`frame0 = {\n #111111, #222222,\n #222222, #111111\n};`);
      });
    });
    describe('When the colorFormat is 1', () => {
      it('should return the output with the color formatted like: 0x000000', () => {
        const options = {
          colorFormat: 1,
          reverseOdd: false,
          reverseEven: false
        };
        expect(
          generateFramesOutput({
            frames,
            columns,
            options
          })
        ).toEqual(`frame0 = {\n 0x111111, 0x222222,\n 0x222222, 0x111111\n};`);
      });
    });
    describe('When the colorFormat is 2', () => {
      it('should return the output with the color formatted like: rgba(0,0,0,1)', () => {
        const options = {
          colorFormat: 2,
          reverseOdd: false,
          reverseEven: false
        };
        expect(
          generateFramesOutput({
            frames,
            columns,
            options
          })
        ).toEqual(
          `frame0 = {\n rgba(17,17,17,1), rgba(34,34,34,1),\n rgba(34,34,34,1), rgba(17,17,17,1)\n};`
        );
      });
    });
  });
  describe('Reverse rows', () => {
    describe('When the reverseOdd is true', () => {
      it('should return the odd rows reversed', () => {
        const options = {
          colorFormat: 0,
          reverseOdd: true,
          reverseEven: false
        };
        expect(
          generateFramesOutput({
            frames,
            columns,
            options
          })
        ).toEqual(`frame0 = {\n #222222, #111111,\n #222222, #111111\n};`);
      });
    });
    describe('When the reverseEven is true', () => {
      it('should return the odd rows reversed', () => {
        const options = {
          colorFormat: 0,
          reverseOdd: false,
          reverseEven: true
        };
        expect(
          generateFramesOutput({
            frames,
            columns,
            options
          })
        ).toEqual(`frame0 = {\n #111111, #222222,\n #111111, #222222\n};`);
      });
    });
  });
});
