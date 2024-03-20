import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteMode } from 'src/app/shared/utils/unions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute)
  mode: RouteMode = 'signup'

  ngOnInit(): void {
    this.onRoute()
  }

  onRoute() {
    this.mode = this.route.snapshot.data['mode']
  }

}
