import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalMembersService } from '../../shared/services/global-members.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private router: Router, private authService: GlobalMembersService) { }
  ngOnInit() {
    if(this.authService.authUser()){
      this.router.navigate(['']);
    }
  }
}
