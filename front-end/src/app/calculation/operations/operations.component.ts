import { OperationModel } from './../models/operations.model';
import { CalculationService } from './../services/calculation.service';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base-components';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent extends FormBaseComponent implements OnInit {
  errors: any[] = [];
  operationsForm!: FormGroup;
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements?: ElementRef[];
  operationModel!: OperationModel;

  result="";

  constructor(private fb:FormBuilder,
     private spinner: NgxSpinnerService,
     private calculationService: CalculationService,
     private toastr: ToastrService,
    ) {super();
    this.validationMessages = {
      number1: {
        required: 'Informe numero',

      },
      number2: {
        required: 'Informe numero',
      }
    };


    super.configureMensagensValidationBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.operationsForm = this.fb.group({
      number1: ['', [Validators.required,  Validators.pattern("^[0-9]*$"), Validators.minLength(1)]],
      number2: ['', [Validators.required,  Validators.pattern("^[0-9]*$"),Validators.minLength(1)]]
    });


  }

  ngAfterViewInit(): void {
    super.configureValidationFormBase(this.formInputElements!, this.operationsForm);
  }
  makeCalculation(type:number){
    if (this.operationsForm.dirty && this.operationsForm.valid) {
      /** spinner starts on init */
   this.spinner.show();

   this.operationModel = Object.assign({}, this.operationModel, this.operationsForm.value);
this.operationModel.operation = type;
     this.calculationService.makeCalculation(  this.operationModel)
     .subscribe({
         next: (sucess)=> {
           setTimeout(() => {
             this.spinner.hide();
           }, 500);

           this.processSucess(sucess)},
         error:(err) => {
           setTimeout(() => {
             this.spinner.hide();
           }, 500);
           debugger
           this.processError(err)}
       }
     );
   }

  }

  processSucess(response: any) {
    this.operationsForm.reset();
    this.errors = [];


    this.result=response ;




  }

  processError(fail: any){

    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
