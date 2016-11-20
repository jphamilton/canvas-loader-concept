export const game = (game: Game) => {
    let gc: GameContext;
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    window.addEventListener('resize', () => {
        init();
    });

    const init = () => {
        canvas.width = document.body.clientWidth; 
        canvas.height = document.body.clientHeight; 
        
        gc = {
            canvas: canvas,
            ctx: ctx,
            width: canvas.width,
            height: canvas.height,
            centerX: canvas.width / 2,
            centerY: canvas.height / 2,
            lastTime: new Date().getTime(),
            currentTime: 0, 
            delta: 0,
            fps: 60,
            interval: 1000 / 60
        };
        
        game.init(gc);
    };

    const loop = () => {
        setTimeout(() => {
            requestAnimationFrame(loop);
            gc.currentTime = new Date().getTime();
            gc.delta = gc.currentTime - gc.lastTime;

            if (gc.delta > gc.interval) {
                gc.ctx.clearRect(0, 0, gc.width, gc.height);
                game.render();
                gc.lastTime = gc.currentTime;
            }
        }, gc.interval);
    }
    
    init();
    loop();
};