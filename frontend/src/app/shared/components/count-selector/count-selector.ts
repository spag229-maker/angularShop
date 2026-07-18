import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'count-selector',
  imports: [FormsModule],
  templateUrl: './count-selector.html',
  styleUrl: './count-selector.scss',
})
export class CountSelector {
  @Input() count: number = 1;

  @Output() onCountChange = new EventEmitter<number>();

  countChange(value: number) {
    this.onCountChange.emit(this.count);
  }

  decreaseCount() {
    if (this.count > 1) {
      this.count--;
      this.countChange();
    }
  }

  increaseCount() {
    this.count++;
    this.countChange();
  }
}
