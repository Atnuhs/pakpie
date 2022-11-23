import { AddNewPieRequestDTO } from "../../UseCase/addNewPieUseCase/addNewPieDTO";
import { setAttributes } from "./attributes";
import { Axis } from "./axis";
import { Color, Opacity, RGB } from "./color";
import { Pie } from "./pie";
import { GraphCenter, GraphRadius, SVGSize } from "./scales";
import { Size } from "./size";

export interface PieChartRepositoryInterface {
    save(graph: PieChartSvg): void;
    load(): PieChartSvg;
    isSaved(): boolean;
}

export class PieChartSvg {
    private svgSize: SVGSize;
    private graphCenter: GraphCenter;
    private graphRadius: GraphRadius;
    private backgroundColor: Color;
    private backgroundOpacity: Opacity;
    private axisMajorTickSize: Size;
    private axisColor: Color;
    private axisWidth: Size;
    private axisOpacity: Opacity;
    private axisLabelRadius: Size;
    private axisLabelFontSize: Size;
    private axisLabelFontColor: Color;
    private axisLabelFontFamily: string;
    private axisLabelFontOpacity: Opacity;
    private pieOpacity: Opacity;
    private pieLabelFontOpacity: Opacity;
    private axis: Axis;
    private pies: Pie[];

    constructor() {
        // グラフの新規作成
        const defaultBlackColor = () => new RGB("#222222");
        const defaultWhiteColor = () => new RGB("#eeeeee");
        const defaultOpacity = () => new Opacity("80%");
        this.svgSize = new Size(500);
        const center = this.svgSize.scale(0.5).num();
        const defaultFontSize = this.svgSize.scale(0.05).num();
        this.graphCenter = new GraphCenter(center, center);
        this.graphRadius = this.svgSize.scale(0.4);
        this.backgroundColor = defaultWhiteColor();
        this.backgroundOpacity = defaultOpacity();
        this.axisMajorTickSize = this.svgSize.scale(0.02);
        this.axisColor = defaultBlackColor();
        this.axisWidth = this.svgSize.scale(0.004);
        this.axisOpacity = defaultOpacity();
        this.axisLabelRadius = this.svgSize.scale(0.44);
        this.axisLabelFontSize = new Size(defaultFontSize);
        this.axisLabelFontColor = defaultBlackColor();
        this.axisLabelFontFamily = "sans-serif";
        this.axisLabelFontOpacity = defaultOpacity();
        this.pieOpacity = new Opacity("40%");
        this.pieLabelFontOpacity = defaultOpacity();

        this.axis = new Axis(
            this.axisWidth,
            this.axisMajorTickSize,
            this.graphCenter,
            this.graphRadius,
            this.axisColor,
            this.axisOpacity,
            this.axisLabelRadius,
            this.axisLabelFontSize,
            this.axisLabelFontFamily,
            this.axisLabelFontColor,
            this.axisLabelFontOpacity
        );

        this.pies = [];
    }
    private svgAttributes() {
        return {
            width: this.svgSize.px(),
            height: this.svgSize.px(),
        };
    }

    public pushPie(req: AddNewPieRequestDTO) {
        this.pies.push(
            new Pie(
                req,
                this.pieOpacity,
                this.pieLabelFontOpacity,
                this.graphRadius,
                this.graphCenter
            )
        );
    }

    private svgRectAttributes() {
        return {
            width: this.svgSize.px(),
            height: this.svgSize.px(),
            fill: this.backgroundColor.toStr(),
            "fill-opacity": this.backgroundOpacity.toStr(),
        };
    }

    svg(): SVGElement {
        const svg = setAttributes(
            document.createElementNS("http://www.w3.org/2000/svg", "svg")
        )(this.svgAttributes());

        const rect = setAttributes(
            document.createElementNS("http://www.w3.org/2000/svg", "rect")
        )(this.svgRectAttributes());

        svg.appendChild(rect);

        this.axis
            .axisElements()
            .forEach((axisElement) => svg.appendChild(axisElement));

        this.pies.forEach((pie) =>
            pie
                .pieElements()
                .forEach((pieElement) => svg.appendChild(pieElement))
        );

        return svg;
    }
}
