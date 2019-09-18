import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { SERVER_URL } from "../../constants";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
  // @ts-ignore
  @ViewChild("notify") private notify: SwalComponent;

  username: string;
  password: string;
  confirmPassword: string;

  constructor(private router: Router, private http: HttpClient) {
    //
  }

  ngOnInit() {
    //
  }

  onSubmitRegister() {
    // Validation
    if (
      !this.username ||
      !this.username.trim() ||
      !this.password ||
      !this.password.trim() ||
      !this.confirmPassword ||
      !this.confirmPassword.trim()
    ) {
      this.notify.title =
        "Please enter username, password and confirm password";
      this.notify.show();
      return;
    }

    // Call api register
    this.http
      .post(environment.api + "api/user/register", {
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
      .toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.notify.title = "Register success!";
          this.notify.type = "success";
          this.notify.show();
          this.router.navigate(["/login"]);
        } else {
          this.notify.title = response.error;
          this.notify.show();
        }
      })
      .catch(error => {
        this.notify.title = error.error.error;
        this.notify.show();
      });
  }
}
