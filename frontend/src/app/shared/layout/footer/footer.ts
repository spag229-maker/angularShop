import { Component } from '@angular/core';
import { CategoryType } from '../../../../types/categoty.type';
import {RouterLink} from "@angular/router";
import { CategoryWithTypeType } from '../../../../types/category-with-type.type';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  @Input() categories: CategoryWithTypeType[] = [];
}
