import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  selector: "app-update-menu",
  templateUrl: "./update-menu.component.html"
})
export class UpdateMenuComponent implements OnInit {
  // @ts-ignore
  @ViewChild("notify") private notify: SwalComponent;

  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;

  id: number;
  name: string;
  description: string;
  quantity: string;
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

  type: string = "ingredient";
  ingredients: string = "";

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.params.id;
      this.getList();
    });
  }

  ngOnInit() {}

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
      .put(environment.api + "api/admin/put/menu/" + this.id, {
        name: this.name,
        quantity: this.quantity,
        description: this.description,
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
        conditions: this.medicalConditions.filter(
          medicalCondition => medicalCondition.isAssigned
        )
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

  getDetail(id) {
    this.http
      .get(environment.api + "api/admin/menu/get/" + id)
      .toPromise()
      .then((response: any) => {
        if (response.code === 1 && response.data) {
          this.type = response.data.type;
          this.ingredients = response.data.ingredients;
          this.name = response.data.name;
          this.quantity = response.data.quantity;
          this.description = response.data.description;
          this.calories = response.data.nutritions.calories;
          this.fat = response.data.nutritions.fat;
          this.sodium = response.data.nutritions.sodium;
          this.carbohydrates = response.data.nutritions.carbohydrates;
          this.protein = response.data.nutritions.protein;
          this.vitaminC = response.data.nutritions.vitaminC;
          this.vitaminA = response.data.nutritions.vitaminA;
          this.calcium = response.data.nutritions.calcium;
          this.iron = response.data.nutritions.iron;

          this.medicalConditions = this.medicalConditions.map(
            medicalCondition => {
              const result = response.data.conditions.find(
                condition => condition._id === medicalCondition._id
              );

              return {
                _id: medicalCondition._id,
                name: medicalCondition.name,
                description: medicalCondition.description,
                isAssigned: !!result
              };
            }
          );
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

  getList() {
    this.http
      .get(environment.api + "api/admin/conditions/get")
      .toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.medicalConditions = response.data;

          this.getDetail(this.id);
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
