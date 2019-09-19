import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-medical-condition',
  templateUrl: './medical-condition.component.html',
})
export class MedicalConditionComponent implements OnInit {

  constructor(private http: HttpClient) { }


  ngOnInit() {
  }

}
