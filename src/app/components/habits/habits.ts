import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';
import { Badge } from 'primeng/badge';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { Habit, HabitEntry } from '../../models/tracking.models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-habits',
  imports: [
    CommonModule, 
    FormsModule, 
    Card, 
    Button, 
    ProgressBar, 
    Badge, 
    Dialog, 
    InputText, 
    InputNumber
  ],
  templateUrl: './habits.html',
  styleUrl: './habits.css'
})
export class HabitsComponent implements OnInit {
  habits: Habit[] = [];
  habitEntries: HabitEntry[] = [];
  showAddDialog = false;
  newHabit: Partial<Habit> = {};
  
  frequencyOptions = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadHabits();
    this.loadHabitEntries();
  }

  loadHabits() {
    // Mock data for demonstration
    this.habits = [
      {
        id: 1,
        name: 'Morning Exercise',
        description: 'Start the day with 30 minutes of physical activity',
        frequency: 'daily',
        target: 1,
        unit: 'session',
        color: '#4CAF50',
        createdAt: new Date()
      },
      {
        id: 2,
        name: 'Read Books',
        description: 'Read for personal development',
        frequency: 'daily',
        target: 30,
        unit: 'minutes',
        color: '#2196F3',
        createdAt: new Date()
      },
      {
        id: 3,
        name: 'Drink Water',
        description: 'Stay hydrated throughout the day',
        frequency: 'daily',
        target: 8,
        unit: 'glasses',
        color: '#00BCD4',
        createdAt: new Date()
      },
      {
        id: 4,
        name: 'Meditation',
        description: 'Daily mindfulness practice',
        frequency: 'daily',
        target: 15,
        unit: 'minutes',
        color: '#9C27B0',
        createdAt: new Date()
      }
    ];
  }

  loadHabitEntries() {
    // Mock data for today's entries
    this.habitEntries = [
      { id: 1, habitId: 1, date: new Date(), value: 1 },
      { id: 2, habitId: 2, date: new Date(), value: 25 },
      { id: 3, habitId: 3, date: new Date(), value: 6 },
      { id: 4, habitId: 4, date: new Date(), value: 15 }
    ];
  }

  getHabitProgress(habit: Habit): number {
    const entry = this.habitEntries.find(e => e.habitId === habit.id);
    const current = entry?.value || 0;
    return Math.min((current / habit.target) * 100, 100);
  }

  getHabitStatus(habit: Habit): 'completed' | 'in-progress' | 'not-started' {
    const progress = this.getHabitProgress(habit);
    if (progress >= 100) return 'completed';
    if (progress > 0) return 'in-progress';
    return 'not-started';
  }

  showAddHabitDialog() {
    this.newHabit = {
      frequency: 'daily',
      target: 1,
      unit: 'time',
      color: '#4CAF50'
    };
    this.showAddDialog = true;
  }

  saveHabit() {
    if (this.newHabit.name && this.newHabit.target) {
      const habit: Habit = {
        ...this.newHabit,
        createdAt: new Date()
      } as Habit;
      
      // In real implementation: this.apiService.createHabit(habit).subscribe()
      this.habits.push({ ...habit, id: Date.now() });
      this.showAddDialog = false;
    }
  }

  updateHabitValue(habit: Habit, increment: number) {
    let entry = this.habitEntries.find(e => e.habitId === habit.id);
    
    if (!entry) {
      entry = {
        id: Date.now(),
        habitId: habit.id!,
        date: new Date(),
        value: 0
      };
      this.habitEntries.push(entry);
    }
    
    entry.value = Math.max(0, Math.min(habit.target, entry.value + increment));
  }

  trackByHabitId(index: number, habit: Habit): number {
    return habit.id || index;
  }

  getHabitEntryValue(habitId: number | undefined): number {
    if (!habitId) return 0;
    const entry = this.habitEntries.find(e => e.habitId === habitId);
    return entry?.value || 0;
  }

  isDecrementDisabled(habitId: number | undefined): boolean {
    return this.getHabitEntryValue(habitId) <= 0;
  }

  isIncrementDisabled(habit: Habit): boolean {
    return this.getHabitEntryValue(habit.id) >= habit.target;
  }
}
