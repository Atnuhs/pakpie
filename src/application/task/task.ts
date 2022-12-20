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
    readonly startTime: string;
    readonly finishTime: string;
}

export interface PieChartPiePoints {
    readonly o: PieChartPoint;
    readonly s: PieChartPoint;
    readonly f: PieChartPoint;
    readonly g: PieChartPoint;
}

export class Task implements TaskData {
    public static new(data: TaskData): Task {
        return new Task(data.label, data.startTime, data.finishTime);
    }
    constructor(
        public readonly label: string,
        public readonly startTime: string,
        public readonly finishTime: string
    ) {}

    getPie(o: PieChartPoint, r: PieChartLength): PieChartPiePoints {
        const calculator = new PiePointCalculator(
            new Point(o.x, o.y),
            new Length(r.value)
        );
        const p = calculator.calc(
            Time.fromStr(this.startTime).reduce(),
            Time.fromStr(this.finishTime).reduce()
        );
        return {
            o: p.o,
            s: p.s,
            f: p.f,
            g: p.g,
        };
    }
}
