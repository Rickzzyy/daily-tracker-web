import { Component, OnInit } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Badge } from 'primeng/badge';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/tracking.models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tasks',
  imports: [Card, Button, Checkbox, Badge, FormsModule, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    // Mock data for demonstration
    this.tasks = [
      {
        id: 1,
        title: 'Review daily tracking features',
        description: 'Ensure all components work correctly',
        completed: false,
        priority: 'high',
        createdAt: new Date(),
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // tomorrow
      },
      {
        id: 2,
        title: 'Update documentation',
        description: 'Add setup instructions to README',
        completed: true,
        priority: 'medium',
        createdAt: new Date(),
        dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000) // day after tomorrow
      },
      {
        id: 3,
        title: 'Test API integration',
        description: 'Connect frontend to backend services',
        completed: false,
        priority: 'high',
        createdAt: new Date()
      }
    ];
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
    task.updatedAt = new Date();
    // In real implementation: this.apiService.updateTask(task.id!, task).subscribe()
  }

  getPriorityBadgeClass(priority: string): string {
    switch (priority) {
      case 'high': return 'p-badge-danger';
      case 'medium': return 'p-badge-warning';
      case 'low': return 'p-badge-info';
      default: return 'p-badge-secondary';
    }
  }

  get completedTasksCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get totalTasksCount(): number {
    return this.tasks.length;
  }
}