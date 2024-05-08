import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storageSignal: WritableSignal<{ [key: string]: string }> = signal<{ [key: string]: string }>({});
  private immutableStorageSignal: Signal<{ [key: string]: string }> = computed(this.storageSignal);

  storage$ = toObservable(this.immutableStorageSignal);

  constructor() { }

  get(key: string) {
    const value = JSON.parse(localStorage.getItem(key)!)
    return value ?? null
  }

  set(key: string, value: any) {
    this.storageSignal.set({ [key]: value });
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
