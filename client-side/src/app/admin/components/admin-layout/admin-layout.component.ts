import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  standalone: true,
  imports: [RouterOutlet, NgStyle, RouterLinkActive, RouterLink]
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {

  ls: LocalStorageService = inject(LocalStorageService)

  sidenavSize: string = "20%";

  ngOnInit(): void {
    const defSize = this.ls.get('sidenavSize');
    if (defSize) { this.sidenavSize = defSize }
    this.onSizeChange()
  }

  ngAfterViewInit(): void {
    this.resizeSection()
  }

  resizeSection() {
    const sectionEl = document.querySelector(".admin-section") as HTMLElement
    sectionEl.style.marginLeft = this.sidenavSize;
  }

  toggleSidenav() {
    this.sidenavSize = this.sidenavSize == "0" ? "20%" : "0"
    this.ls.set('sidenavSize', this.sidenavSize)
  }

  onSizeChange() {
    this.ls.storage$.subscribe((item) => {
      item['sidenavSize'] && (this.sidenavSize = item['sidenavSize'],
        this.resizeSection())
    });
  }
}
