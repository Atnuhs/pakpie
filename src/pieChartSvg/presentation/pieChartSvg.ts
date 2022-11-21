import { NewPieChartSvgUseCase } from "../UseCase/newPieChartSvgUseCase/newPieChartSvgUseCase";

export const newPieChartDiv = (): HTMLDivElement => {
    const newPieChartSvgUseCase = new NewPieChartSvgUseCase();
    const { svg: pieChartSVG } = newPieChartSvgUseCase.getPieChartSvg();
    const pieChartDiv = document.createElement("div");
    pieChartDiv.style.border = "solid 2px #eee";
    pieChartDiv.style.boxShadow = "4px 4px 10px -2px";
    pieChartDiv.onpointerdown = (e: Event) => {
        e.preventDefault();
    };
    pieChartDiv.appendChild(pieChartSVG);
    return pieChartDiv;
};
