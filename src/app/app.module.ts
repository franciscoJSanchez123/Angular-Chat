import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import { ChatComponent } from './components/chat/chat.component';

import { PickerModule } from '@ctrl/ngx-emoji-mart'



const config:SocketIoConfig = { url: 'http://localhost:3000', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    HttpClientModule,
    PickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
