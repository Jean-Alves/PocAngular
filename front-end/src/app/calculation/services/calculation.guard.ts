import { LocalStorageShared } from 'src/app/shared/storage/localstorage';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class CalculationGuard implements CanActivate{

  localStorageShared = new LocalStorageShared();


  constructor(private router:Router) {


  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {


    if(!this.localStorageShared.getTokenUser()){
      this.router.navigate(['/account/login']);
    }

    return true;
  }

}
