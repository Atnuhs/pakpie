import { setHTMLAttributes, appendChilds } from "../lib/DOMHelper";

const size = 25;

const newLabel = (title: string): HTMLLabelElement =>
    setHTMLAttributes(document.createElement("label"))(title)({
        "font-size": `${size}px`,
    })({});

const newTimeInputElement = (name: string): HTMLInputElement =>
    setHTMLAttributes(document.createElement("input"))("")({
        "font-size": `${size * 0.9}px`,
        width: `${size * 3}px`,
    })({
        placeholder: "XX:XX",
        pattern: "^[0-9]{1,2}:[0-9]{2}$",
        required: "true",
        title: "hogehoge",
        name: name,
    });

const newTaskNameInputElement = (name: string): HTMLInputElement =>
    setHTMLAttributes(document.createElement("input"))("")({
        width: `${size * 8}px`,
        "font-size": `${size * 0.9}px`,
    })({
        type: "text",
        required: "true",
        name: name,
    });

const newColorInputElement = (name: string): HTMLInputElement =>
    setHTMLAttributes(document.createElement("input"))("")({
        width: `${size * 2}px`,
        height: `${size * 1.2}px`,
    })({
        type: "color",
        required: "true",
        name: name,
    });

const newLegend = () =>
    setHTMLAttributes(document.createElement("legend"))(
        "New Task Registration"
    )({
        "font-size": `${size * 1.2}px`,
    })({});

const newSubmitButton = (): HTMLButtonElement =>
    setHTMLAttributes(document.createElement("button"))("TOUROKU")({
        "font-size": `${size}px`,
        "background-color": "#a482a9",
        "border-radius": "8px",
    })({});

const newForm = (): HTMLFormElement =>
    setHTMLAttributes(document.createElement("form"))("")({
        border: "solid 2px #a3b8da",
        "box-shadow": "4px 4px 10px -2px",
        padding: "10px",
        display: "flex",
        "flex-direction": "column",
        "align-items": "flex-start",
        fontSize: `${size}px`,
    })({
        id: "request-form",
    });

export const constructForm = () =>
    appendChilds(newForm())(
        newLegend(),
        appendChilds(newLabel("Task Name:"))(
            newTaskNameInputElement("task-name")
        ),
        appendChilds(newLabel("Start Time:"))(
            newTimeInputElement("start-time")
        ),
        appendChilds(newLabel("Finish Time:"))(
            newTimeInputElement("finish-time")
        ),
        appendChilds(newLabel("Color:"))(newColorInputElement("color")),
        newSubmitButton()
    );
