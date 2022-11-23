import { Form } from "../../domain/form/form";

export class NewFormUseCase {
    getForm() {
        const form = new Form();
        return form.getForm();
    }
}
