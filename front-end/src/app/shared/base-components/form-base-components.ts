import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';
import { isDebuggerStatement } from 'typescript';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../validation/generic-form-validation';



export abstract class FormBaseComponent {

    displayMessage: DisplayMessage = {};
    validationMessages?: ValidationMessages;
    genericValidator?: GenericValidator;

    changesNotSave?: boolean;

    protected configureMensagensValidationBase(validationMessages: ValidationMessages) {

        this.genericValidator = new GenericValidator(validationMessages);
    }

    protected configureValidationFormBase(
        formInputElements: ElementRef[],
        formGroup: FormGroup) {

        let controlBlurs: Observable<any>[] = formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(() => {

            this.validateForm(formGroup)
        });
    }

    protected validateForm(formGroup: FormGroup) {
        this.displayMessage = this.genericValidator!.processMensagens(formGroup);
        this.changesNotSave = true;
    }
}
