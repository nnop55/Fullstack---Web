import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { TextInputComponent } from '../../../../shared/components/text-input/text-input.component';
import { LoadingDirective } from '../../../../shared/directives/loading.directive';
import { RegisterForm, Status } from '../../../../shared/utils/unions';
import { FormHelper } from '../../../functions/form-helper';
import { regex } from '../../../../shared/utils/regex';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { DyComponentsService } from '../../../services/dy-components.service';

@Component({
  selector: 'app-up',
  standalone: true,
  imports: [ButtonComponent, TextInputComponent, ReactiveFormsModule, DropdownComponent, RouterLink, LoadingDirective],
  templateUrl: './up.component.html',
  styleUrl: './up.component.scss'
})
export class UpComponent implements OnInit {
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
