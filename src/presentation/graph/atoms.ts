import { setHTMLAttributes, setSVGAttributes } from "../lib/DOMHelper";
import { PieChartLength, PieChartPieData, PieChartPoint } from "../task/task";

export const lineColor = "#222222";
export const fillColor = "#eeeeee";
export const fillColorFocused = "#e65278";
export const lineWidth = 2;
export const opacity = 80;
export const opacityFocused = 40;
export const svgSize = 500;
export const rSize = 200;
export const axisLength = 10;
export const rLabelSize = 220;
export const oSize = svgSize / 2;
export const fontSize = 24;
export const fontFamily = "sans-serif";
export const hoursInDay = 24;

const toPx = (val: number): string => {
    return `${val.toFixed(3)}px`;
};

const toPercent = (val: number): string => {
    return `${val.toFixed(3)}%`;
};

export const text = (label: string, g: PieChartPoint) => {
    const t = setSVGAttributes(
        document.createElementNS("http://www.w3.org/2000/svg", "text")
    )({
        x: toPx(g.x),
        y: toPx(g.y),
        "text-anchor": "middle",
        "dominant-baseline": "central",
        "font-size": toPx(fontSize),
        "font-family": fontFamily,
        fill: lineColor,
        "fill-opacity": toPercent(opacity),
    });
    t.innerHTML = label;
    return t;
};

export const line = (s: PieChartPoint, f: PieChartPoint): SVGLineElement => {
    return setSVGAttributes(
        document.createElementNS("http://www.w3.org/2000/svg", "line")
    )({
        x1: toPx(s.x),
        y1: toPx(s.y),
        x2: toPx(f.x),
        y2: toPx(f.y),
        stroke: lineColor,
        "stroke-width": toPx(lineWidth),
        "stroke-opacity": toPercent(opacity),
    });
};

export const circle = (
    o: PieChartPoint,
    r: PieChartLength
): SVGCircleElement => {
    const c = setSVGAttributes(
        document.createElementNS("http://www.w3.org/2000/svg", "circle")
    )({
        cx: toPx(o.x),
        cy: toPx(o.y),
        r: toPx(r.value),
        fill: "none",
        "fill-opacity": toPercent(opacity),
        stroke: lineColor,
        "stroke-width": toPx(lineWidth),
        "stroke-opacity": toPercent(opacity),
    });
    c.onmouseover = (e) => e.preventDefault();
    c.onmouseleave = (e) => e.preventDefault();
    return c;
};

export const svg = (): SVGElement => {
    const s = setSVGAttributes(
        document.createElementNS("http://www.w3.org/2000/svg", "svg")
    )({
        width: toPx(svgSize),
        height: toPx(svgSize),
    });
    s.onmouseover = (e) => e.preventDefault();
    s.onmouseleave = (e) => e.preventDefault();
    return s;
};

export const rect = (): SVGRectElement => {
    const r = setSVGAttributes(
        document.createElementNS("http://www.w3.org/2000/svg", "rect")
    )({
        width: toPx(svgSize),
        height: toPx(svgSize),
        fill: fillColor,
        "fill-opacity": toPercent(opacity),
    });
    r.onmouseover = (e) => e.preventDefault();
    r.onmouseleave = (e) => e.preventDefault();
    return r;
};

export const button = (label: string): HTMLButtonElement =>
    setHTMLAttributes(document.createElement("button"))(label)({
        "font-size": toPx(fontSize),
        "background-color": "#a482a9",
        "border-radius": "8px",
    })({});

export const pie = (data: PieChartPieData): SVGPathElement => {
    const p = setSVGAttributes(
        document.createElementNS("http://www.w3.org/2000/svg", "path")
    )({
        d: `M ${data.o.x} ${data.o.y} L ${data.s.x} ${data.s.y} A ${data.r.value} ${data.r.value} 0 ${data.largeArcSweepFlag} 1 ${data.f.x} ${data.f.y}`,
        fill: data.color,
        "fill-opacity": toPercent(opacity),
        cursor: "crosshair",
    });
    p.onpointerover = (e) => {
        e.preventDefault();
        const p = e.target as SVGPathElement;
        p.setAttribute("fill-opacity", toPercent(opacityFocused));
    };
    p.onpointerleave = (e) => {
        e.preventDefault();
        const p = e.target as SVGPathElement;
        p.setAttribute("fill-opacity", toPercent(opacity));
    };

    p.onpointerdown = (e) => {
        e.preventDefault();
        const p = e.target as SVGPathElement;
        p.setAttribute("fill", fillColorFocused);
    };
    p.onpointerup = (e) => {
        e.preventDefault();
        const p = e.target as SVGPathElement;
        p.setAttribute("fill", data.color);
    };

    return p;
};
