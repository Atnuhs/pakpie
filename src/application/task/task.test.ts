import { PieChartLength, PieChartPoint, Task } from "./task";

const closeTo = (p: PieChartPoint): PieChartPoint => {
    return { x: expect.closeTo(p.x), y: expect.closeTo(p.y) };
};

describe("Task.getPie()は", () => {
    const task = Task.new({
        label: "睡眠",
        startTime: "0:00",
        finishTime: "12:00",
    });
    const o: PieChartPoint = { x: 250, y: 250 };
    const r: PieChartLength = { value: 200 };

    test("(o, r)から(o, s, f, g)を返す", () => {
        expect(task.getPie(o, r)).toEqual({
            o: closeTo(o),
            s: closeTo({ x: o.x, y: o.y - r.value }),
            f: closeTo({ x: o.x, y: o.y + r.value }),
            g: closeTo({ x: o.x + r.value / 2, y: o.y }),
        });
    });
});
