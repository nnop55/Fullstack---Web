import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingValue: boolean = false;

  constructor() { }

  showLoading(): void {
    this.isLoadingValue = true;
  }

  hideLoading(): void {
    this.isLoadingValue = false;
  }

  isLoading(): boolean {
    return this.isLoadingValue;
  }
}
