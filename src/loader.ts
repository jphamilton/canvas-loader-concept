import { game, Game, GameContext } from './game';
import { Draw, Point, Color } from './draw';

function between(x, y) {
    return Math.floor(Math.random() * y) + x;
}

class Loader implements Game {

    gc: GameContext;
    fontSize: number;
    numPoints: number;
    grad: CanvasGradient;
    points: Point[] = [];
    draw: Draw;

    init(gc: GameContext) {
        this.gc = gc;

        const { width, height, ctx } = gc;

        this.draw = new Draw(ctx);

        this.numPoints = Math.floor(width / 10) + Math.floor(height / 5);

        // background gradient
        this.grad = ctx.createLinearGradient(0, 0, width, height);
        this.grad.addColorStop(.0, '#010C50');
        this.grad.addColorStop(.3, '#000732');
        this.grad.addColorStop(1, '#000000');

        // scale font size to screen width
        this.fontSize = width * (80 / 1920);

        // create all points
        for(let i = 0; i < this.numPoints; i++) {
            this.createPoint();
        }   
    }

    private createPoint() {
        const p: Point = {
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
        const { width, height } = this.gc;

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
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const opacity = .4;
        const linkDistance = 150;
        
        if (dist <= linkDistance) {
            const alpha = opacity - (dist / (1 / opacity)) / linkDistance;

            if (alpha > 0) {   
                const strokeStyle = `rgba(${p1.color.r},${p1.color.g},${p1.color.b},${alpha})`; 
                this.draw.line(p1, p2, strokeStyle, p1.lineWidth);     
            }
        }
        
    }

    private drawTitle(text: string, font: string) {
        const { ctx, centerX, centerY } = this.gc;
        ctx.font = this.fontSize + 'pt ' + font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,255,255,.6)';
        ctx.strokeText(text, centerX, centerY - 50);
    }

    private drawBackground() {
        const { width, height } = this.gc;
        this.draw.rect({ x: 0, y: 0}, { x: width, y: height }, this.grad);
    }

    private drawPoints() {
        this.points.forEach((p1, i) => {
            this.move(p1);
            this.draw.point(p1);

            for(let j = i + 1; j < this.numPoints; j++) {
                const p2 = this.points[j];
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
