import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteMode } from 'src/app/shared/utils/unions';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgComponentOutlet } from '@angular/common';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [NgComponentOutlet],
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute)
  auth: AuthService = inject(AuthService)
  mode: RouteMode = 'signup'

  LoginComponent = LoginComponent
  RegisterComponent = RegisterComponent

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
