import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  #storageSubject = signal<{ [key: string]: string }>({});
  storageSubject = computed(this.#storageSubject);

  constructor() { }

  get(key: string) {
    const value = JSON.parse(localStorage.getItem(key)!)
    return value ?? null
  }

  set(key: string, value: any) {
    this.#storageSubject.set({ [key]: value });
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
