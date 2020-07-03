import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MockTask } from './../../../mock/mock-service/mock-task-list.service';
import { TaskService } from './../../../core/services/task-service.service';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxComponent } from './dialog-box.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatInputModule } from '@angular/material/input';

const data = {
  description: 'Demo desription',
  shortDescription: 'Demo short description',
  priority: '1',
  status: 'notstarted',
};
describe('DialogBoxComponent', () => {
  let component: DialogBoxComponent;
  let fixture: ComponentFixture<DialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogBoxComponent],
      imports: [
        BrowserAnimationsModule,
        MatSelectModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatCardModule,
        MatButtonModule,
      ],
      providers: [
        TaskService,
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: { close: () => {} } },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('description field should be valid', () => {
    const description = component.taskGroup.controls.description;
    expect(description.valid).toBeFalsy();
  });

  it('short description field should be valid', () => {
    const description = component.taskGroup.controls.shortDescription;
    expect(description.valid).toBeFalsy();
  });

  it('priorty field should be valid', () => {
    const description = component.taskGroup.controls.priority;
    expect(description.valid).toBeFalsy();
  });

  it('status field should be valid', () => {
    const description = component.taskGroup.controls.status;
    expect(description.valid).toBeFalsy();
  });
});
