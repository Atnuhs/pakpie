const size = 25;

interface StyelAttributes {
    [key: string]: string;
}

interface Attributes {
    [key: string]: string;
}

const setAttributes =
    <T extends HTMLElement>(elem: T) =>
    (innerText: string) =>
    (styles: StyelAttributes) =>
    (attributes: Attributes): T => {
        elem.innerText = innerText;
        Object.entries(styles).forEach(([key, value]) => {
            const old = elem.getAttribute("style");
            elem.setAttribute(
                "style",
                (old == undefined ? "" : `${old}; `) + `${key}: ${value}`
            );
        });
        Object.entries(attributes).forEach(([key, value]) =>
            elem.setAttribute(key, value)
        );
        return elem;
    };

const appendChilds =
    <T extends HTMLElement>(elem: T) =>
    (...children: HTMLElement[]): T => {
        children.forEach((child) => elem.appendChild(child));
        return elem;
    };

const newLabel = (title: string): HTMLLabelElement => {
    return setAttributes(document.createElement("label"))(title)({
        "font-size": `${size}px`,
    })({});
};

const newTimeInputElement = (name: string): HTMLInputElement => {
    return setAttributes(document.createElement("input"))("")({
        "font-size": `${size * 0.9}px`,
        width: `${size * 3}px`,
    })({
        placeholder: "XX:XX",
        pattern: "^[0-9]{1,2}:[0-9]{2}$",
        required: "true",
        title: "hogehoge",
        name: name,
    });
};

const newTaskNameInputElement = (name: string): HTMLInputElement => {
    return setAttributes(document.createElement("input"))("")({
        width: `${size * 8}px`,
        "font-size": `${size * 0.9}px`,
    })({
        type: "text",
        required: "true",
        name: name,
    });
};

const newColorInputElement = (name: string): HTMLInputElement => {
    return setAttributes(document.createElement("input"))("")({
        width: `${size * 2}px`,
        height: `${size * 1.2}px`,
    })({
        type: "color",
        required: "true",
        name: name,
    });
};

const newLegend = () => {
    return setAttributes(document.createElement("legend"))(
        "New Task Registration"
    )({
        "font-size": `${size * 1.2}px`,
    })({});
};

const newSubmitButton = (): HTMLButtonElement => {
    return setAttributes(document.createElement("button"))("TOUROKU")({
        "font-size": `${size}px`,
        "background-color": "#a482a9",
        "border-radius": "8px",
    })({});
};

const newForm = (): HTMLFormElement => {
    return setAttributes(document.createElement("form"))("")({
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
};

export class Form {
    private form: HTMLFormElement;
    constructor() {
        this.form = appendChilds(newForm())(
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
    }
    public getForm() {
        return this.form;
    }
}
