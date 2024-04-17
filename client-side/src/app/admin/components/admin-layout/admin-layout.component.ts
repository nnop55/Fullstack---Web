import { NgStyle } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink, NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, NgStyle, RouterLinkActive, RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  ls: LocalStorageService = inject(LocalStorageService)
  router: Router = inject(Router)

  sidenavSize: string = '20%';

  onSizeChange = effect(() => {
    const storageSubject = this.ls.storageSubject()
    storageSubject['sidenavSize'] && (this.sidenavSize = storageSubject['sidenavSize'],
      this.resizeSection())
  });

  ngOnInit(): void {
    const defSize = this.ls.get('sidenavSize');
    if (defSize) { this.sidenavSize = defSize }
    this.onRouteChange()
  }

  ngAfterViewInit(): void {
    this.resizeSection()
  }

  resizeSection() {
    if (this.isSmallScreen) {
      return
    }

    const sectionEl = document.querySelector(".admin-section") as HTMLElement
    sectionEl && (sectionEl.style.marginLeft = this.sidenavSize)
  }

  toggleSidenav() {
    this.sidenavSize = this.isOpen ? '0' : this.sizes('70%', '20%')
    this.ls.set('sidenavSize', this.sidenavSize)
  }

  onRouteChange() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.resizeSection()
      }
    });
  }

  sizes(m: string, n: string) {
    return (this.isSmallScreen ? m : n)
  }

  get isSmallScreen() {
    return window.innerWidth <= 900
  }

  get isOpen() {
    return this.sidenavSize != '0';
  }
}
