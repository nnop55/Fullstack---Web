import { Component, inject } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent {

  ls: LocalStorageService = inject(LocalStorageService)

  get sidenavCurrentSize() {
    return this.ls.get('sidenavSize') ?? "20%";
  }
}
