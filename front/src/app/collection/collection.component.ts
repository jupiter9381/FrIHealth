import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { faTimes, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { SERVER_URL } from "../../constants";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-collection",
  templateUrl: "./collection.component.html",
  styleUrls: ["./col.css"]
})
export class CollectionComponent implements OnInit {
  // @ts-ignore
  @ViewChild("notify") private notify: SwalComponent;
  collections = [];
  selectedMenu = {
    collectionName: "",
    menus: []
  };
  faTimes = faTimes;
  faCircleNotch = faCircleNotch;
  menu = {
    nutritions: {
      calories: 0,
      sodium: 0,
      fat: 0,
      carbohydrates: 0,
      protein: 0,
      calcium: 0,
      vitaminA: 0,
      vitaminC: 0,
      iron: 0
    }
  };
  menus: any[] = [];

  constructor(private http: HttpClient) {
    //
  }

  ngOnInit() {
    this.getList();
  }

  onClickRemoveMenu(collection, menu) {
    this.http
      .delete(`${environment.api}api/user/menu/${collection._id}/${menu._id}`)
      .toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.notify.title = "Remove success!";
          let menuId = menu._id;
          let index = this.collections.findIndex(
            col => col._id === collection._id
          );
          this.collections[index].menus = this.collections[index].menus.filter(
            e => e._id !== menu._id
          );
          this.menus = this.collections[index].menus;
          this.kataGula();
          this.notify.type = "success";
          this.notify.show();
          // this.getList();
        } else {
          this.notify.title = response.message;
          this.notify.show();
        }
      })
      .catch(error => {
        this.notify.title = error.error;
        this.notify.show();
      });
  }

  getList() {
    const userId = localStorage.getItem("userId");
    if (!userId) return window.alert("NOT A LEGAL USER");
    this.http
      .get(`${environment.api}api/user/myCollection/${userId}`)
      .toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.collections = response.data;

          this.halaGula();
        } else {
          this.notify.title = response.message;
          this.menus = [];
          this.notify.show();
        }
      })
      .catch(error => {
        this.notify.title = error.error;
        this.notify.show();
      });
  }

  halaGula() {
    this.menus.forEach(menu => {
      Object.keys(menu.nutritions).forEach(e => {
        this.menu.nutritions[e] = this.menu.nutritions[e] + menu.nutritions[e];
      });
    });
  }
  kataGula() {
    this.menus.forEach(menu => {
      Object.keys(menu.nutritions).forEach(e => {
        this.menu.nutritions[e] = this.menu.nutritions[e] - menu.nutritions[e];
      });
    });
  }

  onSelect(collection) {
    this.selectedMenu = collection;
    this.kataGula();
    this.menus = this.selectedMenu.menus;
    console.log("Colled", this.menus);
    this.halaGula();
  }

  onRemoveCustom(collection) {
    console.log(collection);
    this.http
      .delete(environment.api + "api/user/collection/" + collection._id)
      .subscribe(resp => {
        console.log("RESOp", resp);
        this.notify.title = "Deleted !";
        this.notify.show();
        this.selectedMenu = {
          collectionName: "",
          menus: []
        };
        console.log(this.collections.filter(e => e._id !== collection._id));

        let col = this.collections.filter(e => e._id !== collection._id);
        console.log("qaq", col);
        this.collections = [...col];

        this.kataGula();
        this.menus = [];
      });
  }
}
