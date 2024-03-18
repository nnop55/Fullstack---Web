import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { regExp } from 'src/app/shared/functions/regExp';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  fb: FormBuilder = inject(FormBuilder)

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      fullName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(regExp.password)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(regExp.password)])
    })
  };

  submitForm(form: FormGroup) {
    console.log(form.value)
    if (this.form.invalid) {
      return
    }
  }

}
