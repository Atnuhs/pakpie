import { PieChartLength, PieChartPoint } from "../task/task";
import {
    axisLength,
    circle,
    hoursInDay,
    line,
    oSize,
    rLabelSize,
    rSize,
    text,
} from "./atoms";

const rotate = (
    o: PieChartPoint,
    r: PieChartLength,
    rad: number
): PieChartPoint => {
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const vec = { x: 0, y: -r.value };
    const nx = vec.x * cos - vec.y * sin;
    const ny = vec.x * sin + vec.y * cos;
    return { x: nx + o.x, y: ny + o.y };
};

export const frame = (): SVGElement[] => {
    const o = { x: oSize, y: oSize };
    const r1 = { value: rSize };
    const r2 = { value: rSize - axisLength };
    const rLabel = { value: rLabelSize };
    const ret: SVGElement[] = [];

    ret.push(circle(o, r1));
    for (let i = 0; i < hoursInDay; i++) {
        const rad = (i / hoursInDay) * 2 * Math.PI;
        const p1 = rotate(o, r1, rad);
        const p2 = rotate(o, r2, rad);
        ret.push(line(p2, p1));
    }
    for (let i = 0; i < hoursInDay; i++) {
        const rad = (i / hoursInDay) * 2 * Math.PI;
        const g = rotate(o, rLabel, rad);
        const t = text(`${i}`, g);
        ret.push(t);
    }
    return ret;
};
