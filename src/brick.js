import Sprite from './sprite';


class Brick extends Sprite {
  constructor(x, y, width, height, col, status) {
    super(x, y, width, height);
    this.col = col;
    this.status = status;
  }
}

export default Brick;
