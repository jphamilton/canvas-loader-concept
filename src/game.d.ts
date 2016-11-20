interface GameContext {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D; 
    width: number;         
    height: number; 
    centerX: number; 
    centerY: number;
    lastTime?: number;
    currentTime?: number;
    delta?: number;
    fps: number;
    interval: number;
}

interface Game {
    init: (gc: GameContext) => void;
    render: () => void;
}