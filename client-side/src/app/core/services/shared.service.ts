import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUserRoles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}user/roles`)
  }

  hasError(form: FormGroup, control: string, pattern: string[] = []) {
    for (let error of pattern) {
      if (form.get(control)?.errors?.[error]) {
        return true
      }
    }

    return form.get(control)?.dirty && form.get(control)?.errors?.['required']
  }

  markAllDirty(form: FormGroup) {
    for (const item of Object.keys(form.controls)) {
      form.get(item)?.markAsDirty()
    }
  }
}
