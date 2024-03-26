import { Component, OnInit, inject } from '@angular/core';
import { TableColumn } from 'src/app/shared/utils/unions';
import { ParkingZoneColumnKey } from '../../utils/unions';
import { ParkingZonesService } from './parking-zones.service';

@Component({
  selector: 'app-parking-zones',
  templateUrl: './parking-zones.component.html',
  styleUrls: ['./parking-zones.component.scss']
})
export class ParkingZonesComponent implements OnInit {

  data: any[] = []
  service: ParkingZonesService = inject(ParkingZonesService)

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.getParkingZones(
      1,
      10,
      'id',
      'asc'
    ).subscribe({
      next: (response) => {
        if (response['data']) {
          this.data = response['data']
        }
      },
      error: () => { }
    })
  }

  getColumnSettings(): TableColumn[] {
    return [
      {
        key: ParkingZoneColumnKey.Id,
        label: 'id'
      },
      {
        key: ParkingZoneColumnKey.Name,
        label: 'name'
      },
      {
        key: ParkingZoneColumnKey.Price,
        label: 'price'
      },
      {
        key: ParkingZoneColumnKey.Address,
        label: 'address'
      },
      {
        key: ParkingZoneColumnKey.Available,
        label: 'available'
      },
      {
        key: ParkingZoneColumnKey.CarId,
        label: 'carid'
      }
    ]
  }

}
