import { PieChartLength, PieChartPoint, Task } from "./task";

const closeTo = (p: PieChartPoint): PieChartPoint => {
    return { x: expect.closeTo(p.x), y: expect.closeTo(p.y) };
};

describe("Task.getPie()は", () => {
    interface TestData {
        task: Task;
        o: PieChartPoint;
        r: PieChartLength;
        expected: {
            o: PieChartPoint;
            s: PieChartPoint;
            f: PieChartPoint;
            g: PieChartPoint;
        };
    }
    const o: PieChartPoint = { x: 250, y: 250 };
    const r: PieChartLength = { value: 200 };
    const testData: TestData[] = [
        {
            task: Task.new({
                label: "睡眠",
                startTime: "0:00",
                finishTime: "12:00",
                color: "",
            }),
            o: o,
            r: r,
            expected: {
                o: closeTo(o),
                s: closeTo({ x: o.x, y: o.y - r.value }),
                f: closeTo({ x: o.x, y: o.y + r.value }),
                g: closeTo({ x: o.x + r.value / 2, y: o.y }),
            },
        },
        {
            task: Task.new({
                label: "睡眠",
                startTime: "12:00",
                finishTime: "0:00",
                color: "",
            }),
            o: o,
            r: r,
            expected: {
                o: closeTo(o),
                s: closeTo({ x: o.x, y: o.y + r.value }),
                f: closeTo({ x: o.x, y: o.y - r.value }),
                g: closeTo({ x: o.x - r.value / 2, y: o.y }),
            },
        },
        {
            task: Task.new({
                label: "睡眠",
                startTime: "18:00",
                finishTime: "6:00",
                color: "",
            }),
            o: o,
            r: r,
            expected: {
                o: closeTo(o),
                s: closeTo({ x: o.x - r.value, y: o.y }),
                f: closeTo({ x: o.x + r.value, y: o.y }),
                g: closeTo({ x: o.x, y: o.y - r.value / 2 }),
            },
        },
    ];

    test.each(testData)("(o, r)から(o, s, f, g)を返す", (testData) => {
        expect(testData.task.getPieData(testData.o, testData.r)).toEqual(
            testData.expected
        );
    });
});
