import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Badge } from 'primeng/badge';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Note } from '../../models/tracking.models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-notes',
  imports: [
    CommonModule,
    FormsModule,
    Card, 
    Button, 
    Badge,
    Dialog,
    InputText,
    Textarea
  ],
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  showAddDialog = false;
  newNote: any = {}; // Simplified for demo
  
  tagOptions = [
    { label: 'Personal', value: 'personal' },
    { label: 'Work', value: 'work' },
    { label: 'Ideas', value: 'ideas' },
    { label: 'Learning', value: 'learning' },
    { label: 'Projects', value: 'projects' },
    { label: 'Goals', value: 'goals' },
    { label: 'Health', value: 'health' },
    { label: 'Travel', value: 'travel' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    // Enhanced mock data for demonstration
    this.notes = [
      {
        id: 1,
        title: 'Project Ideas for 2024',
        content: 'Exploring new project ideas:\n\n1. Mobile app for habit tracking with social features\n2. AI-powered task management system\n3. Real-time collaboration tool for remote teams\n4. Personal finance dashboard with automated insights\n\nNeed to research market demand and technical feasibility for each idea.',
        tags: ['ideas', 'projects', 'work'],
        createdAt: new Date(new Date().setHours(new Date().getHours() - 2)),
        updatedAt: new Date(new Date().setHours(new Date().getHours() - 1))
      },
      {
        id: 2,
        title: 'Learning Angular Best Practices',
        content: 'Key takeaways from today\'s Angular training:\n\n• Use OnPush change detection for better performance\n• Implement lazy loading for feature modules\n• Utilize Angular CLI schematics for consistency\n• Follow reactive programming patterns with RxJS\n• Write comprehensive unit tests with Jest\n\nPractice these concepts in the current project.',
        tags: ['learning', 'work'],
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
        updatedAt: new Date(new Date().setDate(new Date().getDate() - 1))
      },
      {
        id: 3,
        title: 'Daily Reflection - October 7th',
        content: 'Today was productive! Completed the time tracking interface and made good progress on the goals component. \n\nWins:\n✓ Successfully implemented charts with Chart.js\n✓ Created responsive design that works on mobile\n✓ Added comprehensive sample data\n\nChallenges:\n• Bundle size warnings - need to optimize imports\n• Dialog animations causing console errors\n\nTomorrow: Focus on the notes component and update documentation.',
        tags: ['personal', 'work'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: 'Workout Plan Updates',
        content: 'Adjusting my fitness routine based on recent progress:\n\nMonday: Upper body strength training\nTuesday: Cardio (running or cycling)\nWednesday: Yoga and flexibility\nThursday: Lower body strength training\nFriday: Active recovery (walking, swimming)\nWeekend: Outdoor activities\n\nGoal: Maintain consistency and gradually increase intensity.',
        tags: ['health', 'personal', 'goals'],
        createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
        updatedAt: new Date(new Date().setDate(new Date().getDate() - 2))
      },
      {
        id: 5,
        title: 'Book Notes: Clean Code',
        content: 'Important principles from Robert Martin\'s Clean Code:\n\n1. Functions should be small and do one thing\n2. Use meaningful names for variables and functions\n3. Comments should explain why, not what\n4. Handle errors gracefully\n5. Write tests first (TDD approach)\n\nApplying these principles to current codebase. Focus on refactoring large functions and improving variable names.',
        tags: ['learning', 'work'],
        createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
        updatedAt: new Date(new Date().setDate(new Date().getDate() - 4))
      },
      {
        id: 6,
        title: 'Travel Planning - Summer Vacation',
        content: 'Destinations under consideration:\n\n🏔️ Swiss Alps - hiking and mountain views\n🏖️ Greek Islands - beaches and history\n🏙️ Tokyo, Japan - culture and technology\n🌲 Norway fjords - natural beauty\n\nBudget: $3000-4000\nDuration: 10-14 days\nBest time: June-August\n\nResearch visa requirements and book flights early for better prices.',
        tags: ['travel', 'personal'],
        createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
        updatedAt: new Date(new Date().setDate(new Date().getDate() - 6))
      }
    ];

    // Sort by creation date (most recent first)
    this.notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  showAddNoteDialog() {
    this.newNote = {
      tags: [],
      tagsInput: ''
    };
    this.showAddDialog = true;
  }

  saveNote() {
    if (this.newNote.title && this.newNote.content) {
      // Parse tags from input string
      const tags = this.newNote.tagsInput 
        ? this.newNote.tagsInput.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0)
        : [];
      
      const note: Note = {
        ...this.newNote,
        tags,
        id: Date.now(),
        createdAt: new Date()
      } as Note;
      
      // In real implementation: this.apiService.createNote(note).subscribe()
      this.notes.unshift(note);
      this.showAddDialog = false;
    }
  }

  deleteNote(noteId: number) {
    this.notes = this.notes.filter(note => note.id !== noteId);
  }

  getTagBadgeClass(tag: string): string {
    switch (tag) {
      case 'work': return 'p-badge-primary';
      case 'personal': return 'p-badge-success';
      case 'ideas': return 'p-badge-warning';
      case 'learning': return 'p-badge-info';
      case 'projects': return 'p-badge-primary';
      case 'goals': return 'p-badge-success';
      case 'health': return 'p-badge-danger';
      case 'travel': return 'p-badge-info';
      default: return 'p-badge-secondary';
    }
  }

  formatContent(content: string): string {
    return content.substring(0, 200) + (content.length > 200 ? '...' : '');
  }

  get totalNotesCount(): number {
    return this.notes.length;
  }

  get recentNotesCount(): number {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return this.notes.filter(note => note.createdAt >= oneWeekAgo).length;
  }

  get uniqueTagsCount(): number {
    const allTags = this.notes.flatMap(note => note.tags);
    return new Set(allTags).size;
  }
}
