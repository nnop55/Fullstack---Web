import { NgClass } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigation-panel',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './navigation-panel.component.html',
  styleUrl: './navigation-panel.component.scss'
})
export class NavigationPanelComponent {

  router: Router = inject(Router)
  destroyRef: DestroyRef = inject(DestroyRef)

  panelData: any[] = [];
  routeUrls: any = {
    'admin': '/admin',
    'parking-history': '/admin/parking-history',
    'parking-zones': '/admin/parking-zones',
    'cars': '/admin/cars',
  }

  ngOnInit(): void {
    this.getTitleFromUrl()
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef),
        filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.panelData = []
        this.getTitleFromUrl()
      });
  }

  getTitleFromUrl() {
    let url = this.router.url
    if (this.router.url.includes('?')) {
      url = url.slice(0, this.router.url.split('?')[0].length)
    }

    let title = url.split('/')
    for (let item of title) {
      if (this.routeUrls[item]) {
        this.panelData.push({ title: item, url: this.routeUrls[item] })
      }
    }
  }
}
