export class TimeSpan {
    startTime: Time;
    finishTime: Time;
    constructor(startTimeStr: string, finishTimeStr: string) {
        this.startTime = Time.fromStr(startTimeStr);
        this.finishTime = Time.fromStr(finishTimeStr);
        while (this.finishTime.toSec() < this.startTime.toSec())
            this.finishTime = new Time(this.finishTime.toSec() + 3600 * 24);
        if (this.startTime.isIllegalStartTime()) {
            throw new RangeError(
                `Start timeは00:00 - 23:59の範囲内でなければなりません。現在のStart time: ${this.startTime.toStr()}`
            );
        }

        const diffAbs = Math.abs(Time.diff(this.startTime, this.finishTime));
        if (diffAbs == 0) {
            throw new RangeError(
                `Start timeとFinish timeが同じ時間です。現在のStart time: ${this.startTime.toStr()}, 現在のFinish time: ${this.finishTime.toStr()}`
            );
        }

        if (diffAbs > 24 * 60 * 60) {
            throw new RangeError(
                `Start timeとFinish timeの差は24時間以内で無ければなりません現在のStart time: ${this.startTime.toStr()}, 現在のFinish time: ${this.finishTime.toStr()}`
            );
        }
    }

    public isEqualTo(timeSpan: TimeSpan): boolean {
        return (
            this.startTime.isEqualTo(timeSpan.startTime) &&
            this.finishTime.isEqualTo(timeSpan.finishTime)
        );
    }

    public data() {
        return {
            startTime: this.startTime.toStr(),
            finishTime: this.finishTime.toStr(),
        };
    }

    public dataSec() {
        return {
            startTimeSec: this.startTime.toSec(),
            finishTimeSec: this.finishTime.toSec(),
        };
    }
}

class Time {
    private static h = 24;
    private static m = 60;
    private static s = 60;
    private static formatRgex = /^\d{1,2}:\d{2}$/;
    private static toSec(timeStr: string): number {
        const [h, m] = timeStr.split(":").map((v) => Number(v));
        return h * this.m * this.s + m * this.s;
    }
    private static limitStartTimeSec(): number {
        return this.h * this.m * this.s;
    }
    public static diff(t1: Time, t2: Time): number {
        return t1.sec - t2.sec;
    }

    public static fromStr(value: string): Time {
        return new Time(Time.toSec(value));
    }

    sec: number;
    constructor(value: number) {
        this.sec = value;
        if (!Time.formatRgex.test(this.toStr())) {
            throw new RangeError(
                `timeの値が"XX:XX"以外の形式で与えられました value: ${value}`
            );
        }
    }

    public isEqualTo(time: Time): boolean {
        return this.sec === time.sec;
    }

    public toStr(): string {
        const m = Math.floor(this.sec / Time.s) % Time.m;
        const h = Math.floor(Math.floor(this.sec / Time.s) / Time.m);
        return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
    }

    public toSec(): number {
        return this.sec;
    }

    public isIllegalStartTime(): boolean {
        return this.sec < 0 || Time.limitStartTimeSec() < this.sec;
    }
}