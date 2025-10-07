import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Drawer } from 'primeng/drawer';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  imports: [Drawer],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() visible = false;
  @Output() onHide = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: ['/dashboard']
    },
    {
      label: 'Tasks',
      icon: 'pi pi-check-square',
      routerLink: ['/tasks']
    },
    {
      label: 'Habits',
      icon: 'pi pi-calendar',
      routerLink: ['/habits']
    },
    {
      label: 'Time Tracking',
      icon: 'pi pi-clock',
      routerLink: ['/time-tracking']
    },
    {
      label: 'Notes',
      icon: 'pi pi-file-edit',
      routerLink: ['/notes']
    },
    {
      label: 'Goals',
      icon: 'pi pi-flag',
      routerLink: ['/goals']
    }
  ];

  constructor(private router: Router) {}

  onSidebarHide() {
    this.onHide.emit();
  }

  onMenuItemClick(item: MenuItem) {
    if (item.routerLink) {
      this.router.navigate(item.routerLink);
      this.onSidebarHide();
    }
  }
}