import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordRepeat } from './directive/password-repeat';

@NgModule({
  declarations: [PasswordRepeatDirective],
  imports: [CommonModule],
  exports: [PasswordRepeatDirective],
})
export class SharedModule {}
