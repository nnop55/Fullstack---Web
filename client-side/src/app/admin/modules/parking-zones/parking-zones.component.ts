import { Component, inject } from '@angular/core';
import { ParkingZoneColumnKey, SearchModes, TableColumn } from '../../utils/unions';
import { Status } from '../../../shared/utils/unions';
import { GenericTableComponent } from '../../components/generic-table/generic-table.component';
import { ParkingZonesService } from './parking-zones.service';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-parking-zones',
  standalone: true,
  imports: [GenericTableComponent],
  templateUrl: './parking-zones.component.html',
  styleUrl: './parking-zones.component.scss'
})
export class ParkingZonesComponent {
  data: any[] = []
  paginatorData: any = new Object();

  service: ParkingZonesService = inject(ParkingZonesService)
  routingService: RoutingService = inject(RoutingService)
  queryParams: any;
  isLoading: boolean = false

  ngOnInit(): void {
    this.routingService.getQueryParams().subscribe(params => {
      if (params) this.queryParams = params
      this.getData()
    })
  }

  getData() {
    this.isLoading = true
    this.service.getParkingZones(
      this.queryParams
    ).subscribe({
      next: (response) => {
        if (response.code == Status.success) {
          this.data = response['data']['paginatedData']
          this.paginatorData = response['data']['paginator']
        }
        this.isLoading = false
      },
      error: () => this.isLoading = false
    })
  }

  getColumnSettings(): TableColumn[] {
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
        searchable: SearchModes.Input
      },
      {
        key: ParkingZoneColumnKey.Address,
        label: 'address',
        searchable: SearchModes.Dropdown
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
