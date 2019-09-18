import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  @ViewChild("notify", { static: true }) public notify;
  updateForm: FormGroup;
  id;
  constructor(
    public http: HttpClient,
    public activatedRouter: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      const id = params.get("id");

      if (id && id == "1") return this.local();
      else if (id && id != "1") this.db(id);
    });

    this.initForm();
  }

  db(id) {
    this.id = id;
    this.http.get<any>(environment.api + "api/user/" + id).subscribe(resp => {
      this.setForm(resp.user);
    });
  }
  local() {
    const userid = localStorage.getItem("userId");

    this.id = userid;
    this.http
      .get<any>(environment.api + "api/user/" + userid)
      .subscribe(resp => {
        this.setForm(resp.user);
      });
  }

  setForm(user) {
    this.updateForm.patchValue({
      fname: user.fname,
      lname: user.lname,
      country: user.country,
      zip: user.zip,
      city: user.city,
      address: user.address
    });
  }

  initForm() {
    this.updateForm = new FormGroup({
      fname: new FormControl(),
      lname: new FormControl(),
      country: new FormControl(),
      zip: new FormControl(),
      city: new FormControl(),
      address: new FormControl()
    });
  }
  onEditProfile() {
    console.log("THIS", this.updateForm.value);
    this.http
      .put<any>(environment.api + "api/user/" + this.id, this.updateForm.value)
      .subscribe(resp => {
        this.notify.title = "Profile Status Updated ! Wow";
        this.notify.show();
        console.log("rEsp", resp);
      });
  }

  onBack() {
    const role = localStorage.getItem("role");
    if (role === "user") {
      this.router.navigate(["/collection"]);
    } else {
      this.router.navigate(["/users"]);
    }
  }
}
