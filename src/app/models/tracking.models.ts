// Core tracking models for the daily tracker application

export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Habit {
  id?: number;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  target: number;
  unit: string;
  color?: string;
  createdAt: Date;
}

export interface HabitEntry {
  id?: number;
  habitId: number;
  date: Date;
  value: number;
  notes?: string;
}

export interface TimeEntry {
  id?: number;
  activity: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  category: string;
  description?: string;
}

export interface Note {
  id?: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface Goal {
  id?: number;
  title: string;
  description: string;
  category: string;
  targetDate: Date;
  progress: number; // 0-100
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  createdAt: Date;
  updatedAt?: Date;
}

export interface DashboardStats {
  tasksCompleted: number;
  totalTasks: number;
  habitsCompleted: number;
  totalHabits: number;
  timeTracked: number; // in minutes
  activeGoals: number;
}