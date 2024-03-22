import { Component, inject } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { TableColumn } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  ls: LocalStorageService = inject(LocalStorageService)

  automobiles = [{ id: 1, vinCode: 'ABC123' }, { id: 2, vinCode: 'DEF456' }];

  getTableColumns(): TableColumn[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'vinCode', label: 'VIN Code' }
    ];
  }


  get sidenavCurrentSize() {
    return this.ls.get('sidenavSize') ?? "20%";
  }
}
