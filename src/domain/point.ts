import { Length } from "./length";
import { Rad } from "./rad";

export class Point {
    constructor(public readonly x: number, public readonly y: number) {}

    public Xplus(l: Length) {
        return new Point(this.x + l.value, this.y);
    }

    public Yplus(l: Length) {
        return new Point(this.x, this.y + l.value);
    }

    public Yminus(l: Length) {
        return new Point(this.x, this.y - l.value);
    }

    public plus(p: Point) {
        return new Point(this.x + p.x, this.y + p.y);
    }

    public minus(p: Point) {
        return new Point(this.x - p.x, this.y - p.y);
    }

    public copy() {
        return new Point(this.x, this.y);
    }

    public half() {
        return new Point(this.x / 2, this.y / 2);
    }

    public rotate(rad: Rad) {
        const nx = this.x * rad.cos() - this.y * rad.sin();
        const ny = this.x * rad.sin() + this.y * rad.cos();
        return new Point(nx, ny);
    }

    public closeTo(numDigits: number): Point {
        return new Point(
            expect.closeTo(this.x, numDigits),
            expect.closeTo(this.y, numDigits)
        );
    }
}
