export type Attributes = {
    [key: string]: string;
};

export const setAttributes =
    <T extends SVGElement>(elem: T) =>
    (attributes: Attributes): T => {
        Object.entries(attributes).forEach(([key, value]) =>
            elem.setAttribute(key, value)
        );
        return elem;
    };
