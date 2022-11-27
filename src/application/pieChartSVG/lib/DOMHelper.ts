
interface StyelAttributes {
    [key: string]: string;
}

interface Attributes {
    [key: string]: string;
}

export const setAttributes =
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

export const appendChilds =
    <T extends HTMLElement>(elem: T) =>
    (...children: HTMLElement[]): T => {
        children.forEach((child) => elem.appendChild(child));
        return elem;
    };