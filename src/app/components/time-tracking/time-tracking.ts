import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Badge } from 'primeng/badge';
import { TimeEntry } from '../../models/tracking.models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-time-tracking',
  imports: [
    CommonModule, 
    FormsModule, 
    Card, 
    Button, 
    Dialog, 
    InputText, 
    Select, 
    Badge
  ],
  templateUrl: './time-tracking.html',
  styleUrl: './time-tracking.css'
})
export class TimeTrackingComponent implements OnInit {
  timeEntries: TimeEntry[] = [];
  showAddDialog = false;
  newEntry: Partial<TimeEntry> = {};
  isActiveTimer = false;
  activeEntry: TimeEntry | null = null;
  
  categoryOptions = [
    { label: 'Work', value: 'work' },
    { label: 'Learning', value: 'learning' },
    { label: 'Exercise', value: 'exercise' },
    { label: 'Personal', value: 'personal' },
    { label: 'Other', value: 'other' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTimeEntries();
  }

  loadTimeEntries() {
    // Mock data for demonstration
    this.timeEntries = [
      {
        id: 1,
        activity: 'Morning Workout',
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
        duration: 60,
        category: 'exercise',
        description: 'Cardio and strength training'
      },
      {
        id: 2,
        activity: 'Project Development',
        startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
        duration: 90,
        category: 'work',
        description: 'Frontend development tasks'
      },
      {
        id: 3,
        activity: 'Reading',
        startTime: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
        duration: 30,
        category: 'learning',
        description: 'Technical documentation review'
      }
    ];
  }

  showAddEntryDialog() {
    this.newEntry = {
      startTime: new Date(),
      category: 'work'
    };
    this.showAddDialog = true;
  }

  saveEntry() {
    if (this.newEntry.activity && this.newEntry.startTime) {
      const entry: TimeEntry = {
        ...this.newEntry,
        duration: this.calculateDuration(this.newEntry.startTime!, this.newEntry.endTime)
      } as TimeEntry;
      
      // In real implementation: this.apiService.createTimeEntry(entry).subscribe()
      this.timeEntries.unshift({ ...entry, id: Date.now() });
      this.showAddDialog = false;
    }
  }

  startTimer(activity: string, category: string) {
    this.activeEntry = {
      id: Date.now(),
      activity,
      startTime: new Date(),
      category,
      description: ''
    };
    this.isActiveTimer = true;
  }

  stopTimer() {
    if (this.activeEntry) {
      this.activeEntry.endTime = new Date();
      this.activeEntry.duration = this.calculateDuration(this.activeEntry.startTime, this.activeEntry.endTime);
      this.timeEntries.unshift({ ...this.activeEntry });
      this.activeEntry = null;
      this.isActiveTimer = false;
    }
  }

  calculateDuration(start: Date, end?: Date): number {
    if (!end) return 0;
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60)); // minutes
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }

  getCategoryBadgeClass(category: string): string {
    switch (category) {
      case 'work': return 'p-badge-primary';
      case 'learning': return 'p-badge-success';
      case 'exercise': return 'p-badge-warning';
      case 'personal': return 'p-badge-info';
      default: return 'p-badge-secondary';
    }
  }

  getTotalTimeToday(): number {
    return this.timeEntries
      .filter(entry => this.isToday(entry.startTime))
      .reduce((total, entry) => total + (entry.duration || 0), 0);
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }
}
