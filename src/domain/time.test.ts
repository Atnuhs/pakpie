import { Time } from "./time";

describe("Time.fromStr()は", () => {
    test("/^\\d{1,2}:\\d{2}$/ 以外の形式で値を与えられるとRangeErrorを投げる", () => {
        expect(() => {
            Time.fromStr("hogehoge");
        }).toThrowError(RangeError);
        expect(() => {
            Time.fromStr("99:999");
        }).toThrowError(RangeError);
        expect(() => {
            Time.fromStr("-3:05");
        }).toThrowError(RangeError);
    });
});

describe("time.reduce()は", () => {
    test("12:00の割合は0.5", () => {
        expect(Time.fromStr("12:00").reduce()).toEqual(0.5);
    });
    test("4:30の割合は4.5/24", () => {
        expect(Time.fromStr("4:30").reduce()).toEqual(4.5 / 24);
    });
});

describe("time.getStr()は", () => {
    test("4:30のTimeは4:30という文字列を返す", () => {
        expect(Time.fromStr("4:30").getStr()).toEqual("4:30");
    });
    test("4:05のTimeは4:05という文字列を返す", () => {
        expect(Time.fromStr("4:05").getStr()).toEqual("4:05");
    });
    test("12:05のTimeは12:05という文字列を返す", () => {
        expect(Time.fromStr("12:05").getStr()).toEqual("12:05");
    });
});
