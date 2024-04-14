import { FormGroup } from "@angular/forms"

export class FormHelper {
    static hasError(form: FormGroup, control: string, pattern: string[] = []) {
        for (let error of pattern) {
            if (form.get(control)?.errors?.[error]) {
                return true
            }
        }

        return form.get(control)?.dirty && form.get(control)?.errors?.['required']
    }

    static markAllDirty(form: FormGroup) {
        for (const item of Object.keys(form.controls)) {
            form.get(item)?.markAsDirty()
        }
    }
}