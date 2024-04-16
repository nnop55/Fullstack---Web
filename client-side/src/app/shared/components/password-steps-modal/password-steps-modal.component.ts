import { Component, ViewContainerRef, inject, output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormHelper } from '../../../core/functions/form-helper';
import { regex } from '../../utils/regex';
import { Steps, EmailForm, CodeForm, PasswordForm, Status } from '../../utils/unions';
import { ButtonComponent } from '../button/button.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { StepperComponent } from '../stepper/stepper.component';
import { AuthService } from '../../../core/services/auth.service';
import { DyComponentsService } from '../../../core/services/dy-components.service';

@Component({
  selector: 'app-password-steps-modal',
  standalone: true,
  imports: [ButtonComponent, TextInputComponent, ReactiveFormsModule, StepperComponent],
  templateUrl: './password-steps-modal.component.html',
  styleUrl: './password-steps-modal.component.scss'
})
export class PasswordStepsModalComponent {
  closeClicked = output<void>()

  auth: AuthService = inject(AuthService)
  dyService: DyComponentsService = inject(DyComponentsService)
  vcRef: ViewContainerRef = inject(ViewContainerRef)

  Steps = Steps;
  step = 1;
  restartStepper: boolean = false

  emailForm!: FormGroup;
  codeForm!: FormGroup;
  passwordForm!: FormGroup;

  forms: { fn: () => void, form: FormGroup }[] = [];

  stepperOptions = [
    { level: 1, title: "1", clickable: true },
    { level: 2, title: "2", clickable: false },
    { level: 3, title: "3", clickable: false }
  ]

  ngOnInit(): void {
    this.initForms();
  }

  onCloseClick(): void {
    this.closeClicked.emit();
  }

  hasError(control: string, pattern: string[] = []) {
    return FormHelper.hasError(this.formItem['form'], control, pattern)
  }

  initForms() {
    this.emailForm = new FormGroup<EmailForm>({
      email: new FormControl(null, [Validators.required, Validators.email])
    });

    this.codeForm = new FormGroup<CodeForm>({
      code: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    });

    this.passwordForm = new FormGroup<PasswordForm>({
      password: new FormControl(null, [Validators.required, Validators.pattern(regex.password)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(regex.password)])
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

  sendCodeToEmail() {
    const form = this.formItem['form'];
    this.auth.sendCodeToEmail(
      form.controls['email']?.value
    ).subscribe({
      next: (response) => {
        if (response.code == Status.success) {
          this.dyService.showMessage(response.message, this.vcRef)
          this.step++;
        }
      },
      error: (error) => {
        this.dyService.showMessage(error?.error?.error, this.vcRef, true)
      }
    })
  }

  verifyCode() {
    const form = this.formItem['form'];
    this.auth.verifyCode(
      form.controls['code']?.value
    ).subscribe({
      next: (response) => {
        if (response.code == Status.success) {
          this.dyService.showMessage(response.message, this.vcRef)
          this.step++;
        }
      },
      error: (error) => {
        this.dyService.showMessage(error.error.error, this.vcRef, true)
        if (error.error.code == Status.expire) {
          this.step--;
          this.resetForm(1);

          this.restartStepper = true
          setTimeout(() => {
            this.restartStepper = false
          }, 1000)
        }
      }
    })
  }

  recoverPassword() {
    const form = this.formItem['form'];
    if (form.controls['password'].value !== form.controls['confirmPassword'].value) {
      this.dyService.showMessage(`Password doesn't match!`, this.vcRef, true)
      return
    }

    this.auth.recoverPassword(
      form.controls['password']?.value
    ).subscribe({
      next: (response) => {
        if (response.code == Status.success) {
          this.dyService.showMessage(response.message, this.vcRef)
          this.onCloseClick()
        }
      },
      error: (error) => {
        this.dyService.showMessage(error.error.error, this.vcRef, true)
      }
    })
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      FormHelper.markAllDirty(form)
      return
    }

    this.formItem.fn()
  }

  get formItem() {
    return this.forms[this.step - 1]
  }

  resetForm(index: number) {
    this.forms[index].form.reset()
  }
}
