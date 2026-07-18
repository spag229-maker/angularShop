import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';
import { CategoryType } from '../../../types/categoty.type';
import { CategoryWithTypeType } from '../../../types/category-with-type.type';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './layout.html',
})
export class Layout {
  categories: CategoryWithTypeType[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategoriesWithTypes()
      .subscribe((categories: CategoryWithTypeType[]) => {
      this.categories = categories.map(item => {
        return Onject.assign({typesUrl: item.map(item => item.url)}, item);
      });
    });
  }
}
