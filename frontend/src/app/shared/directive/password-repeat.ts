import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { validate, ValidationError } from '@angular/forms/signals';

@Directive({
  selector: '[PasswordRepeat]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordRepeat, multi: true}],

})
export class PasswordRepeat Validator {

  validate(control: AbstractControl): ValidationError | null {
    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');

    if (password.value !== passwordRepeat.value) {
      passwordRepeat?.setErrors({passwordRepeat: true});
      return passwordRepeat;
    }
    return null;
  }

}
