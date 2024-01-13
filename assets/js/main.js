window.addEventListener('load', () => {
  const game = new Game('main-canvas');
  document.addEventListener('keydown', (event) => game.onKeyEvent(event));
  document.addEventListener('keyup', (event) => game.onKeyEvent(event));

  const startGameBtn = document.getElementById('btn-start-game');
  startGameBtn.addEventListener('click', () => {
    const startPanel = document.getElementById('start-panel');
    startPanel.classList.add('hidden');
    
    const gamePanel = document.getElementById('game-panel');
    gamePanel.classList.remove('hidden');

    game.start();
  });

  const resumeBtn = document.getElementById('btn-resume');
  resumeBtn.addEventListener('click', () => game.start());
  
  const pauseBtn = document.getElementById('btn-pause');
  pauseBtn.addEventListener('click', () => game.stop());
});