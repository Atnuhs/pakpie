import { AddNewPieUseCase } from "./pieChartSvg/UseCase/addNewPieUseCase/addNewPieUseCase";
import { NewFormUseCase } from "./pieChartSvg/UseCase/newFormUseCase/newFormUseCase";
import { NewPieChartSvgUseCase } from "./pieChartSvg/UseCase/newPieChartSvgUseCase/newPieChartSvgUseCase";

const registPie = (formElem: HTMLFormElement) => {
    const request = {
        title: formElem.elements["task-name"].value,
        fontFamily: "sans-serif",
        fontColor: "#222222",
        fontSize: 22,
        startTime: formElem.elements["start-time"].value,
        finishTime: formElem.elements["finish-time"].value,
        pieColor: formElem.elements["color"].value,
    };
    const addNewPieUseCase = new AddNewPieUseCase();
    addNewPieUseCase.addNewPie(request);
};

const updateResultDiv = (): void => {
    const newPieChartSvgUseCase = new NewPieChartSvgUseCase();
    const resultDiv = document.getElementById("result-div");
    if (resultDiv == undefined) return;

    while (resultDiv.firstChild) {
        resultDiv.removeChild(resultDiv.firstChild);
    }
    resultDiv.appendChild(newPieChartSvgUseCase.getPieChartSvg().svg);
};

const resultDiv = (): HTMLDivElement => {
    const resultDiv = document.createElement("div");
    resultDiv.style.border = "solid 2px #eee";
    resultDiv.style.boxShadow = "4px 4px 10px -2px";
    resultDiv.id = "result-div";
    resultDiv.onpointerdown = (e: Event) => {
        e.preventDefault();
    };
    return resultDiv;
};

const requestForm = (): HTMLFormElement => {
    const newFormUseCase = new NewFormUseCase();
    return newFormUseCase.getForm();
};

const newContainer = (): HTMLDivElement => {
    const container = document.createElement("div");

    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr 1fr";
    container.style.gap = "10px";
    return container;
};

const init = () => {
    const container = newContainer();
    container.appendChild(requestForm());
    container.appendChild(resultDiv());
    document.body.appendChild(container);

    updateResultDiv();

    document
        .getElementById("request-form")
        ?.addEventListener("submit", (e: SubmitEvent): void => {
            e.preventDefault();
            const formElem = e.target as HTMLFormElement;
            registPie(formElem);
            updateResultDiv();
        });
};

window.onload = () => {
    init();
};
