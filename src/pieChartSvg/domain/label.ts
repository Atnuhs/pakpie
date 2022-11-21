import { Color, Opacity } from "./color";
import { Point } from "./point";
import { Size } from "./size";

export class Label {
    constructor(
        private innerHTML: string,
        private fontSize: Size,
        private fontColor: Color,
        private fontFamily: string,
        private fontOpacity: Opacity,
        private point: Point
    ) {}

    private textAttributes() {
        return {
            x: this.point.xyPx().x,
            y: this.point.xyPx().y,
            "text-anchor": "middle",
            "dominant-baseline": "central",
            "font-size": this.fontSize.px(),
            "font-family": this.fontFamily,
            fill: this.fontColor.toStr(),
            "fill-opacity": this.fontOpacity.toStr(),
        };
    }

    svgText(): SVGTextElement {
        const svgText = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
        svgText.innerHTML = this.innerHTML;
        Object.assign(svgText, this.textAttributes());
        return svgText;
    }

    scale(scale: number) {
        this.fontSize.scale(scale);
        this.point.scale(scale);
    }
}
