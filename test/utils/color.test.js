import formatPixelColorOutput from '../../src/utils/color';

describe('formatPixelColorOutput', () => {
  describe('When the params are empty or not valid', () => {
    it('should return the rgba format of black color', () => {
      const blackRgba = 'rgba(0,0,0,1)';
      expect(formatPixelColorOutput(null, null)).toEqual(blackRgba);
      expect(formatPixelColorOutput(undefined, undefined)).toEqual(blackRgba);
      expect(formatPixelColorOutput(20, null)).toEqual(blackRgba);
    });
  });
  describe('When the chosen formatId is 0', () => {
    it('should return color formatted as: #000000', () => {
      expect(formatPixelColorOutput('rgba(255,255,255,1)', 0)).toEqual(
        '#ffffff'
      );
      expect(formatPixelColorOutput('#ffffff', 0)).toEqual('#ffffff');
      expect(formatPixelColorOutput('', 0)).toEqual('#000000');
    });
  });
  describe('When the chosen formatId is 1', () => {
    it('should return color formatted as: 0x000000', () => {
      expect(formatPixelColorOutput('rgba(255,255,255,1)', 1)).toEqual(
        '0xffffff'
      );
      expect(formatPixelColorOutput('#ffffff', 1)).toEqual('0xffffff');
      expect(formatPixelColorOutput('', 1)).toEqual('0x000000');
    });
  });
  describe('When the chosen formatId is 2', () => {
    it('should return color formatted as: rgba(0,0,0,1)', () => {
      expect(formatPixelColorOutput('rgba(255,255,255,1)', 2)).toEqual(
        'rgba(255,255,255,1)'
      );
      expect(formatPixelColorOutput('#ffffff', 2)).toEqual(
        'rgba(255,255,255,1)'
      );
      expect(formatPixelColorOutput('', 2)).toEqual('rgba(0,0,0,1)');
    });
  });
  describe('When the input color is rgba', () => {
    it('should keep the opacity if the format is rgba', () => {
      expect(formatPixelColorOutput('rgba(255,255,255,0.6)', 2)).toEqual(
        'rgba(255,255,255,0.6)'
      );
    });
  });
});
