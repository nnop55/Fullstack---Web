import { Component, inject } from '@angular/core';
import { ParkingZoneColumnKey, SearchModes, ITableColumn, IDropdown } from '../../utils/unions';
import { TableComponent } from '../../components/table/table.component';
import { ParkingZonesService } from './parking-zones.service';
import { ModuleBase } from '../../utils/module-base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-zones',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './parking-zones.component.html',
  styleUrl: './parking-zones.component.scss'
})
export class ParkingZonesComponent extends ModuleBase {

  private service: ParkingZonesService = inject(ParkingZonesService)
  private router: Router = inject(Router)

  availableDropdown: IDropdown[] = [
    { label: "Free", value: 1 },
    { label: "Busy", value: 0 }
  ]

  ngOnInit(): void {
    this.load()
  }

  load() {
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
        getVal: (value) => { return value },
      },
      {
        key: ParkingZoneColumnKey.Name,
        label: 'name',
        searchable: SearchModes.Input,
        getVal: (value) => { return value },
      },
      {
        key: ParkingZoneColumnKey.Price,
        label: 'price',
        searchable: SearchModes.FromTo,
        getVal: (value) => { return value },
      },
      {
        key: ParkingZoneColumnKey.Address,
        label: 'address',
        searchable: SearchModes.Input,
        getVal: (value) => { return value },
      },
      {
        key: ParkingZoneColumnKey.Available,
        label: 'available',
        searchable: SearchModes.Dropdown,
        dropdown: this.availableDropdown,
        getVal: (value) => { return this.transformValue(this.availableDropdown, value) },
      },
      {
        key: ParkingZoneColumnKey.CarId,
        label: 'car id',
        searchable: SearchModes.Input,
        getVal: (value) => { return value },
      }
    ]
  }

  editZone(id: number) {
    this.router.navigate([`/admin/parking-zones/edit/${id}`])
  }
}
