import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRouteInterceptor } from './interceptors/http-route-interceptor';
import { MessageService } from './services/message.service';

@NgModule({

  declarations: [
    // register components here
    AppComponent,
    MessageComponent
  ],

  imports: [
    // register modules here
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
