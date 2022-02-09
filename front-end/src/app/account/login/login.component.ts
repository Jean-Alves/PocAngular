import { AccountService } from './../services/account.service';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base-components';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements?: ElementRef[];


  errors: any[] = [];
  loginForm!: FormGroup;
  usuario!: User;
  returnUrl: string;

  constructor(private fb:FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
     private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {

    super();

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    };

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    super.configureMensagensValidationBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }
  ngAfterViewInit(): void {
    super.configureValidationFormBase(this.formInputElements!, this.loginForm);
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
       /** spinner starts on init */
    this.spinner.show();


      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

      this.accountService.login(this.usuario)
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

  processSucess(response: User) {
    this.loginForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveLocalUser(response);

    let toast = this.toastr.success('Login realizado com Sucesso!', 'Bem vindo!!!');

    if(toast){
      toast.onHidden.subscribe(() => {
        this.returnUrl
        ? this.router.navigate([this.returnUrl])
        : this.router.navigate(['/home']);
      });
    }
  }

  processError(fail: any){
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }


}
