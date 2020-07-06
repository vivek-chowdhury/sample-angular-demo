import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TestBed } from '@angular/core/testing';

import { SpinnerManagerService } from './spinner-manager.service';

describe('SpinnerManagerService', () => {
  let service: SpinnerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [MatDialog],
    });
    service = TestBed.inject(SpinnerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
