import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import {
  faArrowLeft,
  faCheck,
  faCheckSquare,
  faSquare
} from "@fortawesome/free-solid-svg-icons";
import { SERVER_URL } from "../../../constants";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-add-menu",
  templateUrl: "./add-menu.component.html"
})
export class AddMenuComponent implements OnInit {
  // @ts-ignore
  @ViewChild("notify") private notify: SwalComponent;

  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;

  name: string;
  quantity: string;
  description: string;
  type: string = "ingredient";
  ingredients: string = "";
  calories;
  fat;
  sodium;
  carbohydrates;
  protein;
  vitaminC;
  vitaminA;
  calcium;
  iron;
  medicalConditions: any[];

  constructor(private router: Router, private http: HttpClient) {
    //
  }

  ngOnInit() {
    this.getList();
  }

  onAssignMedicalCondition(index: number, isAssigned: boolean) {
    this.medicalConditions[index].isAssigned = isAssigned;
  }

  onClickSaveMenu() {
    if (!this.name || !this.name.trim()) {
      this.notify.title = "Name is required";
      this.notify.show();
      return;
    }
    if (!this.quantity || !this.quantity.trim()) {
      this.notify.title = "Quantity is required";
      this.notify.show();
      return;
    }

    if(this.type === "ingredient") {
      this.ingredients = "";
    }
    this.http
      .post(environment.api + "api/admin/menu/create", {
        name: this.name,
        quantity: this.quantity,
        type: this.type,
        ingredients: this.ingredients,
        nutritions: {
          calories: this.calories,
          fat: this.fat,
          sodium: this.sodium,
          carbohydrates: this.carbohydrates,
          protein: this.protein,
          vitaminC: this.vitaminC,
          vitaminA: this.vitaminA,
          calcium: this.calcium,
          iron: this.iron
        },
        description: this.description,
        conditions: this.medicalConditions
          .filter(medicalCondition => medicalCondition.isAssigned)
          .map(e => ({ ...e, isAssigned: undefined }))
      })
      .toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.notify.title = "Save success!";
          this.notify.type = "success";
          this.notify.show();
          this.router.navigate(["/menus"]);
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
        this.notify.title = error;
        this.notify.show();
      });
  }
}
