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

  ngOnInit(): void {
    this.routingService.getQueryParams().subscribe(params => {
      if (params) this.queryParams = params
      this.getData()
    })
  }

  getData() {
    this.service.getParkingZones(
      this.queryParams
    ).subscribe({
      next: (response) => {
        if (response.code == Status.success) {
          this.data = response['data']['paginatedData']
          this.paginatorData = response['data']['paginator']
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
