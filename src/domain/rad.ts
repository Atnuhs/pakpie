import { Ratio } from "./ratio";

export class Rad {
    public static fromRatio(ratio: Ratio) {
        return new Rad(ratio.value * 2 * Math.PI);
    }
    constructor(private rad: number) {}

    public sin(): number {
        return Math.sin(this.rad);
    }

    public cos(): number {
        return Math.cos(this.rad);
    }
}
