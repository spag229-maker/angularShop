import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CategoryType } from '../../../types/categoty.type';
import { TypeType } from '../../../types/type.type';
import { CategoryWithTypeType } from '../../../types/category-with-type.type';
import { environments } from '../../../environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class Category {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryType[]> {
    return this.http.get<CategoryType[]>(environments.api + 'categories');
  }
  getCategoriesWithTypes(): Observable<CategoryWithTypeType[]> {
    return this.http
      .get<TypeType[]>(environments.api + 'types')
      .pipe(map((items: TypeType[]) => {
        const array: CategoryWithTypeType[] = [];

        items.forEach((item: TypeType) => {

          const foundItem = array.find(arrayItem =>
            arrayItem.url === item.category.url);

          if (foundItem) {
            foundItem.types.push({
              id: item.id,
              name: item.name,
              url: item.url,
            });
          } else {
            array.push({
              id: item.category.id,
              name: item.category.name,
              url: item.category.url,
              types: [
                {
                  id: item.id,
                  name: item.name,
                  url: item.url,
                }]
            });
          }
        });

        return array;
      }));
  }
}
