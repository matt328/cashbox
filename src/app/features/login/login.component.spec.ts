import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FirebaseAuthService, LoadingEventsService } from '@core/services';
import { Mock } from 'ts-mocks';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let loadingEventsService: Mock<LoadingEventsService>;
  let router: Mock<Router>;
  let loginService: Mock<FirebaseAuthService>;

  describe('when login success', () => {
    beforeEach(() => {
      loginService = new Mock<FirebaseAuthService>({
        signInWithPopup: () => Promise.resolve(true),
      });

      loadingEventsService = new Mock<LoadingEventsService>({
        triggerAppReady: () => {},
      });

      router = new Mock<Router>({
        navigate: (commands: string[]) => Promise.resolve(true),
      });

      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [
          { provide: LoadingEventsService, useValue: loadingEventsService.Object },
          { provide: Router, useValue: router.Object },
          { provide: FirebaseAuthService, useValue: loginService.Object },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      });

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('login should navigate to the default route', async () => {
      await component.login();
      expect(router.Object.navigate).toHaveBeenCalledWith(['']);
    });

    it('should handle currentImage state', () => {
      component.down();
      expect(component.currentImage).toEqual('images/google-pressed.png');
      component.up();
      expect(component.currentImage).toEqual('images/google.png');
    });
  });

  describe('when login failure', () => {
    beforeEach(() => {
      loginService = new Mock<FirebaseAuthService>({
        signInWithPopup: () => Promise.resolve(false),
      });

      loadingEventsService = new Mock<LoadingEventsService>({
        triggerAppReady: () => {},
      });

      router = new Mock<Router>({
        navigate: (commands: string[]) => Promise.resolve(true),
      });

      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [
          { provide: LoadingEventsService, useValue: loadingEventsService.Object },
          { provide: Router, useValue: router.Object },
          { provide: FirebaseAuthService, useValue: loginService.Object },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      });

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not navigate anywhere', async () => {
      await component.login();
      expect(router.Object.navigate).not.toHaveBeenCalled();
    });
  });
});
