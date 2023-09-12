import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  // @ts-ignore
  let test:AuthService = inject(AuthService);
  if (test.isUserLoggedIn()) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/accesDenied']);
    return false;
  }
};
