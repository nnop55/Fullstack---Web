import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  @Output() onToggle: EventEmitter<string> = new EventEmitter<string>()

  sidenavSize = "0"

  toggleSidenav() {
    this.sidenavSize = this.sidenavSize == "0" ? "20%" : "0"
    this.onToggle.emit(this.sidenavSize)
  }
}
