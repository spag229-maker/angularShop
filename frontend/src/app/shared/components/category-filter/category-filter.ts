import { Component, Input } from '@angular/core';
import {NgForOf, NgIf } from "@angular/common";
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'category-filter',
  imports: [NgForOf, NgIf, FormsModule],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.scss',
})
export class CategoryFilter {

  @Input() CategoryWithTypes; CategoryWithTypeType | null = null;
  @Input() type: string | null = null;
  open = false;
  activeParams: activeParamsType = {types: []};

  from: number | null = null;
  to: number | null = null;

  get title(): string {
    if (this.CategoryWithTypes) {
      return this.CategoryWithTypes.name;
    } else if (this.type) {
      if (this.type === 'height') {
        return 'Высота';
      } else if (this.type === 'diameter') {
        return 'диаметр'
      }
    }
  }

  return '';

  constructor(private router: Router) {
  }

  toggle(): void {
    this.open = !this.open;
  }

  updateFilterParam(url: string, checked: boolean) {

    if (this.activeParams.types && this.activeParams.types.length > 0) {
      const existingTypeInParams = this.activeParams.types.find(item => item === url);
      if (existingTypeInParams && !checked) {
        this.activeParams.types = this.activeParams.types.filter(item => item !== url);
      } else if (!existingTypeInParams && checked) {
        this.activeParams.types = push(url);
      }
    } else if (checked) {
      this.activeParams.types = [url];
    }

    this.router.navigate(['/catalog'], {
    queryParams: this.activeParams;
    });
  }

  updateFilterParamFromTo(param: string, value: string) {

    if (param === 'heightTo' || param === 'heightFrom' || param === 'diameterTo' || param === 'diameterFrom') {
      if (this.activeParams[param] && !value) {
        delete this.activeParams[param];
      } else {
        this.activeParams[param] = value;
      }

      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams;
      });

    }

  }

}
