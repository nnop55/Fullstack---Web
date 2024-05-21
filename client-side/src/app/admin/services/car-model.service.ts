import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CarModelRes, IApi } from '../../shared/utils/unions';
import { Observable, map } from 'rxjs';
import { IDropdown } from '../utils/unions';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  private baseUrl: string = environment.baseUrl;

  private dropdownSig: WritableSignal<IDropdown[]> = signal<IDropdown[]>([]);
  getDropdownData: Signal<IDropdown[]> = computed(this.dropdownSig);

  modelsByMark: any = new Object();

  private http: HttpClient = inject(HttpClient)

  getCarModels(): Observable<IApi<CarModelRes>> {
    return this.http.get<IApi<CarModelRes>>(`${this.baseUrl}car/models/all`)
      .pipe(map(res => {
        this.modelsByMark = res.data.models
        return res
      }));
  }

  fillModelDropdown(mark: string) {
    let data: IDropdown[] = []

    if (Object.keys(this.modelsByMark).length > 0) {
      for (const item of this.modelsByMark[mark]) {
        data.push({ label: item, value: item })
      }

      this.dropdownSig.set(data)
    }

  }

  clearModelDropdown() {
    this.dropdownSig.set([])
  }
}
