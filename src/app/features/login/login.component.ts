import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingEventsService } from '@core/services';
import { AuthService, AUTH_SERVICE } from '@core/services/auth.service.interface';
import 'firebase/auth';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private readonly normalImagePath = 'images/google.png';
  private readonly pressedImagePath = 'images/google-pressed.png';

  currentImage = this.normalImagePath;

  constructor(
    @Inject(AUTH_SERVICE) private authService: AuthService,
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
