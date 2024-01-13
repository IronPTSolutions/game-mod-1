class Background {

  constructor(ctx) {
    this.ctx = ctx;

    this.x = 0;
    this.vx = SPEED_BACKGROUND;
    this.y = 0;
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.sprite = new Image();
    this.sprite.src = '/assets/img/backgrounds/game-bg.jpg';
    this.sprite.onload = () => {
      this.sprite.isReady = true;
    }
  }

  move() {
    this.x -= this.vx;

    if (this.x < -this.w) {
      this.x = 0;
    }
  }

  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.x,
        this.y,
        this.w,
        this.h
      )
      this.ctx.drawImage(
        this.sprite,
        this.x + this.w,
        this.y,
        this.w,
        this.h
      )
    }
  }

}
