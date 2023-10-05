import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// Component
import { ExtrapagesRoutingModule } from "./extrapages-routing.module";
import { Page404Component } from './page404/page404.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    Page404Component
  ],
  imports: [
    CommonModule,
    ExtrapagesRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ]
})
export class ExtrapagesModule { }
