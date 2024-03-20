import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { regExp } from 'src/app/shared/utils/regExp';
import { Status } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  fb: FormBuilder = inject(FormBuilder)
  shared: SharedService = inject(SharedService)
  auth: AuthService = inject(AuthService)
  vcRef: ViewContainerRef = inject(ViewContainerRef)

  options = [];

  ngOnInit(): void {
    this.initForm()
    this.getUserRoles()
  }

  initForm() {
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      fullName: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(regExp.password)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(regExp.password)])
    })
  };

  getUserRoles() {
    this.shared.getUserRoles().subscribe({
      next: (response) => {
        if (response.code == Status.success) {
          this.options = response['data']
        }
      },
      error: () => { }
    })
  }

  hasError(control: string, pattern: string | undefined = undefined) {
    return this.shared.hasError(this.form, control, pattern)
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      this.shared.markAllDirty(form)
      return
    }

    if (form.controls['password'].value !== form.controls['confirmPassword'].value) {
      this.shared.showMessage(`Password doesn't match!`, this.vcRef)
      return
    }

    this.auth.register(
      {
        email: form.value['email'],
        fullName: form.value['fullName'],
        role: form.value['role'],
        password: form.value['password']
      }
    ).subscribe(response => {
      if (response.code == Status.error) {
        this.shared.showMessage(response.error, this.vcRef)
      } else {
        this.shared.showMessage(response.message, this.vcRef)
      }
    })
  }

}
