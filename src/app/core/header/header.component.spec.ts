import { SCREENTYPES } from './state/iheader.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockRouter } from './../../../mock/mock-service/mock-router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';

import { HeaderComponent } from './header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MockActivatedRoute } from 'src/mock/mock-service/mock-activated-route';
import { AppBroadcasterService } from '../services/app-broadcaster.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;
  let store: MockStore;
  const initialState = {
    screenType: SCREENTYPES.LOGIN_SCREEN,
    isUserLoggedIn: false,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        provideMockStore({ initialState }),
        AppBroadcasterService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    location = TestBed.get(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.headerState = initialState;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate user to home screen', () => {
    const router: MockRouter = TestBed.get(Router);
    const spy = spyOn(router, 'navigateByUrl');
    router.navigateByUrl('/home');
    const url = spy.calls.first().args[0];
    expect(url).toBe('/home');
  });

  it('should navigate user to about screen', () => {
    const router: MockRouter = TestBed.get(Router);
    const spy = spyOn(router, 'navigateByUrl');
    router.navigateByUrl('/about');
    const url = spy.calls.first().args[0];
    expect(url).toBe('/about');
  });
});
