import { AccountGuard } from './services/account.guard';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountAppComponent } from "./account.app.component";
import { LoginComponent } from "./login/login.component";

const contaRouterConfig: Routes = [
  {
      path: '', component: AccountAppComponent,
      children: [

          { path: 'login', component: LoginComponent,canActivate:[AccountGuard] }
      ]
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(contaRouterConfig)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
