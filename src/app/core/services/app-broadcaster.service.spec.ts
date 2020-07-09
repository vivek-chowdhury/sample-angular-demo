import { TestBed } from '@angular/core/testing';

import { AppBroadcasterService } from './app-broadcaster.service';

describe('AppBroadcasterService', () => {
  let service: AppBroadcasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppBroadcasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
