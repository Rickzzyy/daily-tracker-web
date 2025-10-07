import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Drawer } from 'primeng/drawer';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  imports: [Drawer, PanelMenuModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() visible = false;
  @Output() onHide = new EventEmitter<void>();

  currentRoute = '';
  menuItems: MenuItem[] = [
    {
      label: 'Overview',
      icon: 'pi pi-chart-line',
      expanded: true,
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          routerLink: ['/dashboard'],
          command: () => this.onMenuItemClick(['/dashboard'])
        }
      ]
    },
    {
      label: 'Tracking',
      icon: 'pi pi-list',
      expanded: true,
      items: [
        {
          label: 'Tasks',
          icon: 'pi pi-check-square',
          routerLink: ['/tasks'],
          command: () => this.onMenuItemClick(['/tasks'])
        },
        {
          label: 'Habits',
          icon: 'pi pi-calendar',
          routerLink: ['/habits'],
          command: () => this.onMenuItemClick(['/habits'])
        },
        {
          label: 'Time Tracking',
          icon: 'pi pi-clock',
          routerLink: ['/time-tracking'],
          command: () => this.onMenuItemClick(['/time-tracking'])
        }
      ]
    },
    {
      label: 'Planning',
      icon: 'pi pi-bookmark',
      expanded: true,
      items: [
        {
          label: 'Notes',
          icon: 'pi pi-file-edit',
          routerLink: ['/notes'],
          command: () => this.onMenuItemClick(['/notes'])
        },
        {
          label: 'Goals',
          icon: 'pi pi-flag',
          routerLink: ['/goals'],
          command: () => this.onMenuItemClick(['/goals'])
        }
      ]
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Set initial route
    this.currentRoute = this.router.url;
    
    // Listen for route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        this.updateMenuItemStyles();
      });
    
    // Initial style update
    this.updateMenuItemStyles();
  }

  onSidebarHide() {
    this.onHide.emit();
  }

  onMenuItemClick(routerLink: string[]) {
    this.router.navigate(routerLink);
    this.onSidebarHide();
  }

  trackByLabel(index: number, item: MenuItem): string {
    return item.label || '';
  }

  isActive(routerLink: string[]): boolean {
    return this.currentRoute === routerLink[0];
  }

  private updateMenuItemStyles() {
    this.menuItems = this.menuItems.map(group => ({
      ...group,
      items: group.items?.map(item => ({
        ...item,
        styleClass: this.isActive(item.routerLink as string[]) ? 'active-menu-item' : ''
      }))
    }));
  }
}