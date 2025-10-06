import { Component, OnInit } from '@angular/core';
import { Card } from 'primeng/card';
import { ProgressBar } from 'primeng/progressbar';
import { UIChart } from 'primeng/chart';
import { ApiService } from '../../services/api.service';
import { DashboardStats } from '../../models/tracking.models';

@Component({
  selector: 'app-dashboard',
  imports: [Card, ProgressBar, UIChart],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    tasksCompleted: 0,
    totalTasks: 0,
    habitsCompleted: 0,
    totalHabits: 0,
    timeTracked: 0,
    activeGoals: 0
  };

  chartData: any;
  chartOptions: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadDashboardStats();
    this.initChart();
  }

  loadDashboardStats() {
    // For now, we'll use mock data since the API might not be available
    // In a real implementation, uncomment the line below:
    // this.apiService.getDashboardStats().subscribe(stats => this.stats = stats);
    
    // Mock data for demonstration
    this.stats = {
      tasksCompleted: 8,
      totalTasks: 12,
      habitsCompleted: 5,
      totalHabits: 7,
      timeTracked: 240, // 4 hours in minutes
      activeGoals: 3
    };
  }

  initChart() {
    this.chartData = {
      labels: ['Tasks', 'Habits', 'Time (hrs)', 'Goals'],
      datasets: [
        {
          label: 'Progress',
          data: [
            Math.round((this.stats.tasksCompleted / this.stats.totalTasks) * 100),
            Math.round((this.stats.habitsCompleted / this.stats.totalHabits) * 100),
            Math.round(this.stats.timeTracked / 60), // Convert to hours
            this.stats.activeGoals
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Daily Progress Overview'
        }
      }
    };
  }

  get taskProgress() {
    return this.stats.totalTasks > 0 ? Math.round((this.stats.tasksCompleted / this.stats.totalTasks) * 100) : 0;
  }

  get habitProgress() {
    return this.stats.totalHabits > 0 ? Math.round((this.stats.habitsCompleted / this.stats.totalHabits) * 100) : 0;
  }

  get timeTrackedHours() {
    return Math.round(this.stats.timeTracked / 60 * 10) / 10; // Round to 1 decimal place
  }
}