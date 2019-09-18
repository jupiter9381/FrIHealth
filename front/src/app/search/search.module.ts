import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { TopBarModule } from '../top-bar/top-bar.module';
import { SearchComponent } from './search.component';

import { CanActiveAuth } from '../can-active-auth.guard';
import { CanActiveUser } from '../can-active-user.guard';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'search',
        component: SearchComponent,
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
export class SearchModule { }
