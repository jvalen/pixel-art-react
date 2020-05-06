/*
 *  getRgbaValues
 *  @param {string} The pixel color in the following format: rgba(0,0,0,1)
 *  @return {object} An object with r, g, b, a properties with its int correspondent value
 */
const getRgbaValues = color => {
  const match = color.match(
    /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d*)?)\))?/
  );
  return match ? { r: match[1], g: match[2], b: match[3], a: match[4] } : {};
};

/*
 *  getRgbHexValues
 *  @param {string} The pixel color in the following format: #000000
 *  @return {object} An object with r, g, b properties with its hex correspondent value
 */
const getRgbHexValues = color => {
  const match = color.match(/.{1,2}/g);
  return match ? { r: match[0], g: match[1], b: match[2] } : {};
};

/*
 *  isRgba
 *  @param {string}
 *  @return {boolean} True if the string contains 'rgba'
 */
const isRgba = color => color.includes('rgba');

/*
 *  padHexValue
 *  @param {number}
 *  @return {string} Add a 0 before the number if this only had a digit
 */
const padHexValue = value => (value.length === 1 ? `0${value}` : value);

/*
 *  normalizeHexValue
 *  @param {number} Integer number
 *  @return {string} Return the hex value with 2 digits
 */
const normalizeHexValue = value =>
  padHexValue(parseInt(value, 10).toString(16));

/*
 *  parseRgbaToHex
 *  @param {string} The color value in rgba: rgba(0,0,0,1)
 *  @return {string} Returns the hex value with 6 digits, dropping the opacity
 */
const parseRgbaToHex = colorCode => {
  const rgbaValues = getRgbaValues(colorCode);
  return `${normalizeHexValue(rgbaValues.r)}${normalizeHexValue(
    rgbaValues.g
  )}${normalizeHexValue(rgbaValues.b)}`;
};

/*
 *  parseHexToRgba
 *  @param {string} The color value in hex: 000000
 *  @return {string} Returns the rbga value like rgba(0,0,0,1) always with the opacity set to 1
 */
const parseHexToRgba = colorCode => {
  const hexValues = getRgbHexValues(colorCode);
  return `rgba(${parseInt(hexValues.r, 16)},${parseInt(
    hexValues.g,
    16
  )},${parseInt(hexValues.b, 16)},1)`;
};

/*
 *  normalizeColor
 *  @param {string} The color value, it could be in the following formats:  '', and rgba(0,0,0,1) or #000000
 *  @return {string} Returns just the hex value with 6 digits
 */
const normalizeColor = colorCode => {
  if (isRgba(colorCode)) {
    return parseRgbaToHex(colorCode);
  }
  if (colorCode !== '') {
    return colorCode.replace('#', '');
  }
  return '000000';
};

/*
 *  formatPixelColorOutput
 *  @param {string} The pixel color
 *  @param {number} formatId There are 3 format types
 *    0: #000000
 *    1: 0x000000
 *    2: rgba(0,0,0,1)
 *  @return {string} The pixel color formatted
 */
const formatPixelColorOutput = (color, formatId) => {
  let colorFormatted = normalizeColor(color);

  switch (formatId) {
    case 0:
    case 1:
      colorFormatted = `${formatId === 0 ? '#' : '0x'}${colorFormatted}`;
      break;
    default:
      colorFormatted = isRgba(color) ? color : parseHexToRgba(colorFormatted);
      break;
  }
  return colorFormatted;
};

export default formatPixelColorOutput;
