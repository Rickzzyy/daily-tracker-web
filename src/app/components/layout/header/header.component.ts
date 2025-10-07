import { Component, Output, EventEmitter } from '@angular/core';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [Button, Toolbar],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  appName = environment.appName;

  onMenuClick() {
    this.toggleSidebar.emit();
  }
}