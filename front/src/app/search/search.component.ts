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
  menus: any[];
  collections = [];
  activeMenus = [];
  searchTimeout: any;

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
        console.log("SSSS", this.activeMenus);
        let find;
        resp.data.forEach(e => {
          find = this.activeMenus.findIndex(
            act => act.name === e.collectionName
          );
          console.log("index", find);
          if (find < 0) {
            console.log("Pushing in ");
            console.log(this.activeMenus.push({ name: e.collectionName }));
          }
        });
        console.log("Mesnui", resp.data);
      });
    console.log(this.customMenuService.getActiveMenus());
  }

  searchMenus(query?: string) {
    this.http
      .get(
        `${environment.api}api/admin/menu/get` +
          (!!query ? `/?q=${query}` : ""),
        { headers: { "Content-Type": "application/json" } }
      )
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

  onSelect(menu) {
    console.log("MNEU", menu);
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
    console.log("@@", this.customMenuService.deleteMenu(name));
    this.activeMenus = this.customMenuService.deleteMenu(name);
  }
}
