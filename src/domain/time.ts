import { Ratio } from "./ratio";

export class Time {
    hour: number;
    minute: number;
    private static formatRgex = /^\d{1,2}:\d{2}$/;
    public static fromStr(time: string): Time {
        return new Time(time);
    }

    private static isInvalid(strTime: string): boolean {
        return !Time.formatRgex.test(strTime);
    }

    private constructor(strTime: string) {
        if (Time.isInvalid(strTime)) {
            throw new RangeError(
                `timeの値が"XX:XX"以外の形式で与えられました value: ${strTime}`
            );
        }
        [this.hour, this.minute] = strTime.split(":").map((v) => Number(v));
    }
    private getHours(): number {
        return this.hour + this.minute / 60;
    }

    public isEqualTo(time: Time): boolean {
        return this.hour === time.hour && this.minute === time.minute;
    }

    public reduce(): Ratio {
        return new Ratio(this.getHours() / 24);
    }

    public getStr(): string {
        return `${this.hour}:${this.minute.toString().padStart(2, "0")}`;
    }
}
