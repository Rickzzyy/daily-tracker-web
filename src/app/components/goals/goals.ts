import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';
import { Badge } from 'primeng/badge';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { Goal } from '../../models/tracking.models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-goals',
  imports: [
    CommonModule,
    FormsModule,
    Card, 
    Button, 
    ProgressBar, 
    Badge, 
    Dialog,
    InputText,
    Textarea,
    Select,
    DatePicker,
    InputNumber
  ],
  templateUrl: './goals.html',
  styleUrl: './goals.css'
})
export class GoalsComponent implements OnInit {
  goals: Goal[] = [];
  showAddDialog = false;
  newGoal: Partial<Goal> = {};
  
  categoryOptions = [
    { label: 'Health & Fitness', value: 'health' },
    { label: 'Career & Professional', value: 'career' },
    { label: 'Learning & Education', value: 'learning' },
    { label: 'Personal Development', value: 'personal' },
    { label: 'Financial', value: 'financial' },
    { label: 'Relationships', value: 'relationships' },
    { label: 'Hobbies & Interests', value: 'hobbies' }
  ];

  statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
    { label: 'Paused', value: 'paused' },
    { label: 'Cancelled', value: 'cancelled' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadGoals();
  }

  loadGoals() {
    // Enhanced mock data for demonstration
    this.goals = [
      {
        id: 1,
        title: 'Complete Angular Certification',
        description: 'Finish the Angular 18 certification course and pass the exam to advance my frontend development skills.',
        category: 'learning',
        targetDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        progress: 75,
        status: 'active',
        createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1))
      },
      {
        id: 2,
        title: 'Build Personal Portfolio Website',
        description: 'Create a professional portfolio showcasing my projects and skills using modern web technologies.',
        category: 'career',
        targetDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        progress: 45,
        status: 'active',
        createdAt: new Date(new Date().setDate(new Date().getDate() - 20))
      },
      {
        id: 3,
        title: 'Exercise 4 Times Per Week',
        description: 'Establish a consistent workout routine to improve physical health and energy levels.',
        category: 'health',
        targetDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        progress: 60,
        status: 'active',
        createdAt: new Date(new Date().setDate(new Date().getDate() - 15))
      },
      {
        id: 4,
        title: 'Read 12 Books This Year',
        description: 'Develop a reading habit by finishing one book per month across various genres.',
        category: 'personal',
        targetDate: new Date(new Date().setMonth(11, 31)), // End of year
        progress: 33,
        status: 'active',
        createdAt: new Date(new Date().setMonth(0, 1)) // Start of year
      },
      {
        id: 5,
        title: 'Learn Spanish Basics',
        description: 'Complete beginner Spanish course and be able to have basic conversations.',
        category: 'learning',
        targetDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
        progress: 20,
        status: 'active',
        createdAt: new Date(new Date().setDate(new Date().getDate() - 30))
      },
      {
        id: 6,
        title: 'Launch Side Project',
        description: 'Successfully launch and promote my mobile app idea with at least 100 users.',
        category: 'career',
        targetDate: new Date(new Date().setMonth(new Date().getMonth() + 4)),
        progress: 100,
        status: 'completed',
        createdAt: new Date(new Date().setMonth(new Date().getMonth() - 2))
      }
    ];
  }

  showAddGoalDialog() {
    this.newGoal = {
      category: 'personal',
      status: 'active',
      progress: 0,
      targetDate: new Date(new Date().setMonth(new Date().getMonth() + 3))
    };
    this.showAddDialog = true;
  }

  saveGoal() {
    if (this.newGoal.title && this.newGoal.description) {
      const goal: Goal = {
        ...this.newGoal,
        id: Date.now(),
        createdAt: new Date()
      } as Goal;
      
      // In real implementation: this.apiService.createGoal(goal).subscribe()
      this.goals.unshift(goal);
      this.showAddDialog = false;
    }
  }

  updateGoalProgress(goal: Goal, change: number) {
    goal.progress = Math.max(0, Math.min(100, goal.progress + change));
    goal.updatedAt = new Date();
    
    if (goal.progress === 100 && goal.status === 'active') {
      goal.status = 'completed';
    } else if (goal.progress < 100 && goal.status === 'completed') {
      goal.status = 'active';
    }
  }

  getCategoryBadgeClass(category: string): string {
    switch (category) {
      case 'health': return 'p-badge-success';
      case 'career': return 'p-badge-primary';
      case 'learning': return 'p-badge-info';
      case 'personal': return 'p-badge-warning';
      case 'financial': return 'p-badge-danger';
      case 'relationships': return 'p-badge-secondary';
      case 'hobbies': return 'p-badge-info';
      default: return 'p-badge-secondary';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active': return 'p-badge-primary';
      case 'completed': return 'p-badge-success';
      case 'paused': return 'p-badge-warning';
      case 'cancelled': return 'p-badge-danger';
      default: return 'p-badge-secondary';
    }
  }

  getDaysRemaining(targetDate: Date): number {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  deleteGoal(goalId: number) {
    this.goals = this.goals.filter(goal => goal.id !== goalId);
  }

  get activeGoalsCount(): number {
    return this.goals.filter(goal => goal.status === 'active').length;
  }

  get completedGoalsCount(): number {
    return this.goals.filter(goal => goal.status === 'completed').length;
  }

  get averageProgress(): number {
    const activeGoals = this.goals.filter(goal => goal.status === 'active');
    if (activeGoals.length === 0) return 0;
    
    const totalProgress = activeGoals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(totalProgress / activeGoals.length);
  }
}
