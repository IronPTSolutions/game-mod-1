class Bullet {

  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.vx = SPEED_BULLET;
    this.y = y;
    this.w = 5;
    this.h = 5;
  }

  move() {
    this.x += this.vx;
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.restore();
  }

}