import { game } from './game';

interface Color {
    r: number;
    g: number;
    b: number;
    a?: number;
}

interface Point {
    x: number;
    y: number;
    vx?: number;
    vy?: number;
    color?: Color;
    lineWidth?: number;
}

function between(x, y) {
    return Math.floor(Math.random() * y) + x;
}

class Loader implements Game {

    gc: GameContext;
    fontSize: number;
    numPoints: number;
    linkDistance: number = 150;
    opacity: number = .4;
    grad: CanvasGradient;
    points: Point[] = [];

    init(gc: GameContext) {
        this.gc = gc;

        let { width, height, ctx } = gc;
        
        this.numPoints = Math.floor(width / 10) + Math.floor(height / 5);

        // background gradient
        this.grad = ctx.createLinearGradient(0, 0, width, height);
        this.grad.addColorStop(.0, '#010C50');
        this.grad.addColorStop(.3, '#000732');
        this.grad.addColorStop(1, '#000000');

        this.fontSize = width * (80 / 1920);

        // create all points
        for(let i = 0; i < this.numPoints; i++) {
            this.createPoint();
        }   
    }

    private createPoint() {
        let p: Point = {
            x:Math.random() * this.gc.width,
            y:Math.random() * this.gc.height,
            vx:Math.random() * 5 - 2,
            vy:Math.random() * 5 - 2,
            color: {
                r: between(1, 150),
                g: between(1, 80),
                b: between(200, 255)
            },
            lineWidth: between(1, 10)
        };

        this.points.push(p);
    }

    private move(p: Point) {
        let { width, height } = this.gc;

        p.x += p.vx;
        p.y += p.vy;
        
        if(p.x > width) {
            p.x = 0;
        } else if(p.x < 0) {
            p.x = width;
        }
        
        if(p.y > height) {
            p.y = 0;
        } else if(p.y < 0) {
            p.y = height;
        }
    }

    private link(p1: Point, p2: Point) {
        var dx = p1.x - p2.x,
            dy = p1.y - p2.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            alpha;
        
        if (dist <= this.linkDistance) {
            alpha = this.opacity - (dist / (1 / this.opacity)) / this.linkDistance;

            if (alpha > 0) {   
                this.drawLine(p1, p2, 'rgba('+ p1.color.r  + ',' + p1.color.g + ',' + p1.color.b + ',' + alpha +')', p1.lineWidth);     
            }
        }
        
    }

    private drawLine(p1: Point, p2: Point, strokeStyle: string, width: number) {
        let { ctx } = this.gc;
        ctx.beginPath();
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = width;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();
    }

    private drawRect(p1: Point, p2: Point, fillStyle: string | CanvasGradient) {
        let { ctx } = this.gc;
        ctx.beginPath();
        ctx.fillStyle = fillStyle; 
        ctx.fillRect(p1.x, p1.y, p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();
    }

    private drawPoint(p: Point) {
        let fillStyle = `rgba('${p.color.r}', '${p.color.g}', '', '${p.color.b}', '${p.color.a || 1}')`;
        this.drawRect(p, { x: 2, y: 2 }, fillStyle);
    }

    private drawTitle(text: string, font: string) {
        let { ctx, centerX, centerY } = this.gc;
        ctx.font = this.fontSize + 'pt ' + font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba('+ 255  + ',' + 255 + ',' + 255 + ',' + .6 +')';
        ctx.strokeText(text, centerX, centerY - 50);
    }

    private drawBackground() {
        let { width, height } = this.gc;
        this.drawRect({ x: 0, y: 0}, { x: width, y: height }, this.grad);
    }

    private drawPoints() {
        this.points.forEach((p1, i) => {
            this.move(p1);
            this.drawPoint(p1);

            for(let j = i + 1; j < this.numPoints; j++) {
                let p2 = this.points[j];
                this.link(p1, p2);
            }
        });
    }

    render() {
        this.drawBackground();
        this.drawPoints();
        this.drawTitle('loader', 'Roboto');
    }
}

let loader = new Loader();

game(loader);
