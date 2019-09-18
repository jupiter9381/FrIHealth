import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { TopBarComponent } from './top-bar.component';

@NgModule({
  declarations: [
    TopBarComponent
  ],
  exports: [
    TopBarComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    SweetAlert2Module.forRoot()
  ]
})
export class TopBarModule { }
