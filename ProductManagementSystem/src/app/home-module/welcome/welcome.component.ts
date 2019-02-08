import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalMembersService } from '../../shared/services/global-members.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private authService: GlobalMembersService) { }
  ngOnInit() {
    if(this.authService.authUser()){
      this.router.navigate(['']);
    }
  }
}
