import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  authUser(): boolean {
    if(localStorage.getItem('username') !== null) {
      return true;
    }
    return false;
  }
}
