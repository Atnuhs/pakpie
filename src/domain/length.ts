import { Ratio } from "./ratio";

export class Length {
    public readonly value;
    constructor(value: number) {
        this.value = Math.round(value * 1000000) / 1000000;
    }

    public half(): Length {
        return new Length(this.value / 2);
    }

    public times(ratio: Ratio): Length {
        return new Length(this.value * ratio.value);
    }
}
