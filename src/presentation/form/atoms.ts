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
        title: "hogehoge",
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
        width: `${SIZE}px`,
        height: `${SIZE}px`,
    })({
        type: "color",
        required: "true",
        name: name,
    });

export const submitButton = (): HTMLButtonElement =>
    setHTMLAttributes(document.createElement("button"))("TOUROKU")({
        "font-size": `${SIZE}px`,
        "background-color": "#a482a9",
        "border-radius": "8px",
    })({});

export const form = (): HTMLFormElement =>
    setHTMLAttributes(document.createElement("form"))("")({
        padding: "10px",
        display: "flex",
        "flex-direction": "column",
        "align-items": "flex-start",
        fontSize: `${SIZE}px`,
    })({
        id: "request-form",
    });
