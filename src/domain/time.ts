import { Ratio } from "./ratio";

export class Time {
    hour: number;
    minute: number;
    private static formatRgex = /^\d{1,2}:\d{2}$/;
    public static fromStr(strTime: string): Time {
        return new Time(strTime);
    }

    public static startTime(strTime: string): Time {
        const startTime = new Time(strTime);
        if (!startTime.isValidStartTime())
            throw new RangeError(
                `startTimeが0:00~24:00の範囲外で与えられました startTime: ${strTime}`
            );
        return startTime;
    }

    public static finishTime(strTime: string, startTime: Time): Time {
        startTime.getHours();
        const finishTime = new Time(strTime);
        if (!finishTime.isValidFinishTime(startTime))
            throw new RangeError(
                `finishTimeが0:00 ~ startTime+24:00の範囲外で与えられました。startTime: ${startTime}, finishTime: ${finishTime}`
            );
        return finishTime;
    }

    private static isValid(strTime: string): boolean {
        return Time.formatRgex.test(strTime);
    }

    private constructor(strTime: string) {
        if (!Time.isValid(strTime))
            throw new RangeError(
                `timeの値が"XX:XX"以外の形式で与えられました value: ${strTime}`
            );
        [this.hour, this.minute] = strTime.split(":").map((v) => Number(v));
        if (!this.isValidMinute())
            throw new RangeError(
                `minuteが0 <= x < 60の範囲外で与えられました minute: ${this.minute}`
            );
    }

    public isValidStartTime(): boolean {
        if (0 <= this.hour && this.hour < 24) return true;
        if (this.hour == 24 && this.minute == 0) return true;
        return false;
    }

    public isValidFinishTime(startTime: Time): boolean {
        const limitHour = startTime.hour + 24;
        if (0 <= this.hour && this.hour < limitHour) return true;
        if (this.hour == limitHour && this.minute <= startTime.minute) return true;
        return false;
    }

    public isValidMinute(): boolean {
        return 0 <= this.minute && this.minute < 60;
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
