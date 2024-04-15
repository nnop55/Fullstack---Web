import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormHelper } from 'src/app/core/functions/form-helper';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { DyComponentsService } from 'src/app/core/services/dy-components.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { LoadingDirective } from 'src/app/shared/directives/loading.directive';
import { regex } from 'src/app/shared/utils/regex';
import { RegisterForm, Status } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ButtonComponent, TextInputComponent, ReactiveFormsModule, DropdownComponent, RouterLink, LoadingDirective]
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  api: ApiService = inject(ApiService)
  dyService: DyComponentsService = inject(DyComponentsService)
  auth: AuthService = inject(AuthService)
  vcRef: ViewContainerRef = inject(ViewContainerRef)

  options = [];
  isLoading: boolean = false;
  isBtnLoading: boolean = false;

  ngOnInit(): void {
    this.initForm()
    this.getUserRoles()
  }

  initForm() {
    this.form = new FormGroup<RegisterForm>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      fullName: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(regex.password)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(regex.password)])
    })
  };

  getUserRoles() {
    this.isLoading = true
    this.api.getUserRoles().subscribe({
      next: (response) => {
        if (response.code == Status.success) {
          this.options = response['data']
        }
        this.isLoading = false
      },
      error: () => this.isLoading = false
    })
  }

  hasError(control: string, pattern: string[] = []) {
    return FormHelper.hasError(this.form, control, pattern)
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      FormHelper.markAllDirty(form)
      return
    }

    if (form.controls['password'].value !== form.controls['confirmPassword'].value) {
      this.dyService.showMessage(`Password doesn't match!`, this.vcRef, true)
      return
    }

    this.isBtnLoading = true
    this.auth.register(
      {
        email: form.value['email'],
        fullName: form.value['fullName'],
        role: form.value['role'],
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
