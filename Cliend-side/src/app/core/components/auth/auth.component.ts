import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';


type RouteMode = 'signin' | 'signup'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  router: Router = inject(Router)
  mode: RouteMode = 'signup'

  ngOnInit(): void {
    this.onRoute()
  }

  onRoute() {
    const url = (this.router.url).split('/')
    this.mode = (url[url.length - 1] as RouteMode)
  }

}
