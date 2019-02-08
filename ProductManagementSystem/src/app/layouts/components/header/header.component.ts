import { Component, OnInit,Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/components/common/menuitem';
import { GlobalMembersService } from '../../../shared/services/global-members.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private globalMembers: GlobalMembersService) { }

  username: string;
  items: MenuItem[];
  items1: MenuItem[];
  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.items = [
      { label: 'Logout', icon: 'fa-power-off', command: (event: Event) => { this.onLogout(); }}
    ];

    this.items1=[
      { label: 'Logout', icon: 'fa-power-off', command: (event: Event) => { this.onLogout(); }}
    ];
  }

  onLogout() {
    this.globalMembers.setMasterLayoutVisiblity(false);
    this.router.navigate(['/login']);
    localStorage.removeItem('username');
    localStorage.removeItem('userrole');
  }
}
