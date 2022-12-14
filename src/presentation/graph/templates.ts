import { genForm } from "../form/form";
import { button } from "./atoms";
import { Canvg } from "canvg";
import { setHTMLAttributes } from "../lib/DOMHelper";

const border = "solid 2px #f9f9f9";
const boxShadow = "5px 5px 20px #aaa";

const svgToCanvas = (svg: SVGElement): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = Number(svg.getAttribute("width"));
    canvas.height = Number(svg.getAttribute("height"));
    const svgData = new XMLSerializer().serializeToString(svg);
    const context = canvas.getContext("2d");
    if (context == null) {
        throw new Error("failed to get context");
    }
    const v = Canvg.fromString(context, svgData);
    v.start();
    return canvas;
};

const saveImageEvent = (canvas: HTMLCanvasElement, filename: string) => {
    return () => {
        const a = document.createElement("a");
        a.download = filename;
        a.href = canvas.toDataURL("image/png");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
};

const divTemplate = () =>
    setHTMLAttributes(document.createElement("div"))("")({
        border: border,
        "box-shadow": boxShadow,
        padding: "10px",
        "background-color": "#fafafa"
    });

export const resultDiv = (svg: SVGElement): HTMLDivElement => {
    const resultDiv = divTemplate()({ id: "result-div" });
    const canvas = svgToCanvas(svg);
    const b = button("Save");
    b.onclick = saveImageEvent(canvas, "pieChart.png");
    resultDiv.appendChild(svg);
    resultDiv.appendChild(b);
    return resultDiv;
};

export const formDiv = (): HTMLDivElement => {
    const formDiv = divTemplate()({ id: "form-div" });
    formDiv.appendChild(genForm());
    return formDiv;
};
