import { newPieChartDiv } from "../pieChartSvg/presentation/pieChartSvg";
import { newRegistrationTaskForm } from "../pieChartSvg/presentation/registrationTask";
const init = () => {
    const container = document.createElement("div");
    const visualizedDiv = newPieChartDiv();
    const registForm = newRegistrationTaskForm();

    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr 1fr";
    container.style.gap = "10px";

    container.appendChild(registForm);
    container.appendChild(visualizedDiv);
    document.body.appendChild(container);
};

window.onload = () => {
    init();
};
