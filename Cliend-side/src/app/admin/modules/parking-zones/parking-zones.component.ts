import { Component } from '@angular/core';
import { TableColumn } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-parking-zones',
  templateUrl: './parking-zones.component.html',
  styleUrls: ['./parking-zones.component.scss']
})
export class ParkingZonesComponent {

  getTableColumns(): TableColumn[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'price', label: 'Price' },
      { key: 'address', label: 'Address' },
      { key: 'available', label: 'Available' },
      { key: 'car_id', label: 'Parked by' },
    ];
  }

}
