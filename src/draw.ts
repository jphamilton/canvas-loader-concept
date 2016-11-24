
export interface Color {
    r: number;
    g: number;
    b: number;
}

export interface Point {
    x: number;
    y: number;
    vx?: number;
    vy?: number;
    color?: Color;
    lineWidth?: number;
}

export class Draw {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    line(p1: Point, p2: Point, strokeStyle: string, width: number) {
        const { ctx } = this;
        ctx.beginPath();
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = width;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();
    }

    rect(p1: Point, p2: Point, fillStyle: string | CanvasGradient) {
        const { ctx } = this;
        ctx.beginPath();
        ctx.fillStyle = fillStyle; 
        ctx.fillRect(p1.x, p1.y, p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();
    }

    point(p: Point) {
        const fillStyle = `rgb(${p.color.r},${p.color.g},${p.color.b})`;
        this.rect(p, { x: 2, y: 2 }, fillStyle);
    }
}