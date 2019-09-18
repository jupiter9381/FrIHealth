import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import {
  faArrowLeft,
  faCheck,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { SERVER_URL } from "../../../constants";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-update-medical-condition",
  templateUrl: "./update-medical-condition.component.html"
})
export class UpdateMedicalConditionComponent implements OnInit {
  // @ts-ignore
  @ViewChild("notify") private notify: SwalComponent;

  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  faTimes = faTimes;

  id: number;
  name: string;
  description: string;

  menus: any[];
  assignedMenus: any[] = [];
  searchTimeout: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.params.id;
      this.getDetail(this.id);
    });
  }

  ngOnInit() {
    //
  }

  onSearchMenus(event) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      if (event.value) {
        this.searchMenus(event.value);
      } else {
        this.menus = undefined;
      }
    }, 500);
  }

  addMenu(menu: any) {
    if (this.assignedMenus.indexOf(menu) === -1) {
      this.assignedMenus.push(menu);
    }
  }

  removeMenu(menu: any) {
    this.assignedMenus = this.assignedMenus.filter(
      assignedMenu => assignedMenu.id !== menu.id
    );
  }

  onClickSaveMedicalCondition() {
    if (!this.name || !this.name.trim()) {
      this.notify.title = "Name is required";
      this.notify.show();
      return;
    }

    this.http
      .put(environment.api + "api/admin/condition/update/" + this.id, {
        name: this.name,
        description: this.description,
        menus: this.assignedMenus || []
      })
      .toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.notify.title = "Save success!";
          this.notify.type = "success";
          this.notify.show();
          this.router.navigate(["/medical-conditions"]);
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
      .get(environment.api + "api/admin/condition/get/" + id, {
        headers: { "Content-Type": "application/json" }
      })
      .toPromise()
      .then((response: any) => {
        if (response.code === 1 && response.data) {
          this.name = response.data.name;
          this.description = response.data.description;
          this.assignedMenus = response.data.menus;
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

  searchMenus(query: string) {
    this.http
      .get(`${environment.api}api/admin/menu/get/?q=${query}`)
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
        this.notify.title = error;
        this.notify.show();
      });
  }
}
