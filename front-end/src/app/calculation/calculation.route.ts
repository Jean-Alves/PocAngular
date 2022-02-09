import { CalculationGuard } from './services/calculation.guard';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalculationAppComponent } from "./calculation.app.component";
import { OperationsComponent } from "./operations/operations.component";


const ccalculationRouterConfig: Routes = [
  {
      path: '', component: CalculationAppComponent,
      children: [

          { path: 'operations', component: OperationsComponent, canActivate:[CalculationGuard]}
      ]
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(ccalculationRouterConfig)
  ],
  exports: [RouterModule]
})
export class CalculationRoutingModule { }
