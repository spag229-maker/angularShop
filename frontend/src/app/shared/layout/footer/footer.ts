import { Component, Input } from '@angular/core';
import { CategoryType } from '../../../../types/categoty.type';
import {RouterLink} from "@angular/router";
import { CategoryWithTypeType } from '../../../../types/category-with-type.type';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgForOf],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  @Input() categories: CategoryWithTypeType[] = [];
}
