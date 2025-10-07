import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { HabitsComponent } from './components/habits/habits';
import { TimeTrackingComponent } from './components/time-tracking/time-tracking';
import { NotesComponent } from './components/notes/notes';
import { GoalsComponent } from './components/goals/goals';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'habits', component: HabitsComponent },
  { path: 'time-tracking', component: TimeTrackingComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'goals', component: GoalsComponent },
  { path: '**', redirectTo: '/dashboard' }
];
