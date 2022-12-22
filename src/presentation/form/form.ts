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
        appendChilds(label("Title"))(labelInput("task-name")),
        appendChilds(label("Start"))(timeInput("start-time")),
        appendChilds(label("Finish"))(timeInput("finish-time")),
        appendChilds(label("Color"))(colorInput("color")),
        submitButton()
    );
