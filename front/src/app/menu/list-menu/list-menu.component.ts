import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  faPencilAlt,
  faPlus,
  faTimes,
  faCircleNotch
} from "@fortawesome/free-solid-svg-icons";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-list-menu",
  templateUrl: "./list-menu.component.html"
})
export class ListMenuComponent implements OnInit {
  // @ts-ignore
  @ViewChild("notify") private notify: SwalComponent;

  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  faTimes = faTimes;
  faCircleNotch = faCircleNotch;

  menus: any[] = [];

  constructor(private http: HttpClient) {
    //
  }

  ngOnInit() {
    this.getList();
  }

  onClickRemoveMenu(menuId) {
    this.http
      .delete(environment.api + "api/admin/menu/" + menuId)
      .toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.notify.title = "Delete success!";
          this.notify.type = "success";
          this.notify.show();
          this.getList();
        } else {
          this.notify.title = response.message;
          this.notify.show();
        }
      })
      .catch(error => {
        this.notify.title = error.error.error;
        this.notify.show();
      });
  }

  getList() {
    this.http
      .get(environment.api + "api/admin/menu/get")
      .toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.menus = response.data;
        } else {
          this.notify.title = response.message;
          this.notify.show();
        }
      })
      .catch(error => {
        this.notify.title = error.error.error;
        this.notify.show();
      });
  }
}
