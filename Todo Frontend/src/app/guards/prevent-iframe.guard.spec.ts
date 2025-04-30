import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { preventIframeGuard } from './prevent-iframe.guard';

describe('preventIframeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => preventIframeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
