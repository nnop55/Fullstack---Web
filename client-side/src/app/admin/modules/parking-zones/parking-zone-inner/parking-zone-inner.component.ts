import { Component, Input, inject, numberAttribute } from '@angular/core';
import { ParkingZonesService } from '../parking-zones.service';

@Component({
  selector: 'app-parking-zone-inner',
  standalone: true,
  imports: [],
  templateUrl: './parking-zone-inner.component.html',
  styleUrl: './parking-zone-inner.component.scss'
})
export class ParkingZoneInnerComponent {
  @Input({ transform: numberAttribute }) zoneId!: number;

  private service: ParkingZonesService = inject(ParkingZonesService)

  ngOnInit(): void {
    this.service.getParkingZoneById(this.zoneId)
      .subscribe({
        next: (response) => {
          console.log(response)
        }
      })
  }

}
