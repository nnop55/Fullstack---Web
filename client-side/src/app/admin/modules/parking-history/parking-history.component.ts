import { Component, inject } from '@angular/core';
import { ParkingHistoryColumnKey, SearchModes, TableColumn } from '../../utils/unions';
import { ParkingHistoryService } from './parking-history.service';
import { RoutingService } from '../../services/routing.service';
import { Status } from '../../../shared/utils/unions';
import { GenericTableComponent } from '../../components/generic-table/generic-table.component';

@Component({
  selector: 'app-parking-history',
  standalone: true,
  imports: [GenericTableComponent],
  templateUrl: './parking-history.component.html',
  styleUrl: './parking-history.component.scss'
})
export class ParkingHistoryComponent {
  data: any[] = []
  paginatorData: any = new Object();

  service: ParkingHistoryService = inject(ParkingHistoryService)
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
    this.service.getParkingHistory(
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
        key: ParkingHistoryColumnKey.Id,
        label: 'id',
        searchable: SearchModes.Input
      },
      {
        key: ParkingHistoryColumnKey.UserId,
        label: 'user id',
        searchable: SearchModes.Input
      },
      {
        key: ParkingHistoryColumnKey.CarId,
        label: 'car id',
        searchable: SearchModes.Input
      },
      {
        key: ParkingHistoryColumnKey.Mark,
        label: 'mark',
        searchable: SearchModes.Dropdown
      },
      {
        key: ParkingHistoryColumnKey.Type,
        label: 'type',
        searchable: SearchModes.Dropdown
      },
      {
        key: ParkingHistoryColumnKey.LicenseNumber,
        label: 'license number',
        searchable: SearchModes.Input
      },
      {
        key: ParkingHistoryColumnKey.ZoneId,
        label: 'zone id',
        searchable: SearchModes.Input
      },
      {
        key: ParkingHistoryColumnKey.Name,
        label: 'name',
        searchable: SearchModes.Input
      },
      {
        key: ParkingHistoryColumnKey.Address,
        label: 'address',
        searchable: SearchModes.Input
      },
      {
        key: ParkingHistoryColumnKey.Price,
        label: 'price',
        searchable: SearchModes.Dropdown
      },
      {
        key: ParkingHistoryColumnKey.Available,
        label: 'available',
        searchable: SearchModes.Input
      },
    ]
  }
}
