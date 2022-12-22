import { Length } from "../../domain/length";
import { Point } from "../../domain/point";
import { PiePointCalculator } from "../../domain/pointCalculator";
import { Time } from "../../domain/time";

export interface PieChartPoint {
    readonly x: number;
    readonly y: number;
}

export interface PieChartLength {
    readonly value: number;
}

export interface TaskData {
    readonly label: string;
    readonly color: string;
    readonly startTime: string;
    readonly finishTime: string;
}

export interface PieChartPieData {
    readonly o: PieChartPoint;
    readonly r: PieChartLength;
    readonly s: PieChartPoint;
    readonly f: PieChartPoint;
    readonly g: PieChartPoint;
    readonly label: string;
    readonly color: string;
    readonly largeArcSweepFlag: number;
}

export class Task {
    public static new(data: TaskData): Task {
        const startTime = Time.startTime(data.startTime);
        return new Task(
            data.label,
            data.color,
            Time.startTime(data.startTime),
            Time.finishTime(data.finishTime, startTime)
        );
    }
    constructor(
        public readonly label: string,
        public readonly color: string,
        private readonly startTime: Time,
        private readonly finishTime: Time
    ) {}

    getPieData(o: PieChartPoint, r: PieChartLength): PieChartPieData {
        const calculator = new PiePointCalculator(
            new Point(o.x, o.y),
            new Length(r.value)
        );
        const p = calculator.calc(
            this.startTime.reduce(),
            this.finishTime.reduce()
        );
        return {
            o: p.o,
            s: p.s,
            f: p.f,
            g: p.g,
            r: r,
            label: this.label,
            color: this.color,
            largeArcSweepFlag: p.largeArcSweepFlag,
        };
    }
}
