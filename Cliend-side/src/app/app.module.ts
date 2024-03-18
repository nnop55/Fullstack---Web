import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './core/components/auth/auth.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { RegisterComponent } from './core/components/auth/register/register.component';
import { LoginComponent } from './core/components/auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
