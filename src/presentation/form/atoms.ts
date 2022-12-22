import { setHTMLAttributes } from "../lib/DOMHelper";

export const SIZE = 25;

export const label = (title: string): HTMLLabelElement =>
    setHTMLAttributes(document.createElement("label"))(title)({
        "font-size": `${SIZE}px`,
    })({});

export const timeInput = (name: string): HTMLInputElement =>
    setHTMLAttributes(document.createElement("input"))("")({
        "font-size": `${SIZE}px`,
        width: `${SIZE * 3}px`,
    })({
        placeholder: "XX:XX",
        pattern: "^[0-9]{1,2}:[0-9]{2}$",
        required: "true",
        name: name,
    });

export const labelInput = (name: string): HTMLInputElement =>
    setHTMLAttributes(document.createElement("input"))("")({
        width: `${SIZE * 8}px`,
        "font-size": `${SIZE}px`,
    })({
        type: "text",
        required: "true",
        name: name,
    });

export const colorInput = (name: string): HTMLInputElement =>
    setHTMLAttributes(document.createElement("input"))("")({
        width: `${SIZE * 2}px`,
        height: `${SIZE}px`,
    })({
        type: "color",
        required: "true",
        name: name,
        value: "#f97a2e"
    });

export const submitButton = (): HTMLButtonElement => {
    const b = setHTMLAttributes(document.createElement("button"))("Add")({
        "font-size": `${SIZE}px`,
        "background-color": "#3eb645",
        "border-radius": "8px",
    })({});
    b.onpointerover = () => (b.style.opacity = "80%");
    b.onpointerleave = () => (b.style.opacity = "100%");
    b.onpointerdown = () => (b.style.opacity = "60%");
    b.onpointerup = () => (b.style.opacity = "80%");
    return b;
};

export const form = (): HTMLFormElement =>
    setHTMLAttributes(document.createElement("form"))("")({
        display: "flex",
        "flex-direction": "column",
        "align-items": "flex-start",
        fontSize: `${SIZE}px`,
        // width: "fit-content",
    })({
        id: "request-form",
    });
