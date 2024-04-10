import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DyComponentsService } from 'src/app/core/services/dy-components.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { regex } from 'src/app/shared/utils/regex';
import { Status } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ButtonComponent, TextInputComponent, ReactiveFormsModule, RouterLink]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  fb: FormBuilder = inject(FormBuilder)
  auth: AuthService = inject(AuthService)
  shared: SharedService = inject(SharedService)
  dyService: DyComponentsService = inject(DyComponentsService)
  vcRef: ViewContainerRef = inject(ViewContainerRef)

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(regex.password)]),
    })
  };

  openPasswordStepsModal() {
    this.dyService.openPasswordStepsModal(this.vcRef)
  }

  hasError(control: string, pattern: string | undefined = undefined) {
    return this.shared.hasError(this.form, control, pattern)
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      this.shared.markAllDirty(form)
      return
    }

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
      },
      error: (error) => {
        this.dyService.showMessage(error.error.error, this.vcRef, true)
      }
    })
  }

}
