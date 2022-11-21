import { Px, Size } from "./size";

export class Point {
    private x: Px;
    private y: Px;
    constructor(x: number, y: number) {
        this.x = new Px(x);
        this.y = new Px(y);
    }

    public scale(scale: number): Point {
        return new Point(this.x.scale(scale).num(), this.y.scale(scale).num());
    }

    public rotate(target: Point, rad: number): Point {
        const ct = Math.cos(rad);
        const st = Math.sin(rad);
        const dx = target.x.num() - this.x.num();
        const dy = target.y.num() - this.y.num();
        const nx = dx * ct - dy * st + this.x.num();
        const ny = dx * st + dy * ct + this.y.num();
        return new Point(nx, ny);
    }

    public xyPx(): { x: string; y: string } {
        return { x: this.x.px(), y: this.y.px() };
    }

    public xyNum(): { x: number; y: number } {
        return { x: this.x.num(), y: this.y.num() };
    }
}
