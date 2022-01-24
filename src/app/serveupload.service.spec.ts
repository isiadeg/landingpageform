import { TestBed } from '@angular/core/testing';

import { ServeuploadService } from './serveupload.service';

describe('ServeuploadService', () => {
  let service: ServeuploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServeuploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
