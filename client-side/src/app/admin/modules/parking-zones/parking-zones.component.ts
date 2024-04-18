import { Component, inject } from '@angular/core';
import { ParkingZoneColumnKey, SearchModes, TableColumn } from '../../utils/unions';
import { GenericTableComponent } from '../../components/generic-table/generic-table.component';
import { ParkingZonesService } from './parking-zones.service';
import { ModuleBase } from '../../utils/module-base';

@Component({
  selector: 'app-parking-zones',
  standalone: true,
  imports: [GenericTableComponent],
  templateUrl: './parking-zones.component.html',
  styleUrl: './parking-zones.component.scss'
})
export class ParkingZonesComponent extends ModuleBase {

  service: ParkingZonesService = inject(ParkingZonesService)

  ngOnInit(): void {
    super.loadTable(
      this.service,
      'getParkingZones'
    )
  }

  override getColumnSettings(): TableColumn[] {
    return [
      {
        key: ParkingZoneColumnKey.Id,
        label: 'id',
        searchable: SearchModes.Input
      },
      {
        key: ParkingZoneColumnKey.Name,
        label: 'name',
        searchable: SearchModes.Input
      },
      {
        key: ParkingZoneColumnKey.Price,
        label: 'price',
        searchable: SearchModes.FromTo
      },
      {
        key: ParkingZoneColumnKey.Address,
        label: 'address',
        searchable: SearchModes.Input
      },
      {
        key: ParkingZoneColumnKey.Available,
        label: 'available',
        searchable: SearchModes.Input
      },
      {
        key: ParkingZoneColumnKey.CarId,
        label: 'car id',
        searchable: SearchModes.Input
      }
    ]
  }
}
