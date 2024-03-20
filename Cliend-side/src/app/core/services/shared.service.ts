import { HttpClient } from '@angular/common/http';
import { Injectable, ViewContainerRef } from '@angular/core';
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
}
