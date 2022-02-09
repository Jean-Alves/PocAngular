import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    MenuComponent,
    MenuLoginComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent,

  ],

  imports: [CommonModule, RouterModule,NgbModule],
  exports:[
    MenuComponent,
    MenuLoginComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent,
    

  ],

})
export class NavigationModule {}
