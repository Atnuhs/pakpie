import { Length } from "./length";
import { Point } from "./point";
import { PiePointCalculator } from "./pointCalculator";
import { Ratio } from "./ratio";

describe("PiePointCalculator.calcPoint()は", () => {
    const o = new Point(250, 250);
    const r = new Length(200);
    const ppc = new PiePointCalculator(o, r);
    interface TestData {
        params: Parameters<typeof ppc.calc>;
        expected: ReturnType<typeof ppc.calc>;
    }
    const testData: TestData[] = [
        {
            params: [new Ratio(0), new Ratio(0)],
            expected: {
                o: o,
                s: o.Yminus(r),
                f: o.Yminus(r),
                g: o.Yminus(r.half()),
            },
        },
        {
            params: [new Ratio(0), new Ratio(0.5)],
            expected: {
                o: o.closeTo(5),
                s: o.Yminus(r).closeTo(5),
                f: o.Yplus(r).closeTo(5),
                g: o.Xplus(r.half()).closeTo(5),
            },
        },
        {
            params: [new Ratio(0.25), new Ratio(0.5)],
            expected: {
                o: o.closeTo(5),
                s: o.Xplus(r).closeTo(5),
                f: o.Yplus(r).closeTo(5),
                g: o
                    .Xplus(new Length(r.half().value * Math.SQRT1_2))
                    .Yplus(new Length(r.half().value * Math.SQRT1_2))
                    .closeTo(5),
            },
        },
    ];
    test.each(testData)(
        "(startRatio, finishRatio) から o, s, f, gを返す",
        (testData: TestData) => {
            expect(ppc.calc(...testData.params)).toEqual(testData.expected);
        }
    );
});
