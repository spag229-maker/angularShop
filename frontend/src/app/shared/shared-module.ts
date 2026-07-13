import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordRepeat } from './directive/password-repeat';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PasswordRepeatDirective],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [PasswordRepeatDirective],
})
export class SharedModule {}
