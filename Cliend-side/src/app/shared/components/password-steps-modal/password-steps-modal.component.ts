import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Steps } from '../../utils/unions';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/core/services/shared.service';
import { regExp } from '../../utils/regExp';

@Component({
  selector: 'app-password-steps-modal',
  templateUrl: './password-steps-modal.component.html',
  styleUrls: ['./password-steps-modal.component.scss']
})
export class PasswordStepsModalComponent implements OnInit {

  @Output() closeClicked: EventEmitter<void> = new EventEmitter<void>();

  shared: SharedService = inject(SharedService)
  fb: FormBuilder = inject(FormBuilder)

  Steps = Steps
  step = 1

  forms: any[] = [FormGroup, FormGroup, FormGroup]

  ngOnInit(): void {
    this.initForms();
  }

  onCloseClick(): void {
    this.closeClicked.emit();
  }

  hasError(control: string, pattern: string | undefined = undefined) {
    return this.shared.hasError(this.forms[this.step - 1], control, pattern)
  }

  initForms() {
    const index = this.step - 1;
    switch (this.step) {
      case Steps.email:
        this.forms[index] = this.fb.group({
          email: new FormControl(null, [Validators.required, Validators.email])
        })
        break;
      case Steps.code:
        this.forms[index] = this.fb.group({
          code: new FormControl(null, [Validators.required])
        })
        break;
      case Steps.recover:
        this.forms[index] = this.fb.group({
          password: new FormControl(null, [Validators.required, Validators.pattern(regExp.password)]),
          confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(regExp.password)])
        })
        break;
    }
  }

  sendCodeToEmail() { }

  verifyCode() { }

  recoverPassword() { }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      this.shared.markAllDirty(form)
      return
    }

    switch (this.step) {
      case Steps.email:
        this.sendCodeToEmail()
        break;
      case Steps.code:
        this.verifyCode()
        break;
      case Steps.recover:
        this.recoverPassword()
        break;
    }
  }

}
