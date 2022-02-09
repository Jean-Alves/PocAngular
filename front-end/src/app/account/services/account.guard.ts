import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router } from "@angular/router";
import { LocalStorageShared } from "src/app/shared/storage/localstorage";
import { LoginComponent } from "../login/login.component";

@Injectable()
export class AccountGuard implements CanDeactivate<LoginComponent>, CanActivate {

    localStorageShared = new LocalStorageShared();

    constructor(private router: Router){}

    canDeactivate(component: LoginComponent) {

        if(component.changesNotSave) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
        }

        return true
    }

    canActivate() {

      var userToken = this.localStorageShared.getTokenUser();
      if(userToken!==null && userToken!==''){
          this.router.navigate(['/home']);
      }


        return true;
    }

}
