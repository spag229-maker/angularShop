import { Component } from '@angular/core';
import { CategoryType } from '../../../../types/categoty.type';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  @Input() categories: CategoryType[] = [];
}
