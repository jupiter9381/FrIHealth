import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { TopBarModule } from '../top-bar/top-bar.module';
import { MenuComponent } from './menu.component';
import { ListMenuComponent } from './list-menu/list-menu.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';

import { CanActiveAuth } from '../can-active-auth.guard';
import { CanActiveAdmin } from '../can-active-admin.guard';

@NgModule({
  declarations: [
    MenuComponent,
    ListMenuComponent,
    AddMenuComponent,
    UpdateMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'menus',
        component: MenuComponent,
        canActivate: [CanActiveAuth, CanActiveAdmin],
        children: [
          {
            path: '',
            component: ListMenuComponent
          },
          {
            path: 'new',
            component: AddMenuComponent
          },
          {
            path: 'update/:id',
            component: UpdateMenuComponent
          },
        ]
      },
    ]),
    SweetAlert2Module.forRoot(),
    TopBarModule
  ],
  exports: [
    RouterModule
  ]
})
export class MenuModule { }
