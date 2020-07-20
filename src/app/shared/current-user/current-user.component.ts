import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cbx-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent {
  @Input() imageSource: string | undefined = '';
  @Input() userName: string | undefined = '';
  @Input() email: string | undefined = '';
  @Output() menuItemSelected = new EventEmitter<'ITEM1' | 'PREFERENCES' | 'SIGN_OUT'>();
}
