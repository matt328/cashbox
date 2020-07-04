import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService, LoadingEventsService } from '@core/services';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private readonly normalImagePath = 'images/google.png';
  private readonly pressedImagePath = 'images/google-pressed.png';

  currentImage = this.normalImagePath;

  constructor(
    private authService: FirebaseAuthService,
    private loadingEventsService: LoadingEventsService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadingEventsService.triggerAppReady();
  }

  async login(): Promise<void> {
    if (await this.authService.signInWithPopup()) {
      this.ngZone.run(() => this.router.navigate(['']));
    } else {
      log.warn('Login failed');
    }
  }

  down(): void {
    this.currentImage = this.pressedImagePath;
  }

  up(): void {
    this.currentImage = this.normalImagePath;
  }
}
