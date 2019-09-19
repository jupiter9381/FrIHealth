import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";


import { TopBarModule } from "../top-bar/top-bar.module";
import { MedicalConditionComponent } from "./medical-condition.component";
import { ListMedicalConditionComponent } from "./list-medical-condition/list-medical-condition.component";
import { AddMedicalConditionComponent } from "./add-medical-condition/add-medical-condition.component";
import { UpdateMedicalConditionComponent } from "./update-medical-condition/update-medical-condition.component";

import { CanActiveAuth } from "../can-active-auth.guard";
import { CanActiveAdmin } from "../can-active-admin.guard";

@NgModule({
  declarations: [
    MedicalConditionComponent,
    ListMedicalConditionComponent,
    AddMedicalConditionComponent,
    UpdateMedicalConditionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    
    RouterModule.forRoot([
      {
        path: "medical-conditions",
        component: MedicalConditionComponent,
        canActivate: [CanActiveAuth, CanActiveAdmin],
        children: [
          {
            path: "",
            component: ListMedicalConditionComponent
          },
          {
            path: "new",
            component: AddMedicalConditionComponent
          },
          {
            path: "update/:id",
            component: UpdateMedicalConditionComponent
          }
        ]
      }
    ]),
    SweetAlert2Module.forRoot(),
    TopBarModule
  ],
  exports: [RouterModule]
})
export class MedicalConditionModule {}
