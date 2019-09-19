import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {
  faPencilAlt,
  faTimes,
  faPlus,
  faCircleNotch
} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  constructor(public http: HttpClient) {}
  users;
  faPlus = faPlus;
  faCircleNotch = faCircleNotch;
  faTimes = faTimes;
  faPencilAlt = faPencilAlt;
  ngOnInit() {
    this.init();
  }

  init() {
    this.http.get<any>(environment.api + "api/users").subscribe(resp => {
      this.users = resp.users;
    });
  }

  onRemove(id) {
    this.http
      .delete<any>(environment.api + "api/user/" + id)
      .subscribe(resp => {
        if (resp.code === 1) {
          this.users = this.users.filter(e => id != e._id);
        }
      });
  }
}
