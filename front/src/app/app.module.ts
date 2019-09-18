import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";

import { LoginModule } from "./login/login.module";
import { RegisterModule } from "./register/register.module";
import { MedicalConditionModule } from "./medical-condition/medical-condition.module";
import { MenuModule } from "./menu/menu.module";
import { SearchModule } from "./search/search.module";
import { CollectionModule } from "./collection/collection.module";
import { SingleMenuModule } from "./single-menu/single-menu.module";
import { ProfileComponent } from "./profile/profile.component";
import { TopBarModule } from "./top-bar/top-bar.module";
import { SwalComponent, SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { UserListComponent } from "./user-list/user-list.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { UserAddComponent } from './user-add/user-add.component';

@NgModule({
  declarations: [AppComponent, ProfileComponent, UserListComponent, UserAddComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "profile/:id", component: ProfileComponent },
      { path: "users", component: UserListComponent },
      { path: "users/new", component: UserAddComponent },
      { path: "", redirectTo: "/medical-conditions", pathMatch: "full" }
    ]),
    LoginModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RegisterModule,
    MedicalConditionModule,
    TopBarModule,
    SweetAlert2Module,
    MenuModule,
    SearchModule,

    CollectionModule,
    SingleMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
