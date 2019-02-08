import { Component } from '@angular/core';
import { GlobalMembersService } from './shared/services/global-members.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: GlobalMembersService) { }
  title = 'app';
  
  getMasterLayoutVal() {
    return this.authService.getMasterLayoutVisiblity();//this.authService.authUser();
  }
}
