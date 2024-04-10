import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(error: HttpErrorResponse): void {
    if (error.error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error.error);
    }
  }
}
