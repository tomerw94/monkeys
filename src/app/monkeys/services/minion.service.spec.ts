/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MinionService } from './minion.service';

describe('Service: Minion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MinionService]
    });
  });

  it('should ...', inject([MinionService], (service: MinionService) => {
    expect(service).toBeTruthy();
  }));
});
