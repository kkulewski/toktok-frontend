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

// components
import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'message', component: MessageComponent }
];

@NgModule({

  declarations: [
    // register components here
    AppComponent,
    MessageComponent,
    DashboardComponent,
    NavbarComponent
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

    // register interceptors here
    { provide: HTTP_INTERCEPTORS, useClass: HttpRouteInterceptor, multi: true },
  ],

  bootstrap: [
    AppComponent
  ]

})

export class AppModule { }
