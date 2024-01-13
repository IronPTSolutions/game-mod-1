class Koopa {

  constructor(ctx, x, y) {
    this.ctx = ctx;
    
    this.x = x;
    this.vx = KOOPA_SPEED_MOVE;
    this.y = y;
    this.w = 22 * 2.5;
    this.h = 28 * 2.5;

    this.sprite = new Image();
    this.sprite.src = '/assets/img/koopa-sprite.png';
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 2;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
    }
    this.animationTick = 0;

    this.lives = 1;
  }

  isDead() {
    return this.lives <= 0;
  }

  move() {
    this.x -= this.vx;
  }

  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      );

      this.animate();
    }
    
  }

  animate() {
    this.animationTick++;

    if (this.animationTick >= KOOPA_RUN_ANIMATION_TICK) {
      this.animationTick = 0;
      
      this.sprite.horizontalFrameIndex++;
      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0;
      }
    }
  }

  collidesWith(element) {
    return (
      this.x + this.w > element.x &&
      this.x < element.x + element.w &&
      this.y + this.h > element.h &&
      this.y < element.y + element.h
    );
  }

}