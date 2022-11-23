import { AddNewPieRequestDTO } from "../../UseCase/addNewPieUseCase/addNewPieDTO";
import { setAttributes } from "./attributes";
import { Color, Opacity, RGB } from "./color";
import { Label } from "./label";
import { Point } from "./point";
import { GraphCenter, GraphRadius } from "./scales";
import { Size } from "./size";
import { TimeSpan } from "./timeSpan";

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
    private pieColor: Color;
    constructor(
        req: AddNewPieRequestDTO,
        private pieOpacity: Opacity,
        private pieLabelFontOpacity: Opacity,
        private radius: GraphRadius,
        private center: GraphCenter
    ) {
        this.timeSpan = new TimeSpan(req.startTime, req.finishTime);
        this.pieColor = new RGB(req.pieColor);
        this.label = new Label(
            req.title,
            new Size(req.fontSize),
            new RGB(req.fontColor),
            req.fontFamily,
            this.pieLabelFontOpacity,
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
        return this.finishTimeRad() - this.startTimeRad() <= Math.PI ? 0 : 1;
    }

    private centroidPoint(): Point {
        const rad1 = this.startTimeRad() - Math.PI / 2;
        const rad2 = this.finishTimeRad() - Math.PI / 2;
        const { x: cx, y: cy } = this.center.xyNum();
        const r = this.radius.num();
        const st1 = Math.sin(rad1);
        const ct1 = Math.cos(rad1);
        const st2 = Math.sin(rad2);
        const ct2 = Math.cos(rad2);
        const factor = (2 * r) / (3 * (rad2 - rad1));
        const xg = factor * (st2 - st1) + cx;
        const yg = factor * (ct1 - ct2) + cy;
        return new Point(xg, yg);
    }

    private pieAttributes() {
        const { x: cx, y: cy } = this.center.xyNum();
        const { x: sx, y: sy } = this.startTimePoint().xyNum();
        const { x: fx, y: fy } = this.finishTimePoint().xyNum();
        const r = this.radius.num();
        return {
            d: `M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 ${this.largeArcSweepFlag()} 1 ${fx} ${fy}`,
            fill: this.pieColor.toStr(),
            "fill-opacity": this.pieOpacity.toStr(),
        };
    }

    private circleAttributes() {
        const { x: cx, y: cy } = this.center.xyPx();
        return {
            cx: cx,
            cy: cy,
            r: this.radius.px(),
            fill: this.pieColor.toStr(),
            "fill-opacity": this.pieOpacity.toStr(),
        };
    }

    private isCircled() {
        return (
            (this.timeSpan.dataSec().finishTimeSec -
                this.timeSpan.dataSec().startTimeSec) %
                (3600 * 24) ===
            0
        );
    }

    pieElements(): SVGElement[] {
        return [
            this.isCircled()
                ? setAttributes(
                      document.createElementNS(
                          "http://www.w3.org/2000/svg",
                          "circle"
                      )
                  )(this.circleAttributes())
                : setAttributes(
                      document.createElementNS(
                          "http://www.w3.org/2000/svg",
                          "path"
                      )
                  )(this.pieAttributes()),
            [this.label.svgText()].map((svg) =>
                setAttributes(svg)({
                    "font-weight": "700",
                    stroke: "#eeeeee",
                    "stroke-width": "1px",
                })
            )[0],
        ];
    }
}
