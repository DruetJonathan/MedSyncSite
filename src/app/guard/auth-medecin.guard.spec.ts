import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authMedecinGuard } from './auth-medecin.guard';

describe('authMedecinGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authMedecinGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
