import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormHelper } from 'src/app/core/functions/form-helper';
import { AuthService } from 'src/app/core/services/auth.service';
import { DyComponentsService } from 'src/app/core/services/dy-components.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { LoadingDirective } from 'src/app/shared/directives/loading.directive';
import { regex } from 'src/app/shared/utils/regex';
import { LoginForm, Status } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ButtonComponent, TextInputComponent, ReactiveFormsModule, RouterLink, LoadingDirective]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  auth: AuthService = inject(AuthService)
  dyService: DyComponentsService = inject(DyComponentsService)
  vcRef: ViewContainerRef = inject(ViewContainerRef)

  isBtnLoading: boolean = false;

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup<LoginForm>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(regex.password)]),
    })
  };

  openPasswordStepsModal() {
    this.dyService.openPasswordStepsModal(this.vcRef)
  }

  hasError(control: string, pattern: string[] = []) {
    return FormHelper.hasError(this.form, control, pattern)
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      FormHelper.markAllDirty(form)
      return
    }

    this.isBtnLoading = true
    this.auth.login(
      {
        email: form.value['email'],
        password: form.value['password']
      }
    ).subscribe({
      next: (response) => {
        if (response.code == Status.success) {
          this.dyService.showMessage(response.message, this.vcRef)
        }
        this.isBtnLoading = false
      },
      error: (error) => {
        this.dyService.showMessage(error.error.error, this.vcRef, true)
        this.isBtnLoading = false
      }
    })
  }

}
