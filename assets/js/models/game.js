class Game {

  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.height = CANVAS_H;
    this.canvas.width = CANVAS_W;
    this.ctx = this.canvas.getContext('2d');

    this.fps = FPS;
    this.drawIntervalId = undefined;

    this.background = new Background(this.ctx);
    this.mario = new Mario(this.ctx, MARIO_X_PADDING, this.canvas.height - MARIO_GROUND_PADDING);
    this.enemies = [];
    this.score = new Score(this.ctx, 10, 10);

    this.addEnemyBackoff = 2000;
    setTimeout(() => this.addRandomEnemy(), this.addEnemyBackoff);
  }

  onKeyEvent(event) {
    this.mario.onKeyEvent(event);
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
        this.checkCollisions();
      }, this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (enemy.collidesWith(this.mario)) {
        this.gameOver();
      }
    });

    this.mario.bullets = this.mario.bullets.filter((bullet) => {
      const enemyCollision = this.enemies.find(enemy => enemy.collidesWith(bullet));
      if (enemyCollision) {
        enemyCollision.lives--;
        if (enemyCollision.isDead()) {
          this.score.inc();
        }
        return false;
      } else {
        return true;
      }
    })
  }

  addRandomEnemy() {
    if (this.drawIntervalId) {
      console.log(`Adding enemy, elapsed time ${this.addEnemyBackoff}ms...`)
      this.enemies.push(new Koopa(this.ctx, this.canvas.width, this.canvas.height - KOOPA_GROUND_PADDING));
    }

    this.addEnemyBackoff = Math.floor(Math.random() * 10 + 1) * 1000;
    setTimeout(() => this.addRandomEnemy(), this.addEnemyBackoff);
  }

  move() {
    this.mario.move();
    this.background.move();
    this.enemies.forEach((enemy) => enemy.move());

    if (this.mario.x < 0) {
      this.mario.x = 0;
    } else if (this.mario.x > this.canvas.width - this.mario.w) {
      this.mario.x = this.canvas.width - this.mario.w;
    }
  }

  draw() {
    this.background.draw();
    this.mario.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.score.draw();
  }

  clear() {
    this.mario.clear();
    this.enemies = this.enemies.filter((enemy) => (enemy.x + enemy.w) > 0 && !enemy.isDead());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  gameOver() {
    this.stop();
    this.saveScoreName('Juli');
  }

  saveScoreName(name) {
    const scores = localStorage.getItem(SCORE_KEY) ? JSON.parse(localStorage.getItem(SCORE_KEY)) : {};
    scores[name] = this.score.points;
    localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
  }
}