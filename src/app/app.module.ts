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
import { ChannelService } from './services/channel.service';
import { UserService } from './services/user.service';
import { ChannelUserService } from './services/channel-user.service';

// components
import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { ChannelComponent } from './components/channel/channel.component';
import { TosComponent } from './components/tos/tos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  { path: '', component: MessageComponent },
  { path: 'tos', component: TosComponent },
  { path: 'message', component: MessageComponent },
  { path: 'user/:name', component: ProfileComponent },
  { path: 'channel', component: ChannelComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({

  declarations: [
    // register components here
    AppComponent,
    MessageComponent,
    ChannelComponent,
    TosComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
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
    ChannelService,
    UserService,
    ChannelUserService,
    // register interceptors here
    { provide: HTTP_INTERCEPTORS, useClass: HttpRouteInterceptor, multi: true },
  ],

  bootstrap: [
    AppComponent
  ]

})

export class AppModule { }
