class Mario {

  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.vx = SPEED_MOVE;
    this.y = y;
    this.y0 = this.y;
    this.vy = 0;
    this.w = Math.ceil(121 / 2);
    this.h = Math.ceil(160 / 2);

    this.sprite = new Image();
    this.sprite.src = '/assets/img/mario-sprite.png';
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 3;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
    }

    this.movements = {
      right: false,
      left: false,
      isJumping: false,
      isShutting: false
    }

    this.bullets = [];

    this.animationTick = 0;
  }

  onKeyEvent(event) {
    const enabled = event.type === 'keydown';
    switch (event.keyCode) {
      case KEY_RIGHT:
        this.movements.right = enabled;
        break;
      case KEY_LEFT:
        this.movements.left = enabled;
        break;
      case KEY_UP:
        if (enabled) {
          this.jump();
        }
        break;
      case KEY_FIRE:
        if (enabled) {
          this.fire();
        }
        break;
    }
  }

  jump() {
    if (!this.movements.isJumping) {
      this.movements.isJumping = true;
      this.y -= Math.ceil(this.h / 2);
      this.vy = -SPEED_JUMP;
    }
  }

  fire() {
    if (!this.movements.isShutting) {
      this.movements.isShutting = true;
      this.bullets.push(new Bullet(this.ctx, this.x + this.w, this.y + Math.ceil(this.h / 2)));
      setTimeout(() => this.movements.isShutting = false, MARIO_BULLET_BACK_OFF);
    }
  }

  clear() {
    this.bullets = this.bullets.filter((bullet) => bullet.x < this.ctx.canvas.width);
  }

  move() {
    if (this.movements.right) {
      this.x += this.vx;
    } else if (this.movements.left) {
      this.x -= this.vx;
    }

    if (this.y < this.y0) {
      this.vy += ACCELERATION;
      this.y += this.vy;
    } else {
      this.y = this.y0;
      this.movements.isJumping = false;
    }

    this.bullets.forEach((bullet) => bullet.move());
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
      )

      this.animate();
    }

    this.bullets.forEach((bullet) => bullet.draw());
  }

  animate() {
    this.animationTick++;

    if (this.movements.isJumping) {
      this.sprite.horizontalFrameIndex = 1;
    } else if (this.animationTick >= MARIO_RUN_ANIMATION_TICK && (this.movements.right || this.movements.left)) {
      this.animationTick = 0;
      this.sprite.horizontalFrameIndex++;

      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 1;
      }
    } else if (!this.movements.right && !this.movements.left) {
      this.sprite.horizontalFrameIndex = 0;
    }
  }

}