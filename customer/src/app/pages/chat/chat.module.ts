import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainChatComponent } from './main-chat/main-chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ChatModule { }
