import { Ratio } from "../ratio";
describe("new Ratio(value)は", () => {
    test("valueを1で割ったあまりとする", () => {
        expect(new Ratio((27 + 5 / 60) / 24)).toEqual(
            new Ratio((3 + 5 / 60) / 24)
        );
    });
});

describe("from.distance(to)は", () => {
    interface TestData {
        from: Ratio;
        to: Ratio;
        expected: Ratio;
    }
    const testData: TestData[] = [
        {
            from: new Ratio(0.1),
            to: new Ratio(0.9),
            expected: new Ratio(0.8),
        },
    ];
    test.each(testData)(
        "modの数直線でfromから右方向を見たときのtoへの距離を表す",
        (testData) => {
            expect(testData.from.distance(testData.to)).toEqual(
                testData.expected
            );
        }
    );
});
