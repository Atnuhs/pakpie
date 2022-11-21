import { Color, Opacity, RGB } from "./color";
import { Label } from "./label";
import { Point } from "./point";
import { GraphRadius, GraphCenter } from "./scales";
import { Size } from "./size";

type AxisElement = SVGCircleElement | SVGLineElement | SVGTextElement;

interface LabelAttr {
    radius: Size;
    fontSize: Size;
    fontFamily: string;
    fontColor: Color;
}

export class Axis {
    constructor(
        private width: Size,
        private majorTick: Size,
        private center: GraphCenter,
        private radius: GraphRadius,
        private color: Color,
        private opacity: Opacity,
        private labelRadius: Size,
        private labelFontSize: Size,
        private labelFontFamily: string,
        private labelFontColor: Color,
        private labelFontOpacity: Opacity
    ) {}

    private newAxisCircleSVG(): SVGCircleElement {
        const axisCircle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        const { x: cx, y: cy } = this.center.xyPx();
        Object.assign(axisCircle, {
            cx: cx,
            cy: cy,
            r: this.radius.px(),
            fill: "None",
            stroke: this.color.toStr(),
            "fill-opacity": this.opacity.toStr(),
        });
        return axisCircle;
    }

    private originMajorTickRootPoint(): Point {
        const { x: cx, y: cy } = this.center.xyNum();
        const radius = this.radius.num();
        return new Point(cx, cy - radius);
    }

    private originMajorTickTipPoint(): Point {
        const { x: cx, y: cy } = this.center.xyNum();
        const radius = this.radius.num() - this.majorTick.num();
        return new Point(cx, cy - radius);
    }

    private originLabelPoint(): Point {
        const { x: cx, y: cy } = this.center.xyNum();
        const radius = this.labelRadius.num();
        return new Point(cx, cy - radius);
    }

    private newMajorTickSVG(rad: number): SVGLineElement {
        const rootTickPoint = this.center.rotate(
            this.originMajorTickRootPoint(),
            rad
        );
        const tipTickPoint = this.center.rotate(
            this.originMajorTickTipPoint(),
            rad
        );

        const majorTick = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        Object.assign(majorTick, {
            x1: rootTickPoint.xyPx().x,
            y1: rootTickPoint.xyPx().y,
            x2: tipTickPoint.xyPx().x,
            y2: tipTickPoint.xyPx().x,
            stroke: this.color.toStr(),
            "stroke-width": this.width.px(),
        });
        return majorTick;
    }

    private newMajorTickLabelSVG(i: number, rad: number): SVGTextElement {
        const originLabelPoint = this.center.rotate(
            this.originLabelPoint(),
            rad
        );
        const label = new Label(
            `${i}`,
            this.labelFontSize,
            this.labelFontColor,
            this.labelFontFamily,
            this.labelFontOpacity,
            originLabelPoint
        );
        return label.svgText();
    }

    public axisElements(): AxisElement[] {
        const axisElements: AxisElement[] = [this.newAxisCircleSVG()];
        for (let i = 0; i < 24; i++) {
            const rad = (i / 24) * 2 * Math.PI;
            axisElements.push(this.newMajorTickSVG(rad));
            axisElements.push(this.newMajorTickLabelSVG(i, rad));
        }
        return axisElements;
    }
}
