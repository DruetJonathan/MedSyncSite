import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authAdministratifGuard } from './auth-administratif.guard';

describe('authAdministratifGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authAdministratifGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
