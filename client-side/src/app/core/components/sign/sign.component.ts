import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteMode } from '../../../shared/utils/unions';
import { AuthService } from '../../services/auth.service';
import { UpComponent } from './up/up.component';
import { InComponent } from './in/in.component';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss'
})
export class SignComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  auth: AuthService = inject(AuthService)
  mode: RouteMode = 'up'

  UpComponent = UpComponent
  InComponent = InComponent

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
