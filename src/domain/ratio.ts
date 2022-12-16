export class Ratio {
    constructor(public value: number) {}

    public minus(r: Ratio): Ratio {
        return new Ratio(this.value - r.value);
    }

    public plus(r: Ratio): Ratio {
        return new Ratio(this.value + r.value);
    }

    public half(): Ratio {
        return new Ratio(this.value / 2);
    }
}
