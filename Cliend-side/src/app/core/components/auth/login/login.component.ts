import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { regExp } from 'src/app/shared/utils/regExp';
import { Status } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  fb: FormBuilder = inject(FormBuilder)
  auth: AuthService = inject(AuthService)
  shared: SharedService = inject(SharedService)
  vcRef: ViewContainerRef = inject(ViewContainerRef)

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(regExp.password)]),
    })
  };

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
    ).subscribe(response => {
      if (response.code == Status.error) {
        this.shared.showMessage(response.error, this.vcRef)
      } else {
        this.shared.showMessage(response.message, this.vcRef)
      }
    })
  }

}
