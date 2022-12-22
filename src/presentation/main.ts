import { PieChartSvg } from "./graph/organisms";
import { formDiv, resultDiv } from "./graph/templates";
import { setHTMLAttributes } from "./lib/DOMHelper";
import { Task } from "./task/task";

const newContainer = (): HTMLDivElement =>
    setHTMLAttributes(document.createElement("div"))("")({
        display: "grid",
        "grid-template-columns": "1fr 1fr",
        gap: "10px",
    })({});

const init = () => {
    const container = newContainer();
    const visualizer = new PieChartSvg();
    container.appendChild(formDiv());
    container.appendChild(resultDiv(visualizer.svg()));
    document.body.appendChild(container);

    const form = document.getElementById("request-form") as HTMLFormElement;
    form.onsubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        visualizer.pushTask(
            Task.new({
                label: (form.elements[0] as HTMLInputElement).value,
                startTime: (form.elements[1] as HTMLInputElement).value,
                finishTime: (form.elements[2] as HTMLInputElement).value,
                color: (form.elements[3] as HTMLInputElement).value,
            })
        );
        container.removeChild(
            document.getElementById("result-div") as HTMLDivElement
        );
        container.appendChild(resultDiv(visualizer.svg()));
    };
};

window.onload = () => {
    init();
};
