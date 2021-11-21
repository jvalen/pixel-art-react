export default class Grid {
  constructor(frame, columns) {
    this.grid = frame.get('grid');
    this.columns = columns;
    this.rows = this.grid.size / columns;
    if (Math.floor(this.rows) !== this.rows) {
      throw new Error('Grid is not rectangular');
    }
  }

  get(x, y) {
    if (x < 0 || x >= this.columns) {
      throw new Error(`x out of bounds [0, ${this.columns - 1}]`);
    }
    if (y < 0 || y >= this.rows) {
      throw new Error(`y out of bounds [0, ${this.rows - 1}]`);
    }

    return Grid.strToRGBA(this.grid.get(this.columns * y + x));
  }

  static strToRGBA(rgbaStr) {
    if (rgbaStr.trim() === '') {
      return { r: 0, g: 0, b: 0, a: 0 };
    }
    const arr = rgbaStr
      .slice(rgbaStr.indexOf('(') + 1, -1)
      .split(', ')
      .map(v => parseInt(v, 10));
    return { r: arr[0], g: arr[1], b: arr[2], a: arr[3] };
  }

  toGridArray() {
    const arr = [];
    for (let j = 0; j < this.rows; j++) {
      const rowArr = [];
      for (let i = 0; i < this.columns; i++) {
        rowArr.push(this.get(i, j));
      }
      arr.push(rowArr);
    }
    return arr;
  }
}
