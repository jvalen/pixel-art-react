import 'jest-canvas-mock';
import {
  getDimensionIntervals,
  getCanvasDimensions
} from '../../src/utils/loadFromCanvas';

describe('loadFromCanvas tests', () => {
  describe('getCanvasDimensions', () => {
    describe('When the canvas ref received is not valid', () => {
      it('should return width and height 0', () => {
        const expectedOutput = { w: 0, h: 0 };
        expect(getCanvasDimensions(null)).toEqual(expectedOutput);
        expect(getCanvasDimensions({})).toEqual(expectedOutput);
      });
    });
    describe('When canvasRef contains a reference to a canvas', () => {
      it('should return its width and height dimensions', () => {
        const CANVAS_WIDTH = 100;
        const CANVAS_HEIGHT = 200;
        const canvas = document.createElement('canvas');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const canvasRef = { current: canvas };
        const expectedOutput = { w: CANVAS_WIDTH, h: CANVAS_HEIGHT };

        expect(getCanvasDimensions(canvasRef)).toEqual(expectedOutput);
      });
    });
  });
  describe('getDimensionIntervals', () => {
    describe('If only one frame is received', () => {
      describe('and dimension is greater than 0', () => {
        it('should return only an interval 0-100, 100%', () => {
          const expectedOutput = [
            {
              start: 0,
              end: 100,
              timePercentage: 100
            }
          ];
          expect(getDimensionIntervals(100, 1)).toEqual(expectedOutput);
        });
      });
      describe('and dimension is 0 or null', () => {
        it('should return only an interval 0-0, 100%', () => {
          const expectedOutput = [
            {
              start: 0,
              end: 0,
              timePercentage: 100
            }
          ];
          expect(getDimensionIntervals(0, 1)).toEqual(expectedOutput);
          expect(getDimensionIntervals(null, 1)).toEqual(expectedOutput);
        });
      });
    });

    describe('For a given dimension size and more than one frame', () => {
      it('should return each equal interval with start, end and time percentage', () => {
        const expectedOutput = [
          {
            start: 0,
            end: 25,
            timePercentage: 25
          },
          {
            start: 25,
            end: 50,
            timePercentage: 50
          },
          {
            start: 50,
            end: 75,
            timePercentage: 75
          },
          {
            start: 75,
            end: 100,
            timePercentage: 100
          }
        ];
        expect(getDimensionIntervals(100, 4)).toEqual(expectedOutput);
      });
    });
    describe('If the frame value is 0 or null', () => {
      it('should return an empty array', () => {
        expect(getDimensionIntervals(100, 0)).toEqual([]);
      });
    });
  });
});
