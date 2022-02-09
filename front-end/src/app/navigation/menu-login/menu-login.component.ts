import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageShared } from 'src/app/shared/storage/localstorage';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
})
export class MenuLoginComponent {
  token: string = '';
  user: any;
  email: string = '';
  localStorageUtils = new LocalStorageShared();

  constructor(private router: Router) {}

  userLogado(): boolean {
    this.token = this.localStorageUtils.getTokenUser();
    this.user = this.localStorageUtils.getUser();

    if (this.user) this.email = this.user.email;

    return this.token !== null && this.token !== '';
  }

  logout() {
    this.localStorageUtils.clearUser();
    this.router.navigate(['/home']);
  }
}
