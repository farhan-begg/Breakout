import Sprite from './sprite';


class Brick extends Sprite {
  constructor(x, y, width, height, col, status) {
    super(x, y, width, height);
    this.col = col;
    this.status = status;
  }
}

// class Brick extends Sprite {
//   constructor(x, y, width = 75, height = 20, color) {
//     super(x, y);
//     this.width = width;
//     this.height = height;
//     this.status = 1;
//     this.color = color;
//   }


export default Brick;
