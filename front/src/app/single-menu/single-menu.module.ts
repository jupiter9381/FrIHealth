import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { SingleMenuComponent } from './single-menu.component';

import { CanActiveAuth } from '../can-active-auth.guard';

@NgModule({
  declarations: [
    SingleMenuComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: 'menu/:id',
        component: SingleMenuComponent,
        canActivate: [CanActiveAuth]
      }
    ]),
    SweetAlert2Module.forRoot(),
  ],
  exports: [
    RouterModule
  ]
})
export class SingleMenuModule { }
