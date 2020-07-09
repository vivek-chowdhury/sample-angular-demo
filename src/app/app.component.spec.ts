import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppBroadcasterService } from './core/services/app-broadcaster.service';
import { SpinnerManagerService } from './core/spinner/spinner-manager.service';
import { TaskService } from './core/services/task-service.service';

describe('AppComponent', () => {
  let store: MockStore;
  const initialState = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        SpinnerManagerService,
        AppBroadcasterService,
        provideMockStore({ initialState }),
      ],
      imports: [MatDialogModule, RouterTestingModule],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    store = TestBed.inject(MockStore);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
