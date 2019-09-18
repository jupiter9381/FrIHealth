import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import {
  faArrowLeft,
  faCircleNotch,
  faPlus,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { SERVER_URL } from "../../constants";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-single-menu",
  templateUrl: "./single-menu.component.html",
  styleUrls: ["./single.css"]
})
export class SingleMenuComponent implements OnInit {
  // @ts-ignore
  @ViewChild("notify") private notify: SwalComponent;

  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faTimes = faTimes;
  faCircleNotch = faCircleNotch;

  id: number;
  isAbleToAdd: boolean;
  isAbleToRemove: boolean;
  menu: {
    name: string;
    quantity: string;
    description: string;
    nutritions: {};
    conditions: any[];
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.params.id;
      this.getDetail(this.id);
    });
    this.activatedRoute.queryParamMap.subscribe((params: any) => {
      this.isAbleToAdd = !!params.params.isAbleToAdd;
      this.isAbleToRemove = !!params.params.isAbleToRemove;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getNutritionValues(9);
    }, 2000);
    //
  }

  onClickBack() {
    this.location.back();
  }

  onClickAddMenu() {
    const userId = localStorage.getItem("userId");
    this.http
      .post(`${SERVER_URL}/users/${userId}/menus/${this.id}`, {
        headers: { "Content-Type": "application/json" }
      })
      .toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.notify.title = "Add success!";
          this.notify.type = "success";
          this.notify.show();
        } else {
          this.notify.title = response.message;
          this.notify.show();
        }
      })
      .catch(error => {
        this.notify.title = error;
        this.notify.show();
      });
  }

  onClickRemoveMenu() {
    const userId = localStorage.getItem("userId");
    this.http
      .delete(`${environment.api}api/user/menu/${userId}/${this.id}`, {
        headers: { "Content-Type": "application/json" }
      })
      .toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.location.back();
          this.notify.title = "Remove success!";
          this.notify.type = "success";
          this.notify.show();
        } else {
          this.notify.title = response.message;
          this.notify.show();
        }
      })
      .catch(error => {
        this.notify.title = error;
        this.notify.show();
      });
  }

  getDetail(id) {
    this.http
      .get(`${environment.api}api/admin/menu/get/${id}`, {
        headers: { "Content-Type": "application/json" }
      })
      .toPromise()
      .then((response: any) => {
        if (response.code === 1 && response.data) {
          this.menu = response.data;
        } else {
          this.notify.title = response.message;
          this.notify.show();
        }
      })
      .catch(error => {
        this.notify.title = error;
        this.notify.show();
      });
  }

  getNutritionValues(currentValue) {}
}
