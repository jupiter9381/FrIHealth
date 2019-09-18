import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CustomMenu {
  activeMenus;
  constructor(public http: HttpClient) {
    console.log("HI i am here");
  }

  saveActiveMenu(menu) {
    let found = 0;
    this.activeMenus.forEach(e => {
      e.name === menu.name ? (found = 1) : (found = 0);
    });

    if (found == 0) {
      this.activeMenus.push(menu);
      localStorage.setItem("menus", JSON.stringify(this.activeMenus));
    }

    return this.activeMenus.slice();
  }
  deleteMenu(menu) {
    this.activeMenus = this.activeMenus.filter(e => e.name !== menu.name);
    localStorage.setItem("menus", JSON.stringify(this.activeMenus));
    return this.activeMenus.slice();
  }

  getActiveMenus() {
    if (!this.activeMenus || this.activeMenus.length === 0) {
      console.log("EEE");
      const menus = localStorage.getItem("menus");
      if (!menus) return (this.activeMenus = []);
      else return (this.activeMenus = JSON.parse(menus));
    }

    return this.activeMenus.slice();
  }
}
