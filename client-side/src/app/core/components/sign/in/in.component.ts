import { Component, ViewContainerRef, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TextInputComponent } from '../../../../shared/components/text-input/text-input.component';
import { LoadingDirective } from '../../../../shared/directives/loading.directive';
import { LoginForm, Status } from '../../../../shared/utils/unions';
import { regex } from '../../../../shared/utils/regex';
import { AuthService } from '../../../services/auth.service';
import { DyComponentsService } from '../../../services/dy-components.service';
import { ValidationDirective } from '../../../../shared/directives/validation.directive';

@Component({
  selector: 'app-in',
  standalone: true,
  imports: [ButtonComponent, TextInputComponent, ReactiveFormsModule, RouterLink, LoadingDirective, ValidationDirective],
  templateUrl: './in.component.html',
  styleUrl: './in.component.scss'
})
export class InComponent {
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

  submitForm(form: FormGroup) {
    if (form.invalid) {
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
