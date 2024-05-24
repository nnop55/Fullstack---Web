import { NgClass, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { NavigationPanelComponent } from '../navigation-panel/navigation-panel.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, NavigationPanelComponent, NgClass, NgStyle],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  ls: LocalStorageService = inject(LocalStorageService)

  isOpen: boolean = false;

  ngOnInit(): void {
    const defSize = this.ls.get('sidebarIsOpened');
    if (defSize) { this.isOpen = defSize }
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen
    this.ls.set('sidebarIsOpened', this.isOpen)
  }

  onClick() {
    if (this.isMobile) {
      this.isOpen = false;
      this.ls.set('sidebarIsOpened', this.isOpen)
    }
  }

  get isMobile() {
    return window.innerWidth <= 800
  }
}
