import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Badge } from 'primeng/badge';
import { UIChart } from 'primeng/chart';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { DatePicker } from 'primeng/datepicker';
import { TimeEntry } from '../../models/tracking.models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-time-tracking',
  imports: [
    CommonModule, 
    FormsModule, 
    Card, 
    Button, 
    Badge,
    UIChart,
    Dialog,
    InputText,
    Select,
    Textarea,
    DatePicker
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
  
  // Chart data
  chartData: any;
  chartOptions: any;
  trendChartData: any;
  trendChartOptions: any;
  
  // Summary data
  weeklyEntries: TimeEntry[] = [];
  monthlyEntries: TimeEntry[] = [];
  
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
    this.initCharts();
  }

  loadTimeEntries() {
    // Enhanced mock data for demonstration spanning multiple days
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    this.timeEntries = [
      // Today's entries
      {
        id: 1,
        activity: 'Morning Workout',
        startTime: new Date(today.getTime() + 7 * 60 * 60 * 1000), // 7 AM
        endTime: new Date(today.getTime() + 8 * 60 * 60 * 1000), // 8 AM
        duration: 60,
        category: 'exercise',
        description: 'Cardio and strength training'
      },
      {
        id: 2,
        activity: 'Project Development',
        startTime: new Date(today.getTime() + 9 * 60 * 60 * 1000), // 9 AM
        endTime: new Date(today.getTime() + 11.5 * 60 * 60 * 1000), // 11:30 AM
        duration: 150,
        category: 'work',
        description: 'Frontend development tasks'
      },
      {
        id: 3,
        activity: 'Reading Technical Documentation',
        startTime: new Date(today.getTime() + 14 * 60 * 60 * 1000), // 2 PM
        endTime: new Date(today.getTime() + 14.5 * 60 * 60 * 1000), // 2:30 PM
        duration: 30,
        category: 'learning',
        description: 'Angular and PrimeNG documentation'
      },
      
      // Yesterday's entries
      {
        id: 4,
        activity: 'Team Meeting',
        startTime: new Date(today.getTime() - 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000), // Yesterday 10 AM
        endTime: new Date(today.getTime() - 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000), // Yesterday 11 AM
        duration: 60,
        category: 'work',
        description: 'Weekly team standup and planning'
      },
      {
        id: 5,
        activity: 'Yoga Session',
        startTime: new Date(today.getTime() - 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000), // Yesterday 6 PM
        endTime: new Date(today.getTime() - 24 * 60 * 60 * 1000 + 19 * 60 * 60 * 1000), // Yesterday 7 PM
        duration: 60,
        category: 'exercise',
        description: 'Evening relaxation yoga'
      },
      {
        id: 6,
        activity: 'Code Review',
        startTime: new Date(today.getTime() - 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000), // Yesterday 3 PM
        endTime: new Date(today.getTime() - 24 * 60 * 60 * 1000 + 16.5 * 60 * 60 * 1000), // Yesterday 4:30 PM
        duration: 90,
        category: 'work',
        description: 'Reviewing pull requests and providing feedback'
      },
      
      // This week's additional entries
      {
        id: 7,
        activity: 'Online Course',
        startTime: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000), // 2 days ago 8 PM
        endTime: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000 + 21.5 * 60 * 60 * 1000), // 2 days ago 9:30 PM
        duration: 90,
        category: 'learning',
        description: 'Advanced TypeScript patterns course'
      },
      {
        id: 8,
        activity: 'Personal Project',
        startTime: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000), // 3 days ago 2 PM
        endTime: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000), // 3 days ago 4 PM
        duration: 120,
        category: 'personal',
        description: 'Working on side project mobile app'
      },
      {
        id: 9,
        activity: 'Client Call',
        startTime: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000), // 4 days ago 11 AM
        endTime: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000), // 4 days ago 12 PM
        duration: 60,
        category: 'work',
        description: 'Requirements discussion with client'
      },
      {
        id: 10,
        activity: 'Meditation',
        startTime: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000), // 5 days ago 6 AM
        endTime: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000 + 6.5 * 60 * 60 * 1000), // 5 days ago 6:30 AM
        duration: 30,
        category: 'personal',
        description: 'Morning mindfulness practice'
      }
    ];
    
    // Sort by start time (most recent first)
    this.timeEntries.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  }

  showAddEntryDialog() {
    this.newEntry = {
      startTime: new Date(),
      endTime: new Date(),
      category: 'work'
    };
    this.showAddDialog = true;
  }

  saveEntry() {
    if (this.newEntry.activity && this.newEntry.startTime) {
      // Calculate duration if both start and end times are provided
      if (this.newEntry.endTime) {
        this.newEntry.duration = this.calculateDuration(this.newEntry.startTime!, this.newEntry.endTime);
      }
      
      const entry: TimeEntry = {
        ...this.newEntry,
        id: Date.now()
      } as TimeEntry;
      
      // In real implementation: this.apiService.createTimeEntry(entry).subscribe()
      this.timeEntries.unshift(entry);
      this.timeEntries.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
      this.showAddDialog = false;
      this.initCharts(); // Refresh charts with new data
    }
  }

  initCharts() {
    this.initCategoryChart();
    this.initTrendChart();
  }

  initCategoryChart() {
    const categoryTotals = this.getCategoryTotals();
    
    this.chartData = {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#3B82F6', // work - blue
          '#10B981', // learning - green
          '#F59E0B', // exercise - yellow
          '#8B5CF6', // personal - purple
          '#6B7280'  // other - gray
        ]
      }]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Time Distribution by Category'
        }
      }
    };
  }

  initTrendChart() {
    const last7Days = this.getLast7DaysData();
    
    this.trendChartData = {
      labels: last7Days.map(d => d.date),
      datasets: [{
        label: 'Daily Time (hours)',
        data: last7Days.map(d => d.hours),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }]
    };

    this.trendChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Hours'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Daily Time Tracking Trend'
        }
      }
    };
  }

  getCategoryTotals(): { [key: string]: number } {
    const totals: { [key: string]: number } = {};
    
    this.timeEntries.forEach(entry => {
      const category = entry.category;
      const hours = (entry.duration || 0) / 60;
      totals[category] = (totals[category] || 0) + hours;
    });
    
    return totals;
  }

  getLast7DaysData(): { date: string, hours: number }[] {
    const data: { date: string, hours: number }[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const dayEntries = this.timeEntries.filter(entry => 
        this.isSameDay(entry.startTime, date)
      );
      
      const totalMinutes = dayEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
      const hours = Math.round((totalMinutes / 60) * 10) / 10; // Round to 1 decimal
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        hours
      });
    }
    
    return data;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
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

  getTotalTimeThisWeek(): number {
    const weekStart = this.getWeekStart();
    return this.timeEntries
      .filter(entry => entry.startTime >= weekStart)
      .reduce((total, entry) => total + (entry.duration || 0), 0);
  }

  getTotalTimeThisMonth(): number {
    const monthStart = this.getMonthStart();
    return this.timeEntries
      .filter(entry => entry.startTime >= monthStart)
      .reduce((total, entry) => total + (entry.duration || 0), 0);
  }

  getWeekStart(): Date {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day;
    return new Date(now.setDate(diff));
  }

  getMonthStart(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  getAverageTimePerDay(): number {
    const last7Days = this.getLast7DaysData();
    const totalHours = last7Days.reduce((sum, day) => sum + day.hours, 0);
    return Math.round((totalHours / 7) * 10) / 10;
  }

  getMostProductiveCategory(): string {
    const categoryTotals = this.getCategoryTotals();
    const sortedCategories = Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a);
    
    return sortedCategories.length > 0 ? sortedCategories[0][0] : 'none';
  }

  deleteEntry(entryId: number) {
    this.timeEntries = this.timeEntries.filter(entry => entry.id !== entryId);
    this.initCharts(); // Refresh charts after deletion
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }
}
