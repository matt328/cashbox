import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cbx-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss'],
})
export class InlineEditComponent {
  @Input() value?: number;
  @Output() valueChanged = new EventEmitter<number>();

  editMode = false;

  changeValue(): void {
    this.valueChanged.emit(this.value);
  }

  handleEnter(event: Event): void {
    (event.target as HTMLInputElement).blur();
  }
}
