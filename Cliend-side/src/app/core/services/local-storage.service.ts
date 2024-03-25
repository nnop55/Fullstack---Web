import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageSubject = new Subject<{ [key: string]: string }>();
  storage$ = this.storageSubject.asObservable();

  constructor() { }

  get(key: string) {
    const value = JSON.parse(localStorage.getItem(key)!)
    return value ?? null
  }

  set(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
    this.storageSubject.next({ [key]: value });
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

}
