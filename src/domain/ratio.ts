export class Ratio {
    public readonly value: number;
    constructor(value: number) {
        this.value = Math.round((value * 10000) % 10000) / 10000;
    }

    public minus(r: Ratio): Ratio {
        return new Ratio(this.value - r.value);
    }

    public plus(r: Ratio): Ratio {
        return new Ratio(this.value + r.value);
    }

    public half(): Ratio {
        return new Ratio(this.value / 2);
    }

    public distance(to: Ratio): Ratio {
        if (this.value <= to.value) return to.minus(this);
        return new Ratio(1 - this.minus(to).value);
    }
}
