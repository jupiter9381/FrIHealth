import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'register',
        component: RegisterComponent,
      }
    ]),
    SweetAlert2Module.forRoot()
  ]
})
export class RegisterModule { }
