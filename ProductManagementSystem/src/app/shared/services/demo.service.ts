import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalMembersService } from './global-members.service';
import { HttpInterceptorService } from './http-interceptor.service';

@Injectable()
export class DemoService {
  constructor(private httpInceptor: HttpInterceptorService, private globalMembers: GlobalMembersService) { }
  getUsers(): Observable<any> {
    return this.httpInceptor.get('./assets/config/users.json');
  }
}
