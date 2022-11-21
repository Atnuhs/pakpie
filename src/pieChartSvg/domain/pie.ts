import { Color, Opacity} from "./color";
import { Label } from "./label";
import { Point } from "./point";
import { GraphCenter, GraphRadius } from "./scales";
import { Size } from "./size";
import { TimeSpan } from "./timeSpan";

type PieElement = SVGPathElement | SVGTextElement;

export class Pie {
    private static h = 24;
    private static m = 60;
    private static s = 60;
    private static daySec = this.h * this.m * this.s;
    private static secToRad(sec: number): number {
        return (sec / this.daySec) * 2 * Math.PI;
    }
    private label: Label;
    private timeSpan: TimeSpan;
    constructor(
        title: string,
        fontFamily: string,
        fontColor: Color,
        fontOpacity: Opacity,
        fontSize: Size,
        startTime: string,
        finshTime: string,
        private pieColor: Color,
        private pieOpacity: Opacity,
        private radius: GraphRadius,
        private center: GraphCenter
    ) {
        this.timeSpan = new TimeSpan(startTime, finshTime);
        this.label = new Label(
            title,
            fontSize,
            fontColor,
            fontFamily,
            fontOpacity,
            this.centroidPoint()
        );
    }

    private startTimeRad(): number {
        return Pie.secToRad(this.timeSpan.startTime.sec);
    }

    private finishTimeRad(): number {
        return Pie.secToRad(this.timeSpan.finishTime.sec);
    }

    private originPoint(): Point {
        return new Point(
            this.center.xyNum().x,
            this.center.xyNum().y - this.radius.num()
        );
    }

    private startTimePoint(): Point {
        return this.center.rotate(this.originPoint(), this.startTimeRad());
    }

    private finishTimePoint(): Point {
        return this.center.rotate(this.originPoint(), this.finishTimeRad());
    }

    private largeArcSweepFlag(): number {
        return this.finishTimeRad() - this.finishTimeRad() <= Math.PI ? 0 : 1;
    }

    private centroidPoint(): Point {
        const rad1 = this.startTimeRad();
        const rad2 = this.finishTimeRad();
        const { x: cx, y: cy } = this.center.xyNum();
        const r = this.radius.num();
        const st1 = Math.sin(rad1);
        const ct1 = Math.cos(rad1);
        const st2 = Math.sin(rad2);
        const ct2 = Math.cos(rad2);
        const denominator = 2 * (rad2 - rad1);
        const xg = (2 * r * (st2 - st1)) / denominator + cx;
        const yg = (2 * r * (ct1 - ct2)) / denominator + cy;
        return new Point(xg, yg);
    }

    private pieAttributes() {
        const { x: cx, y: cy } = this.center.xyPx();
        const { x: sx, y: sy } = this.startTimePoint().xyPx();
        const { x: fx, y: fy } = this.finishTimePoint().xyPx();
        const r = this.radius.num();
        return {
            d: `M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 ${this.largeArcSweepFlag()} 1 ${fx} ${fy}`,
            fill: this.pieColor.toStr(),
            "fill-opacity": this.pieOpacity.toStr(),
        };
    }

    pieElements(): PieElement[] {
        const pathElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        Object.assign(pathElement, this.pieAttributes());

        return [pathElement, this.label.svgText()];
    }
}
