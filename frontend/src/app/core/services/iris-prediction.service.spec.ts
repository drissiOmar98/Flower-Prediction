import { TestBed } from '@angular/core/testing';

import { IrisPredictionService } from './iris-prediction.service';

describe('IrisPredictionService', () => {
  let service: IrisPredictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrisPredictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
