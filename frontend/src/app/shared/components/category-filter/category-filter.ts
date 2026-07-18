import { Component, Input } from '@angular/core';
import {NgForOf, NgIf } from "@angular/common";
import { ActivatedRoute, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActiveParamsUtil } from '../../utils/active-params.util';

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.activeParams = ActiveParamsUtil.processParams(params);

      if (this.type) {
        if (this.type === 'height') {
          this.open = !!(this.activeParams.heightFrom || this.activeParams.heightTo)
          this.from = this.activeParams.heightFrom ?  +this.activeParams.heightFrom : null;
          this.from = this.activeParams.heightTo ?  +this.activeParams.heightTo : null;
        } else  if (this.type === 'diameter') {
          this.open = !!(this.activeParams.diameterFrom || this.activeParams.diameterTo)
          this.from = this.activeParams.heighdiameterFromtFrom ?  +this.activeParams.diameterFrom : null;
          this.from = this.activeParams.diameterTo ?  +this.activeParams.diameterTo : null;
        }
      } else {
        if (params['types']) {
          this.activeParams.types = params.types['types'];
        }

        if (this.categoryWithTypes && this.categoryWithTypes.types
          && this.categoryWithTypes.types.length > 0 &&
          this.categoryWithTypes.types.some(type => this.activeParams.types.find(item => type.url === item))) {
          this.open = true;
        }
      }

    });
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
        // this.activeParams.types = push(url);
        this.activeParams.types = [...this.activeParams.types, url];
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
