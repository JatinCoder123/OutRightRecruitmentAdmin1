# Candidate Assessment Platform - Admin Dashboard

## 🎯 Overview

A modern, enterprise-grade admin dashboard for managing candidate assessments, built with React, Redux Toolkit, React Router, and Recharts.

## 📁 Project Structure

```
/src/app/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, Input, etc.)
│   ├── Sidebar.jsx     # Collapsible sidebar navigation
│   ├── Navbar.jsx      # Top navigation bar
│   └── EmptyState.jsx  # Empty state component
│
├── layouts/            # Layout components
│   └── DashboardLayout.jsx  # Main dashboard layout wrapper
│
├── pages/              # Page components (routes)
│   ├── Dashboard.jsx        # Dashboard with charts & KPIs
│   ├── Candidates.jsx       # Candidates list with filters
│   ├── CandidateDetail.jsx  # Individual candidate details
│   ├── Assessments.jsx      # Assessment management
│   ├── Results.jsx          # Results & leaderboard
│   ├── Analytics.jsx        # Advanced analytics
│   ├── Questions.jsx        # Question bank management
│   ├── Prompts.jsx          # AI prompt templates
│   ├── Roles.jsx            # Role management (CRUD)
│   └── Settings.jsx         # Platform settings
│
├── redux/              # State management
│   ├── store.js        # Redux store configuration
│   └── slices/         # Redux slices
│       ├── authSlice.js
│       ├── candidateSlice.js
│       ├── assessmentSlice.js
│       ├── resultSlice.js
│       ├── questionSlice.js
│       ├── promptSlice.js
│       ├── roleSlice.js
│       └── uiSlice.js
│
├── services/           # API services
│   └── api.js          # API endpoints & mock data handlers
│
├── utils/              # Utility functions
│   ├── mockData.js     # Mock data for development
│   └── helpers.js      # Helper functions
│
├── routes.jsx          # Route configuration
└── App.tsx             # Main app component

```

## 🚀 Features

### ✅ Implemented Features

1. **Dashboard**
   - KPI cards (Total Candidates, Active Tests, Pass Rate, Avg Score)
   - Performance charts (Line, Pie, Bar, Area)
   - Recent activity feed

2. **Candidates Management**
   - Data table with pagination
   - Advanced filters (status, role, round, date)
   - Search functionality
   - Candidate detail view with timeline

3. **Roles Management (Full CRUD)**
   - Create, Read, Update, Delete roles
   - Skill management with tags
   - Experience level categorization
   - Candidate count tracking

4. **Question Bank**
   - Question types (MCQ, Subjective, Coding)
   - Difficulty levels
   - Tags and categories
   - Bulk upload support

5. **AI Prompts**
   - Prompt template management
   - Version history
   - Question generation

6. **Results & Analytics**
   - Leaderboard
   - Export functionality (CSV/PDF)
   - Advanced charts and visualizations
   - Role-based performance comparison

7. **UI/UX Features**
   - Collapsible sidebar
   - Dark/light mode toggle
   - Notifications panel
   - Responsive design
   - Smooth animations (Motion)
   - Toast notifications (Sonner)

## 🛠 Tech Stack

- **React 18.3.1** - UI framework
- **Redux Toolkit** - State management
- **React Router 7** - Routing
- **Recharts** - Data visualization
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **Radix UI** - Headless UI components
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **Axios** - HTTP client

## 🎨 Design Philosophy

- **Modern & Clean**: Stripe/Vercel-inspired design
- **Component-Driven**: Reusable, modular components
- **Scalable**: Easy to extend and maintain
- **Performant**: Optimized with React best practices
- **Accessible**: Built with accessibility in mind

## 🔌 API Integration

The application uses mock data and API placeholders. To connect to a real backend:

1. Update the `baseURL` in `/src/app/services/api.js`
2. Replace mock API calls with real endpoints
3. Update the data structures as needed

## 📊 Redux State Structure

- `auth` - User authentication
- `candidates` - Candidate data and filters
- `assessments` - Assessment templates
- `results` - Test results and leaderboard
- `questions` - Question bank
- `prompts` - AI prompt templates
- `roles` - Role definitions
- `ui` - UI state (theme, sidebar, notifications, modals)

## 🎯 Key Components

### Sidebar
- Collapsible navigation
- Active route highlighting
- Smooth animations

### Navbar
- Global search
- Notifications dropdown
- Theme toggle
- User profile menu

### Dashboard
- Interactive charts (Recharts)
- Real-time KPI cards
- Activity feed

### Data Tables
- Sorting and filtering
- Pagination
- Row actions
- Export functionality

## 🚦 Routing

All routes are defined in `/src/app/routes.jsx`:

- `/dashboard` - Main dashboard
- `/candidates` - Candidates list
- `/candidates/:id` - Candidate detail
- `/assessments` - Assessments
- `/results` - Results & leaderboard
- `/analytics` - Advanced analytics
- `/questions` - Question bank
- `/prompts` - AI prompts
- `/roles` - Roles management
- `/settings` - Settings

## 🎨 Customization

### Theme
Edit `/src/styles/theme.css` to customize colors and design tokens.

### Components
All UI components are in `/src/app/components/ui/` and can be customized.

### Mock Data
Update `/src/app/utils/mockData.js` to modify sample data.

## 📝 Notes

- Mock API delays simulate real network requests
- All data is stored in Redux (no persistence)
- Ready to connect to a real backend
- Fully typed with JSDoc comments (for IDE support)

## 🔮 Future Enhancements

- Real-time updates with WebSockets
- Advanced filtering and sorting
- Bulk operations
- Export to multiple formats
- Email templates
- Calendar integration
- Advanced reporting

---

Built with ❤️ for modern assessment platforms
