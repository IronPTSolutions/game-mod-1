class Score {

  constructor(ctx, x, y, points = 0) {
    this.ctx = ctx;
    
    this.x = x;
    this.y = y;
    this.w = Math.ceil(192 / 6);
    this.h = Math.ceil(255 / 6);

    this.sprite = new Image();
    this.sprite.src = '/assets/img/score-sprite.png';
    this.sprite.onload = () => {
      this.sprite.isReady = true;
    }

    this.points = points;
  }

  inc(amount = 1) {
    this.points += amount;
  }

  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.x,
        this.y,
        this.w,
        this.h
      );

      this.ctx.save();
      this.ctx.fillStyle = 'yellow';
      this.ctx.font = '25px Roboto';
      this.ctx.fillText(this.points, this.x + this.w + 10, this.y + Math.ceil(this.y + this.h / 2));
      this.ctx.restore();
    }
  }
}