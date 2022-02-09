import { CalculationGuard } from './services/calculation.guard';
import { CalculationService } from './services/calculation.service';
import { CalculationRoutingModule } from './calculation.route';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsComponent } from './operations/operations.component';
import { CalculationAppComponent } from './calculation.app.component';


import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CalculationAppComponent,
    OperationsComponent
  ],
  imports: [
    CommonModule,
    CalculationRoutingModule,
    NgxSpinnerModule,
    FormsModule,   HttpClientModule,
    ReactiveFormsModule,
  ],
  providers:[CalculationService,CalculationGuard]
})
export class CalculationModule { }
