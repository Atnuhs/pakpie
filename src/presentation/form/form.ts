import { appendChilds } from "../lib/DOMHelper";
import {
    colorInput,
    form,
    label,
    submitButton,
    labelInput,
    timeInput,
} from "./atoms";

export const genForm = () =>
    appendChilds(form())(
        appendChilds(label("Task Name:"))(labelInput("task-name")),
        appendChilds(label("Start Time:"))(timeInput("start-time")),
        appendChilds(label("Finish Time:"))(timeInput("finish-time")),
        appendChilds(label("Color:"))(colorInput("color")),
        submitButton()
    );
