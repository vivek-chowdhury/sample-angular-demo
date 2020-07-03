import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from './../../core/services/task-service.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatButtonModule, HttpClientTestingModule, MatDialogModule],
      providers: [TaskService],
    }).compileComponents();
  }));

  beforeEach(() => {
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
