// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// interceptors
import { HttpRouteInterceptor } from './interceptors/http-route-interceptor';

// services
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

// components
import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'message', component: MessageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({

  declarations: [
    // register components here
    AppComponent,
    MessageComponent,
    DashboardComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent
  ],

  imports: [
    // register modules here
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [
    // register injectable services here
    MessageService,
    UserService,
    // register interceptors here
    { provide: HTTP_INTERCEPTORS, useClass: HttpRouteInterceptor, multi: true },
  ],

  bootstrap: [
    AppComponent
  ]

})

export class AppModule { }
