import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent implements OnInit {
  @Input() page: string;
  @Input() navigations: object[] = [];

  faPowerOff = faPowerOff;

  constructor(private router: Router) {
    //
  }

  ngOnInit() {
    //
  }

  onClickLogout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

}
