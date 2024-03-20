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

  Steps = Steps;
  step = 1;

  emailForm!: FormGroup;
  codeForm!: FormGroup;
  passwordForm!: FormGroup;

  forms: { fn: Function, form: FormGroup }[] = [];

  stepperOptions = [
    { level: 1, title: "Enter your email", clickable: true },
    { level: 2, title: "Check code at email", clickable: false },
    { level: 3, title: "Enter new password", clickable: false }
  ]

  ngOnInit(): void {
    this.initForms();
  }

  onCloseClick(): void {
    this.closeClicked.emit();
  }

  hasError(control: string, pattern: string | undefined = undefined) {
    return this.shared.hasError(this.forms[this.index]['form'], control, pattern)
  }

  initForms() {
    this.emailForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email])
    });

    this.codeForm = this.fb.group({
      code: new FormControl(null, [Validators.required])
    });

    this.passwordForm = this.fb.group({
      password: new FormControl(null, [Validators.required, Validators.pattern(regExp.password)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(regExp.password)])
    });

    this.forms.push(
      {
        fn: () => this.sendCodeToEmail(),
        form: this.emailForm
      },
      {
        fn: () => this.verifyCode(),
        form: this.codeForm
      },
      {
        fn: () => this.recoverPassword(),
        form: this.passwordForm
      });
  }

  sendCodeToEmail() { }

  verifyCode() { }

  recoverPassword() { }

  submitForm(form: FormGroup) {
    // if (form.invalid) {
    //   this.shared.markAllDirty(form)
    //   return
    // }

    this.forms[this.index]['fn']
    this.step++
  }

  get index() {
    return this.step - 1
  }

}
