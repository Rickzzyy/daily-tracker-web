import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task, Habit, HabitEntry, TimeEntry, Note, Goal, DashboardStats } from '../models/tracking.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Dashboard Stats
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`);
  }

  // Tasks API
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`);
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }

  // Habits API
  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${this.apiUrl}/habits`);
  }

  getHabit(id: number): Observable<Habit> {
    return this.http.get<Habit>(`${this.apiUrl}/habits/${id}`);
  }

  createHabit(habit: Omit<Habit, 'id'>): Observable<Habit> {
    return this.http.post<Habit>(`${this.apiUrl}/habits`, habit);
  }

  updateHabit(id: number, habit: Partial<Habit>): Observable<Habit> {
    return this.http.put<Habit>(`${this.apiUrl}/habits/${id}`, habit);
  }

  deleteHabit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/habits/${id}`);
  }

  // Habit Entries API
  getHabitEntries(habitId?: number, date?: string): Observable<HabitEntry[]> {
    let url = `${this.apiUrl}/habit-entries`;
    const params = new URLSearchParams();
    if (habitId) params.append('habitId', habitId.toString());
    if (date) params.append('date', date);
    return this.http.get<HabitEntry[]>(`${url}?${params.toString()}`);
  }

  createHabitEntry(entry: Omit<HabitEntry, 'id'>): Observable<HabitEntry> {
    return this.http.post<HabitEntry>(`${this.apiUrl}/habit-entries`, entry);
  }

  updateHabitEntry(id: number, entry: Partial<HabitEntry>): Observable<HabitEntry> {
    return this.http.put<HabitEntry>(`${this.apiUrl}/habit-entries/${id}`, entry);
  }

  deleteHabitEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/habit-entries/${id}`);
  }

  // Time Entries API
  getTimeEntries(date?: string): Observable<TimeEntry[]> {
    let url = `${this.apiUrl}/time-entries`;
    if (date) url += `?date=${date}`;
    return this.http.get<TimeEntry[]>(url);
  }

  createTimeEntry(entry: Omit<TimeEntry, 'id'>): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(`${this.apiUrl}/time-entries`, entry);
  }

  updateTimeEntry(id: number, entry: Partial<TimeEntry>): Observable<TimeEntry> {
    return this.http.put<TimeEntry>(`${this.apiUrl}/time-entries/${id}`, entry);
  }

  deleteTimeEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/time-entries/${id}`);
  }

  // Notes API
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/notes`);
  }

  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/notes/${id}`);
  }

  createNote(note: Omit<Note, 'id'>): Observable<Note> {
    return this.http.post<Note>(`${this.apiUrl}/notes`, note);
  }

  updateNote(id: number, note: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/notes/${id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/notes/${id}`);
  }

  // Goals API
  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${this.apiUrl}/goals`);
  }

  getGoal(id: number): Observable<Goal> {
    return this.http.get<Goal>(`${this.apiUrl}/goals/${id}`);
  }

  createGoal(goal: Omit<Goal, 'id'>): Observable<Goal> {
    return this.http.post<Goal>(`${this.apiUrl}/goals`, goal);
  }

  updateGoal(id: number, goal: Partial<Goal>): Observable<Goal> {
    return this.http.put<Goal>(`${this.apiUrl}/goals/${id}`, goal);
  }

  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/goals/${id}`);
  }
}