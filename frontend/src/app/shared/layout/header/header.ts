import { Component } from '@angular/core';
import { CategoryType } from '../../../../types/categoty.type';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  @Input() categories: CategoryType[] = [];


  ngOnInit() {
  }

}
