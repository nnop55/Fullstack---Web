import { Component, inject } from '@angular/core';
import { ParkingHistoryColumnKey, SearchModes, ITableColumn, IDropdown } from '../../utils/unions';
import { ParkingHistoryService } from './parking-history.service';
import { GenericTableComponent } from '../../components/generic-table/generic-table.component';
import { ModuleBase } from '../../utils/module-base';
import { Status } from '../../../shared/utils/unions';
import { CarModelService } from '../../services/car-model.service';

@Component({
  selector: 'app-parking-history',
  standalone: true,
  imports: [GenericTableComponent],
  templateUrl: './parking-history.component.html',
  styleUrl: './parking-history.component.scss'
})
export class ParkingHistoryComponent extends ModuleBase {

  service: ParkingHistoryService = inject(ParkingHistoryService)

  availableDropdown: IDropdown[] = [
    { label: "Free", value: 1 },
    { label: "Busy", value: 0 }
  ]

  markDropdown: IDropdown[] = []
  modelDropdown: IDropdown[] = []
  typeDropdown: IDropdown[] = []

  ngOnInit(): void {
    this.getCarModels()

    super.loadTable(
      this.service,
      'getParkingHistory'
    )

    this.carModelService.dropdown$.subscribe(data => {
      this.modelDropdown = data
    })
  }

  getCarModels() {
    this.isLoading = true
    this.carModelService.getCarModels().subscribe({
      next: (response) => {
        if (response.code === Status.success) {
          this.markDropdown = response.data.marks
          this.typeDropdown = response.data.types
        }
        this.isLoading = false
      },
      error: (error) => this.isLoading = false
    })
  }

  override getColumnSettings(): ITableColumn[] {
    return [
      {
        key: ParkingHistoryColumnKey.Id,
        label: 'id',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: ParkingHistoryColumnKey.UserId,
        label: 'user id',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: ParkingHistoryColumnKey.CarId,
        label: 'car id',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: ParkingHistoryColumnKey.Mark,
        label: 'mark',
        searchable: SearchModes.Dropdown,
        dropdown: this.markDropdown,
        getVal: (value) => { return value }
      },
      {
        key: ParkingHistoryColumnKey.Model,
        label: 'model',
        searchable: SearchModes.Dropdown,
        dropdown: this.modelDropdown,
        getVal: (value) => { return value }
      },
      {
        key: ParkingHistoryColumnKey.Type,
        label: 'type',
        searchable: SearchModes.Dropdown,
        dropdown: this.typeDropdown,
        getVal: (value) => { return value }
      },
      {
        key: ParkingHistoryColumnKey.LicenseNumber,
        label: 'license number',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: ParkingHistoryColumnKey.ZoneId,
        label: 'zone id',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: ParkingHistoryColumnKey.Name,
        label: 'name',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: ParkingHistoryColumnKey.Address,
        label: 'address',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: ParkingHistoryColumnKey.Price,
        label: 'price',
        searchable: SearchModes.FromTo,
        getVal: (value) => { return value }
      },
      {
        key: ParkingHistoryColumnKey.Available,
        label: 'available',
        searchable: SearchModes.Dropdown,
        dropdown: this.availableDropdown,
        getVal: (value) => { return this.transformValue(this.availableDropdown, value) }
      },
    ]
  }
}
