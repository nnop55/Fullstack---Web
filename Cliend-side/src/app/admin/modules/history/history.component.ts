import { Component } from '@angular/core';
import { TableColumn } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  automobiles = [{ id: 1, vinCode: 'ABC123' }, { id: 2, vinCode: 'DEF456' }];

  getTableColumns(): TableColumn[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'vinCode', label: 'VIN Code' }
    ];
  }

}
