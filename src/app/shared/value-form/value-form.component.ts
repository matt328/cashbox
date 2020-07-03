import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cbx-value-form',
  templateUrl: './value-form.component.html',
  styleUrls: ['./value-form.component.scss'],
})
export class ValueFormComponent {
  @Input() name = '';
  @Output() valueCreated = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  valueForm: FormGroup = this.fb.group({
    value: '',
  });

  constructor(public fb: FormBuilder) {}

  onSubmit(): void {
    const value = this.prepareSaveValue();
    this.valueCreated.emit(value);
  }

  onCancel(): void {}

  private prepareSaveValue(): string {
    const formModel = this.valueForm.value;
    return formModel.value as string;
  }
}
