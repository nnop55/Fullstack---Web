import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, OnInit, effect, inject } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink, NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, NgStyle, RouterLinkActive, RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {

  ls: LocalStorageService = inject(LocalStorageService)
  router: Router = inject(Router)

  sidenavSize: string = "20%";

  ngOnInit(): void {
    const defSize = this.ls.get('sidenavSize');
    if (defSize) { this.sidenavSize = defSize }
    this.onRouteChange()
  }

  ngAfterViewInit(): void {
    this.resizeSection()
  }


  onSizeChange = effect(() => {
    const storageSubject = this.ls.storageSubject()
    storageSubject['sidenavSize'] && (this.sidenavSize = storageSubject['sidenavSize'],
      this.resizeSection())
  });

  resizeSection() {
    const sectionEl = document.querySelector(".admin-section") as HTMLElement
    sectionEl && (sectionEl.style.marginLeft = this.sidenavSize)
  }

  toggleSidenav() {
    this.sidenavSize = this.sidenavSize == "0" ? "20%" : "0"
    this.ls.set('sidenavSize', this.sidenavSize)
  }

  onRouteChange() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.resizeSection()
      }
    });
  }
}
