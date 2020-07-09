import { SpinnerManagerService } from './../../../core/spinner/spinner-manager.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SCREENTYPES } from './../../../core/header/state/iheader.state';
import { AboutScreenComponent } from './about-screen.component';

describe('AboutScreenComponent', () => {
  let component: AboutScreenComponent;
  let fixture: ComponentFixture<AboutScreenComponent>;
  let store: MockStore;
  const initialState = {
    screenType: SCREENTYPES.ABOUT_SCREEN,
    isUserLoggedIn: true,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutScreenComponent],
      providers: [SpinnerManagerService, provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AboutScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
