import { Component, inject } from '@angular/core';
import { ParkingZoneColumnKey, SearchModes, ITableColumn, IDropdown } from '../../utils/unions';
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

  availableDropdown: IDropdown[] = [
    { label: "Free", value: 1 },
    { label: "Busy", value: 0 }
  ]

  ngOnInit(): void {
    super.loadTable(
      this.service,
      'getParkingZones'
    )
  }

  override getColumnSettings(): ITableColumn[] {
    return [
      {
        key: ParkingZoneColumnKey.Id,
        label: 'id',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: ParkingZoneColumnKey.Name,
        label: 'name',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: ParkingZoneColumnKey.Price,
        label: 'price',
        searchable: SearchModes.FromTo,
        getVal: (value) => { return value }
      },
      {
        key: ParkingZoneColumnKey.Address,
        label: 'address',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: ParkingZoneColumnKey.Available,
        label: 'available',
        searchable: SearchModes.Dropdown,
        dropdown: this.availableDropdown,
        getVal: (value) => { return this.transformValue(this.availableDropdown, value) }
      },
      {
        key: ParkingZoneColumnKey.CarId,
        label: 'car id',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      }
    ]
  }
}
