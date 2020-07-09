import { MatButtonModule } from '@angular/material/button';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppBroadcasterService } from './../../../core/services/app-broadcaster.service';
import { SpinnerManagerService } from './../../../core/spinner/spinner-manager.service';
import { TaskService } from '../../../core/services/task-service.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  const initialState = {
    tasks: [],
    selectedTask: null,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatButtonModule, HttpClientTestingModule, MatDialogModule],
      providers: [
        TaskService,
        SpinnerManagerService,
        AppBroadcasterService,
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog box', () => {
    const matDialog = TestBed.get(MatDialog);
    spyOn(matDialog, 'open').and.callFake(() => {
      return {
        afterClosed: () => of({}),
      };
    });
    component.openDialog();
    expect(matDialog.open).toHaveBeenCalled();
  });
});
