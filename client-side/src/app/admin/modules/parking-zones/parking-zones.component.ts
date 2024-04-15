import { Component, inject } from '@angular/core';
import { ParkingZoneColumnKey, TableColumn } from '../../utils/unions';
import { Status } from 'src/app/shared/utils/unions';
import { RoutingService } from '../../services/routing.service';
import { ParkingZonesService } from './parking-zones.service';
import { GenericTableComponent } from '../../components/generic-table/generic-table.component';

@Component({
  selector: 'app-parking-zones',
  standalone: true,
  imports: [GenericTableComponent],
  templateUrl: './parking-zones.component.html',
  styleUrls: ['./parking-zones.component.scss']
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
        isInput: true
      },
      {
        key: ParkingZoneColumnKey.Name,
        label: 'name',
        isInput: true
      },
      {
        key: ParkingZoneColumnKey.Price,
        label: 'price',
        isInput: true
      },
      {
        key: ParkingZoneColumnKey.Address,
        label: 'address',
        isDropdown: true
      },
      {
        key: ParkingZoneColumnKey.Available,
        label: 'available',
        isInput: true
      },
      {
        key: ParkingZoneColumnKey.CarId,
        label: 'carid',
        isInput: true
      }
    ]
  }
}
