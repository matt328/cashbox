import { Component } from '@angular/core';
import { SidenavService } from '@core/services';

@Component({
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(public sidenavService: SidenavService) {}
}
