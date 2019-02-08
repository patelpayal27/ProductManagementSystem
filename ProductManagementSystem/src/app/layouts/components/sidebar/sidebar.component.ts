import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { GlobalMembersService } from '../../../shared/services/global-members.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
    constructor(private globalMembers: GlobalMembersService) { }
    items: MenuItem[];
    userRole: string;
    isAdmin:boolean = false;

    ngOnInit() {
        this.userRole = localStorage.getItem('userrole');
        //alert(this.userRole);
        if(this.userRole == "admin") { this.isAdmin = true; }
        else { this.isAdmin = false; }
        this.items = [
            {
                label: 'Home',
                icon: 'fa-home', 
                routerLink: ['../home']
            },
            {
                label: 'Products List',
                icon: 'fa-product-hunt',
                routerLink: ['../viewproduct'],
                visible: this.isAdmin
            },
            {
                label: 'About Us',
                icon: 'fa-users', 
                routerLink: ['../about']
            }
        ];
    }
}