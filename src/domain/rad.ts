import { Ratio } from "./ratio";

export class Rad {
    public readonly rad;
    public static fromRatio(ratio: Ratio) {
        return new Rad(ratio.value * 2 * Math.PI);
    }

    public static middleRad(from: Rad, to: Rad): Rad {
        const radValue = from.lt(to)
            ? from.plus(to).rad / 2
            : from.plus(to.plusFull()).rad / 2;
        return new Rad(radValue);
    }

    public static largeArcSweepFlag(from: Rad, to: Rad): number {
        const toValue = from.lt(to) ? to.rad : to.plusFull().rad;
        return toValue - from.rad < Math.PI ? 0 : 1;
    }

    constructor(radNum: number) {
        this.rad = radNum;
    }

    public lt(rad: Rad): boolean {
        return this.rad < rad.rad;
    }

    public plus(rad: Rad): Rad {
        return new Rad(this.rad + rad.rad);
    }

    public minus(rad: Rad): Rad {
        return new Rad(this.rad - rad.rad);
    }

    public plusFull(): Rad {
        return new Rad(this.rad + 2 * Math.PI);
    }

    public half(): Rad {
        return new Rad(this.rad / 2);
    }

    public sin(): number {
        return Math.sin(this.rad);
    }

    public cos(): number {
        return Math.cos(this.rad);
    }
}
