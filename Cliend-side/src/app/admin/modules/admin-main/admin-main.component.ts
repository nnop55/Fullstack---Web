import { Component } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';
import { Status } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent {
  constructor(private shared: SharedService) {
    this.shared.getUserRoles().subscribe({
      next: (response) => {
        if (response.code == Status.success) {

        }
      },
      error: () => { }
    })
  }
}
