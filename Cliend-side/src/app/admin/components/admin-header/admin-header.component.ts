import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  @Output() onToggle: EventEmitter<string> = new EventEmitter<string>()

  ls: LocalStorageService = inject(LocalStorageService)

  sidenavSize: string = "20";

  ngOnInit(): void {
    this.sidenavSize = this.sidenavCurrentSize ?? "20%";
  }

  toggleSidenav() {
    this.sidenavSize = this.sidenavSize == "0" ? "20%" : "0"
    this.ls.set('sidenavSize', this.sidenavSize)
  }

  get sidenavCurrentSize() {
    return this.ls.get('sidenavSize');
  }
}
