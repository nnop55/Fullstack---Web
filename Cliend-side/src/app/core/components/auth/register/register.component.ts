import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/core/services/shared.service';
import { regExp } from 'src/app/shared/functions/regExp';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  fb: FormBuilder = inject(FormBuilder)
  shared: SharedService = inject(SharedService)

  options = [
    { value: 0, label: 'User' },
    { value: 1, label: 'Admin' }
  ];

  ngOnInit(): void {
    this.initForm()
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
      next: () => { },
      error: () => { }
    })
  }

  submitForm(form: FormGroup) {
    console.log(form.value)
    if (this.form.invalid) {
      return
    }
  }

}
