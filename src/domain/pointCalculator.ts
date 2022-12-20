import { Length } from "./length";
import { Point } from "./point";
import { Rad } from "./rad";
import { Ratio } from "./ratio";

export interface PiePoints {
    o: Point;
    s: Point;
    f: Point;
    g: Point;
}

export class PiePointCalculator {
    constructor(private o: Point, private r: Length) {}

    private ratioToRad(ratio: Ratio): Rad {
        return Rad.fromRatio(ratio);
    }

    private startPoint(): Point {
        return this.o.Yminus(this.r);
    }

    private rotate(vector: Point, rad: Rad): Point {
        return vector.rotate(rad).plus(this.o);
    }

    public calc(startRatio: Ratio, finishRatio: Ratio): PiePoints {
        const vector = this.startPoint().minus(this.o);
        return {
            o: this.o.copy(),
            s: this.rotate(vector, this.ratioToRad(startRatio)),
            f: this.rotate(vector, this.ratioToRad(finishRatio)),
            g: this.rotate(
                vector.half(),
                this.ratioToRad(startRatio.plus(finishRatio).half())
            ),
        };
    }
}
