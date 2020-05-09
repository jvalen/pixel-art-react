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
 *  @param {number} The color's opacity: int value from 0 to 1
 *  @return {string} Returns the rbga value like rgba(0,0,0,1) always with the opacity set to 1
 */
const parseHexToRgba = (colorCode, opacity) => {
  const hexValues = getRgbHexValues(colorCode);
  return `rgba(${parseInt(hexValues.r, 16)},${parseInt(
    hexValues.g,
    16
  )},${parseInt(hexValues.b, 16)},${opacity})`;
};

/*
 *  normalizeColor
 *  @param {string} The color value, it could be in the following formats:  '', rgba(0,0,0,1) or #000000
 *  @return {string} Returns just the hex value with 6 digits
 */
const normalizeColor = colorCode => {
  const defaultValue = '000000';
  const normalized = {
    color:
      typeof colorCode === 'string' && colorCode ? colorCode : defaultValue,
    opacity: 1
  };
  if (isRgba(normalized.color)) {
    const rgbaValues = getRgbaValues(normalized.color);
    normalized.color = parseRgbaToHex(normalized.color);
    normalized.opacity = rgbaValues.a;
  }
  if (normalized.color !== defaultValue) {
    normalized.color = normalized.color.replace('#', '');
  }
  return normalized;
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
  const colorFormatted = normalizeColor(color);

  switch (formatId) {
    case 0:
    case 1:
      return `${formatId === 0 ? '#' : '0x'}${colorFormatted.color}`;
    default:
      return parseHexToRgba(colorFormatted.color, colorFormatted.opacity);
  }
};

export default formatPixelColorOutput;
