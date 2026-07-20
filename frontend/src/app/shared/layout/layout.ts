import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';
import { CategoryWithTypeType } from '../../../types/category-with-type.type';
import { Category } from '../services/category';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './layout.html',
})
export class Layout {
  categories: CategoryWithTypeType[] = [];

  constructor(private categoryService: Category) {}

  ngOnInit() {
    this.categoryService.getCategoriesWithTypes()
      .subscribe((categories: CategoryWithTypeType[]) => {
      this.categories = categories.map(item => {
        return Object.assign({typesUrl: item.types.map(type => type.url)}, item);
      });
    });
  }
}
