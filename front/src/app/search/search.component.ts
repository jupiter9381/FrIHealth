import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import {
  faPlus,
  faCircleNotch,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { environment } from "../../environments/environment";
import { CustomMenu } from "../custom-menu.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.css"]
})
export class SearchComponent implements OnInit {
  // @ts-ignore
  @ViewChild("notify") private notify: SwalComponent;
  faPlus = faPlus;
  faCircleNotch = faCircleNotch;
  faTimes = faTimes;
  selectedMenu = {
    name: ""
  };
  menus = [];
  collections = [];
  activeMenus = [];
  searchTimeout: any;

  filter: string;
  type: string = "ingredient";
  constructor(private http: HttpClient, public customMenuService: CustomMenu) {
    //
  }

  ngOnInit() {
    this.searchMenus();
    this.searchActiveMenus();
  }

  onSearchMenus(event) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchMenus(event.value);
    }, 500);
  }

  onClickAddMenu(menuId: number) {
    if (this.selectedMenu.name === "") {
      this.notify.title = "No Menu selected!";
      this.notify.show();
      return 0;
    }
    const userId = localStorage.getItem("userId");
    this.http
      .post(
        `${environment.api}api/user/${userId}/save/menu`,
        { user: userId, menuId, collectionName: this.selectedMenu.name },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
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

  searchActiveMenus() {
    this.activeMenus = this.customMenuService.getActiveMenus();
    const userId = localStorage.getItem("userId");

    this.http
      .get<any>(environment.api + "api/user/myCollection/" + userId)
      .subscribe(resp => {
        let find;
        resp.data.forEach(e => {
          find = this.activeMenus.findIndex(
            act => act.name === e.collectionName
          );
          if (find < 0) {
          }
        });
      });
  }

  searchMenus(query?: string) {
    this.menus = [];
    this.http
      .get(
        `${environment.api}api/admin/menu/get` +
          (!!query ? `/?q=${query}` : ""),
        { headers: { "Content-Type": "application/json" } }
      )
      .toPromise()
      .then((response: any) => {
        console.log(this.type);
        if (response.code === 1) {
          response.data.forEach(item => {
            if(this.type === "ingredient" && item.type === "ingredient"){
              this.menus.push(item);
            } else if(this.type === "menu" && item.type === "menu") {
              this.menus.push(item);
            }
          })
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

  onSelect(menu) {
    this.selectedMenu = { ...menu };
  }

  onAddMenu(name: string) {
    if (!name || name.length == 0) {
      this.notify.title = "Please Provide for Custom Menu";
      this.notify.show();
      return;
    }
    this.activeMenus = this.customMenuService.saveActiveMenu({ name });
  }

  onRemoveCustom(name) {
    this.activeMenus = this.customMenuService.deleteMenu(name);
  }

  changeType () {
    this.searchMenus()
  }
  changeFilters(){
    this.menus = [];
    const userid = localStorage.getItem("userId");
    let city = "";
    if(this.filter === "Location") {
      this.http
      .get<any>(environment.api + "api/user/" + userid)
      .subscribe(resp => {
        city = resp.user.city;
        this.http
        .get<any>(environment.api + "api/getUsersByCity/" + city)
        .subscribe(item => {
          if(this.type === "ingredient" && item.type === "ingredient"){
            this.menus.push(item);
          } else if(this.type === "menu" && item.type === "menu") {
            this.menus.push(item);
          }
        });
      });
    }
    
  }
}
