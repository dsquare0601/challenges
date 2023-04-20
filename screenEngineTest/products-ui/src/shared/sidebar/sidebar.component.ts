import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  active = 'dashboard';

  links = [
    { title: 'Dashboard', fragment: '' },
    { title: 'Products', fragment: 'products' },
    { title: 'Transactions', fragment: 'transactions' },
  ];

  constructor(public route: ActivatedRoute) {}
}
