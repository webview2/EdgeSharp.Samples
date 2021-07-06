import { TestBed } from '@angular/core/testing';

import { ActionClientService } from './action.controller.client.service';

describe('ActionClientService', () => {
  let service: ActionClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
