import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteMode } from 'src/app/shared/utils/unions';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute)
  auth: AuthService = inject(AuthService)
  mode: RouteMode = 'signup'

  ngOnInit(): void {
    this.onRoute()

    if (this.auth.getBearerToken()) {
      this.auth.logout().subscribe()
    }
  }

  onRoute() {
    this.mode = this.route.snapshot.data['mode']
  }

}
