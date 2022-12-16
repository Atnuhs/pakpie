import { Ratio } from "./ratio";

export class Length {
    constructor(public value: number) {}

    public half(): Length {
        return new Length(this.value / 2);
    }

    public times(ratio: Ratio): Length {
        return new Length(this.value * ratio.value);
    }
}
