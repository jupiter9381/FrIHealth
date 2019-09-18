import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  faPencilAlt,
  faPlus,
  faTimes,
  faCircleNotch
} from "@fortawesome/free-solid-svg-icons";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { SERVER_URL } from "../../../constants";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-list-medical-condition",
  templateUrl: "./list-medical-condition.component.html"
})
export class ListMedicalConditionComponent implements OnInit {
  // @ts-ignore
  @ViewChild("notify") private notify: SwalComponent;

  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  faTimes = faTimes;
  faCircleNotch = faCircleNotch;

  medicalConditions: any[] = [];

  constructor(private http: HttpClient) {
    //
  }

  ngOnInit() {
    this.getList();
  }

  onClickRemoveMedicalCondition(medicalConditionId) {
    this.http
      .delete(environment.api + "api/admin/condition/del/" + medicalConditionId)
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
      .get(environment.api + "api/admin/conditions/get")
      .toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.medicalConditions = response.data;
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
