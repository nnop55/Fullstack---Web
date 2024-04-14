import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: boolean[] = [false, false];

  constructor() { }

  showLoading(mode: number): void {
    this.loading[mode] = true;
  }

  hideLoading(mode: number): void {
    this.loading[mode] = false;
  }

  isLoading(): boolean {
    return this.loading[0];
  }

  isBtnLoading(): boolean {
    return this.loading[1];
  }
}
