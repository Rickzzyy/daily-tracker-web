# Daily Tracker Web - Angular Frontend

A modern Angular web application for daily task tracking, habit monitoring, time management, and goal tracking. Built with Angular 20 and PrimeNG components with enhanced UI/UX design.

![Daily Tracker Dashboard](https://github.com/user-attachments/assets/1e1502d5-0a24-4f55-a6ad-9fa0efedc2f9)

## Features

- **Dashboard**: Overview of daily progress with visual charts and statistics
- **Task Management**: Create, manage, and track daily tasks with priorities and completion tracking
- **Habit Tracking**: Interactive habit monitoring with progress tracking, increment/decrement controls, and visual progress indicators
- **Time Tracking**: Comprehensive time management with charts, analytics, categorized entries, and timer functionality
- **Notes/Journal**: Rich note-taking system with tagging, content management, and organization features
- **Goal Management**: Complete goal tracking with progress bars, categories, deadlines, and status management
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Professional card-based layouts, interactive charts, and intuitive navigation
- **Rich Sample Data**: Pre-populated with realistic data for immediate usability and testing

## Enhanced UI Features

### Habit Tracking
- **Interactive Progress Cards**: Each habit displays in a beautifully designed card with colored borders
- **Real-time Progress**: Visual progress bars and percentage indicators that update instantly
- **Increment/Decrement Controls**: Easy-to-use buttons to track daily progress
- **Progress Circles**: Color-coded circular progress indicators showing completion status
- **Habit Management**: Add new habits with customizable targets and units

![Habit Tracking Interface](https://github.com/user-attachments/assets/d5502241-ff36-4de2-a09d-79e96716c4d1)

### Time Tracking
- **Comprehensive Dashboard**: Summary cards showing daily, weekly, monthly, and average time tracking
- **Interactive Charts**: Category distribution doughnut chart and daily trend line chart
- **Rich Time Entries**: Detailed time logs with categories, descriptions, and timestamps
- **Analytics**: Daily averages, category breakdowns, and time tracking insights
- **Time Management**: Manual entry creation, timer functionality, and entry management

![Enhanced Time Tracking Interface](https://github.com/user-attachments/assets/480cac66-34a6-4625-aac2-47d9cd7d5e2b)

### Goal Management
- **Progress Tracking**: Interactive progress bars with increment/decrement controls
- **Goal Categories**: Color-coded categories (health, career, learning, personal, financial)
- **Status Management**: Active, completed, paused, and cancelled goal states
- **Deadline Tracking**: Days remaining calculations and target date management
- **Comprehensive Statistics**: Active goals count, completion rate, and average progress

![Enhanced Goals Interface](https://github.com/user-attachments/assets/cee52fab-863d-44bb-9803-e6b51b6aa22d)

### Notes & Journal
- **Rich Note Management**: Full-featured note creation with titles, content, and tagging
- **Tagging System**: Organize notes with customizable tags (personal, work, ideas, learning)
- **Content Preview**: Truncated content display with full note view
- **Statistics Dashboard**: Total notes, recent activity, and tag usage tracking
- **Modern Interface**: Card-based layout with creation and edit timestamps

### Navigation
- **Sidebar Navigation**: Accessible drawer-style navigation for all sections
- **Modern Header**: Clean toolbar with app branding and user controls
- **Route-based Navigation**: Full routing support for all tracking categories

## Technology Stack

- **Frontend Framework**: Angular 20
- **UI Components**: PrimeNG 20 (Card, Button, Badge, UIChart, ProgressBar, Dialog, InputText, Textarea, Select, DatePicker, InputNumber, Checkbox)
- **Icons**: PrimeIcons
- **Styling**: CSS with PrimeNG theming and custom responsive design
- **Charts**: Chart.js integration via PrimeNG UIChart component
- **HTTP Client**: Angular HttpClient for API communication
- **Forms**: Angular Reactive Forms with PrimeNG form components

## Recent Enhancements (2024)

### 🚀 Major UI/UX Overhaul
All tracking interfaces have been completely redesigned with modern, professional UI components:

#### ✨ Enhanced Features Across All Components:
- **Consistent Design System**: All pages now use identical card layouts, color schemes, and spacing
- **Interactive Charts**: Time tracking includes doughnut charts for category distribution and line charts for daily trends
- **Progress Tracking**: Visual progress bars, percentage indicators, and interactive controls
- **Rich Sample Data**: Each component pre-populated with realistic, diverse data for immediate usability
- **Professional Layouts**: Modern card-based designs with hover effects and smooth animations
- **Responsive Grids**: Optimized layouts that adapt to mobile, tablet, and desktop screens

#### 📊 Component-Specific Improvements:

**Time Tracking:**
- Summary dashboard with daily/weekly/monthly totals and averages
- Category-based time distribution charts
- Interactive time entry management with creation, editing, and deletion
- Timer functionality for real-time tracking

**Goals Management:**
- Interactive progress bars with ±10% increment controls
- Category-based organization (health, career, learning, personal, financial)
- Status management (active, completed, paused, cancelled)
- Deadline tracking with days remaining calculations

**Notes & Journal:**
- Rich note creation with title, content, and tagging system
- Tag-based organization and filtering
- Content preview with truncation
- Statistics dashboard showing note activity

**Habit Tracking:** *(Previously Enhanced)*
- Interactive increment/decrement controls
- Real-time progress visualization
- Color-coded progress indicators
- Customizable targets and units

### 🛠 Technical Improvements:
- **Bundle Optimization**: Efficient PrimeNG component imports
- **Type Safety**: Enhanced TypeScript interfaces and models
- **Performance**: Optimized rendering and data management
- **Accessibility**: ARIA labels and keyboard navigation support

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Main dashboard with stats and charts
│   │   ├── tasks/             # Task management components
│   │   ├── habits/            # Interactive habit tracking with progress controls
│   │   ├── time-tracking/     # Time logging with categorized entries
│   │   ├── notes/             # Notes management interface
│   │   ├── goals/             # Goal tracking interface
│   │   └── layout/
│   │       ├── header/        # Top navigation bar
│   │       └── sidebar/       # Side navigation menu (drawer-style)
│   ├── models/
│   │   └── tracking.models.ts # TypeScript interfaces for all data models
│   ├── services/
│   │   └── api.service.ts     # HTTP service for API calls
│   └── environments/          # Environment configurations
```

## Navigation Guide

The application features intuitive navigation between different tracking categories:

1. **Dashboard** (`/dashboard`) - Main overview with statistics and charts
2. **Tasks** (`/tasks`) - Task management with checkbox controls and priority badges
3. **Habits** (`/habits`) - Interactive habit tracking with progress indicators
4. **Time Tracking** (`/time-tracking`) - Activity logging with time summaries
5. **Notes** (`/notes`) - Note-taking and journaling interface
6. **Goals** (`/goals`) - Goal setting and progress tracking

Use the hamburger menu (☰) in the top-left corner to access the sidebar navigation and switch between sections.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Angular CLI 20 (optional, but recommended)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rickzzyy/daily-tracker-web.git
   cd daily-tracker-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## API Integration

### Environment Configuration

Update the API URL in the environment files:

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // Your local API server
  appName: 'Daily Tracker'
};
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api', // Your production API
  appName: 'Daily Tracker'
};
```

### Expected API Endpoints

The frontend expects the following REST API endpoints:

```
GET    /api/dashboard/stats     # Dashboard statistics
GET    /api/tasks              # List tasks
POST   /api/tasks              # Create task
PUT    /api/tasks/:id          # Update task
DELETE /api/tasks/:id          # Delete task

GET    /api/habits             # List habits
POST   /api/habits             # Create habit
PUT    /api/habits/:id         # Update habit
DELETE /api/habits/:id         # Delete habit

GET    /api/habit-entries      # List habit entries
POST   /api/habit-entries      # Create habit entry
PUT    /api/habit-entries/:id  # Update habit entry
DELETE /api/habit-entries/:id  # Delete habit entry

GET    /api/time-entries       # List time entries
POST   /api/time-entries       # Create time entry
PUT    /api/time-entries/:id   # Update time entry
DELETE /api/time-entries/:id   # Delete time entry

GET    /api/notes              # List notes
POST   /api/notes              # Create note
PUT    /api/notes/:id          # Update note
DELETE /api/notes/:id          # Delete note

GET    /api/goals              # List goals
POST   /api/goals              # Create goal
PUT    /api/goals/:id          # Update goal
DELETE /api/goals/:id          # Delete goal
```

### Mock Data

Currently, the application uses comprehensive mock data for demonstration purposes. Each component includes realistic sample data:

- **Time Tracking**: 10+ time entries spanning multiple days with diverse categories (work, learning, exercise, personal)
- **Goals**: 6 sample goals with varying progress levels and categories (learning, career, health, personal)
- **Habits**: 4 interactive habits with progress tracking and different units (sessions, minutes, glasses)
- **Notes**: 6 detailed notes with various tags and content types (ideas, learning notes, reflections)
- **Tasks**: Sample tasks with different priorities and completion states

To connect to a real API:

1. Ensure your API server is running
2. Update the environment configuration with the correct API URL
3. Uncomment the actual API calls in the service methods
4. Remove or comment out the mock data sections

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm test` - Run unit tests
- `npm run lint` - Run linting

## Development

### Adding New Components

1. Generate a new component:
   ```bash
   ng generate component components/feature-name
   ```

2. Add the component to the routing in `app.routes.ts`

3. Import required PrimeNG modules in the component

### Styling Guidelines

- **PrimeNG Theming**: Use PrimeNG's built-in CSS custom properties for consistent theming
- **Component Structure**: Follow the established pattern with container, header, and grid/content sections
- **Responsive Design**: Utilize CSS Grid and Flexbox for responsive layouts that work on all screen sizes
- **Card-based Layout**: Use PrimeNG Card components for consistent visual hierarchy
- **Color Consistency**: Use PrimeNG's severity classes and CSS custom properties for consistent styling
- **Interactive Elements**: Implement hover effects and smooth transitions for better user experience
- **Progress Indicators**: Use visual progress bars and circles to show completion status
- **Spacing**: Maintain consistent padding and margins using CSS custom properties

### Component Architecture

- **Standalone Components**: All new components use Angular's standalone architecture
- **Modular Imports**: Import only necessary PrimeNG modules to keep bundle size optimized
- **Reactive Updates**: Use Angular's reactive patterns for real-time UI updates
- **TypeScript Interfaces**: Define clear data models for type safety and better development experience

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.
