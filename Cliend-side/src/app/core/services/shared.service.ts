import { HttpClient } from '@angular/common/http';
import { Injectable, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUserRoles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}auth/roles`)
  }

  showMessage(message: string, vcRef: ViewContainerRef) {
    vcRef.clear()
    const ref = vcRef.createComponent(SnackbarComponent)
    ref.setInput('message', message)

    setTimeout(() => {
      ref.destroy()
    }, 3000);
  }

  hasError(form: FormGroup, control: string, pattern?: string) {
    return form.get(control)?.dirty &&
      (pattern ? (form.get(control)?.errors?.['required'] ||
        form.get(control)?.errors?.[pattern]) :
        form.get(control)?.errors?.['required'])
  }

  markAllDirty(form: FormGroup) {
    for (const item of Object.keys(form.controls)) {
      form.get(item)?.markAsDirty()
    }
  }
}
