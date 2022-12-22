import { Rad } from "../rad";

function closeTo(rad: Rad): Rad {
    return new Rad(expect.closeTo(rad.rad));
}

describe("Rad.middleRad()は", () => {
    const zeroRad = new Rad(0);
    const fullRad = new Rad(Math.PI * 2);
    const halfRad = new Rad(Math.PI);
    interface TestData {
        from: Rad;
        to: Rad;
        expected: Rad;
    }
    const testData: TestData[] = [
        { from: zeroRad, to: fullRad, expected: closeTo(halfRad) },
        { from: zeroRad, to: zeroRad, expected: closeTo(halfRad) },
        {
            from: halfRad,
            to: zeroRad,
            expected: closeTo(halfRad.plus(halfRad.half())),
        },
    ];

    test.each(testData)(
        "fromからtoへ時計回りに進んだ時のちょうど中間の位置の角度を返す",
        (testData) => {
            expect(Rad.middleRad(testData.from, testData.to)).toEqual(
                testData.expected
            );
        }
    );
});
