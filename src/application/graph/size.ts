export class Size {
    private val: Px;
    public constructor(val: number) {
        if (val < 0)
            throw new RangeError(`sizeは0以上でなければならない ${val}`);
        this.val = new Px(val);
    }

    px(): string {
        return this.val.px();
    }

    num(): number {
        return this.val.num();
    }

    scale(scale: number): Size {
        return new Size(this.val.num() * scale);
    }
}

export class Px {
    constructor(private val: number) {}

    px(): string {
        return `${this.val.toFixed(3)}px`;
    }

    num(): number {
        return this.val;
    }

    scale(scale: number): Px {
        return new Px(this.val * scale);
    }
}
