import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { TopBarModule } from '../top-bar/top-bar.module';
import { CollectionComponent } from './collection.component';

import { CanActiveAuth } from '../can-active-auth.guard';
import { CanActiveUser } from '../can-active-user.guard';

@NgModule({
  declarations: [
    CollectionComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: 'collection',
        component: CollectionComponent,
        canActivate: [CanActiveAuth, CanActiveUser]
      }
    ]),
    SweetAlert2Module.forRoot(),
    TopBarModule
  ],
  exports: [
    RouterModule
  ]
})
export class CollectionModule { }
