import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ClientBudget } from '../../store/budgets/interfaces';

@Component({
  selector: 'cbx-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthSelectorComponent {
  @Input() availableMonths: Partial<ClientBudget>[] = [];
  @Input() selectedMonth: ClientBudget | undefined;

  @Output() monthSelected = new EventEmitter<string>();
  @Output() createNew = new EventEmitter<void>();

  nextMonth(): void {
    if (!this.availableMonths) {
      log.warn('No Months available');
      return;
    }
    const currPosition = this.availableMonths.findIndex((value) => value.id === this.selectedMonth?.id);
    let newMonth;
    if (currPosition === this.availableMonths.length - 1) {
      newMonth = this.availableMonths[0];
    } else {
      newMonth = this.availableMonths[currPosition + 1];
    }
    this.monthSelected.emit(newMonth.id);
  }

  previousMonth(): void {
    if (!this.availableMonths) {
      log.warn('No Months Available');
      return;
    }
    const currPosition = this.availableMonths.findIndex((value) => value.id === this.selectedMonth?.id);
    let newMonth;
    if (currPosition < 1) {
      newMonth = this.availableMonths[this.availableMonths.length - 1];
    } else {
      newMonth = this.availableMonths[currPosition - 1];
    }
    this.monthSelected.emit(newMonth.id);
  }

  selectionChange(event: MatSelectChange): void {
    this.monthSelected.emit(event.value);
  }
}
