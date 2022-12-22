import { Ratio } from "../ratio";
import { Time } from "../time";

describe("Time.fromStr()は", () => {
    interface TestData {
        params: string;
    }
    const testData: TestData[] = [
        { params: "hogehoge" },
        { params: "99:999" },
        { params: "0:0" },
        { params: "-0:00" },
    ];
    test.each(testData)(
        "/^\\d{1,2}:\\d{2}$/ 以外の形式で値を与えられるとRangeErrorを投げる",
        (testData) => {
            expect(() => {
                Time.fromStr(testData.params);
            }).toThrow(RangeError);
        }
    );
    test("0 <= minute < 60の範囲外だとRangeErrorを投げる", () => {
        expect(() => Time.fromStr("12:00")).not.toThrow(RangeError);
        expect(() => Time.fromStr("12:60")).toThrow(RangeError);
    });
});

describe("time.reduce()は", () => {
    test("12:00の割合は0.5", () => {
        expect(Time.fromStr("12:00").reduce()).toEqual(new Ratio(0.5));
    });
    test("4:30の割合は4.5/24", () => {
        expect(Time.fromStr("4:30").reduce()).toEqual(new Ratio(4.5 / 24));
    });
});

describe("time.getStr()は", () => {
    interface TestData {
        params: string;
        expected: string;
    }
    const testData: TestData[] = [
        { params: "4:30", expected: "4:30" },
        { params: "12:05", expected: "12:05" },
    ];
    test.each(testData)("XX:XX形式の文字列を返す", (testData) => {
        expect(Time.fromStr(testData.params).getStr()).toEqual(
            testData.expected
        );
    });
});

describe("time.startTime()は", () => {
    test("0:00~24:00の範囲内で生成される", () => {
        expect(Time.startTime("0:00")).toEqual(Time.fromStr("0:00"));
        expect(Time.startTime("24:00")).toEqual(Time.fromStr("24:00"));
    });

    test("0:00~24:00の範囲外ではRangeError", () => {
        expect(() => Time.startTime("25:00")).toThrow(RangeError);
        expect(() => Time.startTime("24:01")).toThrow(RangeError);
    });
});

describe("time.finishTime()は", () => {
    interface TestData {
        params: { startTime: string; finishTime: string };
        expected: string;
    }
    const testData: TestData[] = [
        {
            params: { startTime: "0:00", finishTime: "0:00" },
            expected: "0:00",
        },
        {
            params: { startTime: "0:00", finishTime: "24:00" },
            expected: "24:00",
        },
        {
            params: { startTime: "23:12", finishTime: "27:12" },
            expected: "27:12",
        },
        {
            params: { startTime: "23:00", finishTime: "6:35" },
            expected: "6:35",
        },
    ];
    test.each(testData)(
        "startTimeから前後24時間以内の範囲で生成される",
        (testData) => {
            const startTime = Time.startTime(testData.params.startTime);
            expect(
                Time.finishTime(testData.params.finishTime, startTime)
            ).toEqual(Time.fromStr(testData.expected));
        }
    );

    test("startTimeから前後24時間以内でない範囲でRangeError", () => {
        const startTime = Time.startTime("10:00");
        expect(() => Time.finishTime("34:01", startTime)).toThrow(RangeError);
    });
});
