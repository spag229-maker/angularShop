import { Component } from '@angular/core';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { debounceTime } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';
import { CategoryWithTypeType } from '../../../../types/category-with-type.type';
import { CategoryFilter } from '../../../shared/components/category-filter/category-filter';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveParamsUtil } from '../../../shared/utils/active-params.util';
import { ActiveParamsType } from '../../../../types/active-params.type';
import { ProductType } from '../../../../types/product.type';
import { AppliedFilterType } from '../../../../types/applied-filter.type';
import { Product } from '../../../shared/services/product';
import { Category } from '../../../shared/services/category';

@Component({
  selector: 'app-catalog',
  imports: [ProductCard, NgForOf, NgIf, CategoryFilter],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  products: ProductType[] = [];
  categoriesWithTypes: CategoryWithTypeType[] = [];
  activeParams: ActiveParamsType = { types: [] };
  appliedFilter: AppliedFilterType[] = [];
  sortingOpen = false;
  sortingOptions : {name: string, value: string}[]=[
    {name: 'От А до Я', value: 'az-asc'},
    {name: 'От Я до А', value: 'az-desc'},
    {name: 'По возрастанию цены', value: 'price-asc'},
    {name: 'По убыванию цены', value: 'price-desc'},
  ];
  pages: number [] = [];

  constructor(
    private productService: Product,
    private categoryService: Category,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.categoryService.getCategoriesWithTypes().subscribe((data) => {
      this.categoriesWithTypes = data;

      this.activatedRoute.queryParams
        .pipe(
          debounceTime(500),
        )
        .subscribe(params => {
        this.activeParams = ActiveParamsUtil.processParams(params);

        this.appliedFilter = [];
        this.activeParams.types.forEach((url) => {
          for (let i = 0; i < this.categoriesWithTypes.length; i++) {
            const foundType = this.categoriesWithTypes[i].types.find((type) => type.url === url);
            if (foundType) {
              this.appliedFilter.push({
                name: foundType.name,
                urlParam: foundType.url,
              });
            }
          }
        });

        if (this.activeParams.heightFrom) {
          this.appliedFilter.push({
            name: 'Высота от' + this.activeParams.heightFrom + 'см',
            urlParam: 'heightFrom',
          });
        }
        if (this.activeParams.heightTo) {
          this.appliedFilter.push({
            name: 'Высота до' + this.activeParams.heightTo + 'см',
            urlParam: 'heightTo',
          });
        }

        if (this.activeParams.diameterFrom) {
          this.appliedFilter.push({
            name: 'Диаметр от' + this.activeParams.diameterFrom + 'см',
            urlParam: 'diameterFrom',
          });
        }
        if (this.activeParams.diameterTo) {
          this.appliedFilter.push({
            name: 'Диаметр до' + this.activeParams.diameterTo + 'см',
            urlParam: 'diameterTo',
          });
        }
        this.productService.getProducts(this.activeParams).subscribe((data) => {
          this.pages = [];
          for (let i = 1; i <= data.pages; i++) {
            this.pages.push(i);
          }
          this.products = data.items;
        });
      });
    });


  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    if (
      appliedFilter.urlParam === 'heightFrom' ||
      appliedFilter.urlParam === 'heightTo' ||
      appliedFilter.urlParam === 'diameterFrom' ||
      appliedFilter.urlParam === 'diameterTo'
    ) {
      delete (this.activeParams as any)[appliedFilter.urlParam];
    } else {
      this.activeParams.types = this.activeParams.types.filter(
        (item) => item !== appliedFilter.urlParam,
      );
    }


    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams,
    });
  }

  toggleSorting() {
    this.sortingOpen = !this.sortingOpen;
  }

  sort(value: string) {
    this.activeParams.sort = value;

    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams,
    });
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams,
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams,
      });
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams,
      });
    }
  }

}
