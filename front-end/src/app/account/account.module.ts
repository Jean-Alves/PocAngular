import { AccountService } from './services/account.service';
import { AccountGuard } from './services/account.guard';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AccountAppComponent } from './account.app.component';

import { AccountRoutingModule } from './account.route';

import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [
    AccountAppComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers:[
    AccountService,
    AccountGuard
  ]
})
export class AccountModule { }
