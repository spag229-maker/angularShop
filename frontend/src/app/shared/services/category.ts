import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryType } from '../../../types/categoty.type';

@Service()
export class Category {
  constructor(private http: HttpClient) {

    getCategories(): Observable<CategoryType[]> {
      return this.http.get<CategoryType[]>(enviroment.api + 'categories');
    }
  }
}
