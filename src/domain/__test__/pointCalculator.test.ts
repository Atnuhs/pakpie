import { Length } from "../length";
import { Point } from "../point";
import { PiePointCalculator } from "../pointCalculator";
import { Ratio } from "../ratio";
const o = new Point(250, 250);
const r = new Length(200);

describe("PiePointCalculator.calcPoint()は", () => {
    const ppc = new PiePointCalculator(o, r);
    const digit = 3;
    interface TestData {
        params: Parameters<typeof ppc.calc>;
        expected: ReturnType<typeof ppc.calc>;
    }
    const testData: TestData[] = [
        {
            params: [new Ratio(0), new Ratio(0)],
            expected: {
                o: o.closeTo(digit),
                s: o.Yminus(r).closeTo(digit),
                f: o.Yminus(r).closeTo(digit),
                g: o.Yplus(r.half()).closeTo(digit),
                largeArcSweepFlag: 1,
            },
        },
        {
            params: [new Ratio(0), new Ratio(0.5)],
            expected: {
                o: o.closeTo(digit),
                s: o.Yminus(r).closeTo(digit),
                f: o.Yplus(r).closeTo(digit),
                g: o.Xplus(r.half()).closeTo(digit),
                largeArcSweepFlag: 0,
            },
        },
        {
            params: [new Ratio(0.25), new Ratio(0.5)],
            expected: {
                o: o.closeTo(digit),
                s: o.Xplus(r).closeTo(digit),
                f: o.Yplus(r).closeTo(digit),
                g: o
                    .Xplus(new Length(r.half().value * Math.SQRT1_2))
                    .Yplus(new Length(r.half().value * Math.SQRT1_2))
                    .closeTo(digit),
                largeArcSweepFlag: 0,
            },
        },
        {
            params: [new Ratio(0.5), new Ratio(0)],
            expected: {
                o: o.closeTo(digit),
                s: o.Yplus(r).closeTo(digit),
                f: o.Yminus(r).closeTo(digit),
                g: o.Xminus(r.half()).closeTo(digit),
                largeArcSweepFlag: 0,
            },
        },
    ];
    test.each(testData)(
        "(startRatio, finishRatio) から o, s, f, g, flagを返す",
        (testData: TestData) => {
            expect(ppc.calc(...testData.params)).toEqual(testData.expected);
        }
    );
});
