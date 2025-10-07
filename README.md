# Daily Tracker Web - Angular Frontend

A modern Angular web application for daily task tracking, habit monitoring, time management, and goal tracking. Built with Angular 20 and PrimeNG components.

![Daily Tracker Dashboard](https://github.com/user-attachments/assets/1e1502d5-0a24-4f55-a6ad-9fa0efedc2f9)

## Features

- **Dashboard**: Overview of daily progress with visual charts and statistics
- **Task Management**: Create, manage, and track daily tasks with priorities
- **Habit Tracking**: Monitor daily habits and track completion rates
- **Time Tracking**: Log time spent on various activities
- **Notes/Journal**: Keep track of daily notes and thoughts
- **Goal Management**: Set and track progress on personal goals
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend Framework**: Angular 20
- **UI Components**: PrimeNG 20
- **Icons**: PrimeIcons
- **Styling**: CSS with PrimeNG theming
- **Charts**: Chart.js integration via PrimeNG
- **HTTP Client**: Angular HttpClient for API communication

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Main dashboard with stats and charts
│   │   ├── tasks/             # Task management components
│   │   ├── habits/            # Habit tracking (planned)
│   │   ├── time-tracking/     # Time logging (planned)
│   │   ├── notes/             # Notes management (planned)
│   │   ├── goals/             # Goal tracking (planned)
│   │   └── layout/
│   │       ├── header/        # Top navigation bar
│   │       └── sidebar/       # Side navigation menu
│   ├── models/
│   │   └── tracking.models.ts # TypeScript interfaces
│   ├── services/
│   │   └── api.service.ts     # HTTP service for API calls
│   └── environments/          # Environment configurations
```

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

Currently, the application uses mock data for demonstration. To connect to a real API:

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

- Use PrimeNG's built-in CSS custom properties for theming
- Follow the existing component structure and naming conventions
- Ensure responsive design using CSS Grid and Flexbox
- Use PrimeNG's severity classes for consistent styling

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
