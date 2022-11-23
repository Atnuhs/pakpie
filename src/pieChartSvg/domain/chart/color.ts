export interface Color {
    isInvalid(): boolean;
    toStr(): string;
}

export class RGB implements Color {
    private static reg = /^#?[0-9a-fA-F]{6}$/;
    static readonly defaultBlack = new RGB("#222222");
    static readonly defaultWhite = new RGB("#eeeeee");
    constructor(private colorCode: string) {
        if (this.isInvalid()) {
            throw new RangeError(
                `RGBは#XXXXXXを与えてください: ${this.colorCode}`
            );
        }
    }
    isInvalid(): boolean {
        return !RGB.reg.test(this.colorCode);
    }

    toStr(): string {
        return this.colorCode;
    }
}

export class Opacity {
    private static reg = /^(\d{1,3})%$/;
    static readonly default = new Opacity("60%");
    constructor(private value: string) {
        if (this.isInvalid()) {
            throw new RangeError(
                `OpacityにはX%(Xは1~100)を与えてください: ${this.value}`
            );
        }
    }

    isInvalid(): boolean {
        const match = Opacity.reg.exec(this.value);
        if (match == null) return true;
        const percent = Number(match[1]);
        if (isNaN(percent)) return true;
        return percent < 0 || 100 < percent;
    }

    toStr(): string {
        return this.value;
    }
}
