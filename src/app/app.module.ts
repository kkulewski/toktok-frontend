import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRouteInterceptor } from './interceptors/http-route-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRouteInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
