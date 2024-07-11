import { TestBed } from '@angular/core/testing';

import { PasswordRecordService } from './password-record.service';

describe('PasswordRecordService', () => {
  let service: PasswordRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
