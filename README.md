# Weather Intelligence Dashboard

A production-grade, fully responsive weather dashboard built with modern React best practices, featuring real-time weather data and 7-day forecasts.

## 🚀 Features

- **Real-time Weather Data**: Current weather conditions with detailed metrics
- **7-Day Forecast**: Extended weather predictions with daily summaries
- **Smart City Search**: Autocomplete search with debouncing and race-condition handling
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Responsive Design**: Mobile-first approach, optimized for all screen sizes
- **Performance Optimized**: React Query caching, memoization, and lazy loading
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- **Type Safety**: Strict TypeScript implementation throughout

## 🏗️ Architecture

### Architecture Choice: Feature-Based Architecture

I chose **Feature-Based Architecture** for this project because:

1. **Domain Clarity**: Weather dashboard has distinct, self-contained features (search, current weather, forecast)
2. **Scalability**: Easy to add new weather-related features without affecting existing code
3. **Maintainability**: Each feature encapsulates its own components, hooks, services, and types
4. **Team Collaboration**: Multiple developers can work on different features independently
5. **Code Organization**: Intuitive structure that maps directly to application functionality

### Project Structure
```
src/
├── config/                 # Configuration and constants
│   ├── env.ts             # Environment variables management
│   └── constants.ts       # Application constants
├── shared/                # Shared utilities and components
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── hooks/             # Shared custom hooks
│   └── components/        # Reusable UI components
├── features/              # Feature-based modules
│   ├── weather-search/    # City search feature
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   ├── current-weather/   # Current weather display
│   │   ├── components/
│   │   └── hooks/
│   └── forecast/          # Weather forecast feature
│       ├── components/
│       └── hooks/
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles
```

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query (Server State)
- **API**: OpenWeatherMap API
- **Icons**: Lucide React
- **Code Quality**: ESLint + Prettier

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key (free tier available)

## 🚦 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd weather-intelligence-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:
```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
VITE_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
VITE_WEATHER_GEO_API_BASE_URL=https://api.openweathermap.org/geo/1.0
VITE_API_TIMEOUT=10000
VITE_DEFAULT_UNITS=metric
VITE_DEFAULT_LANGUAGE=en
VITE_CACHE_STALE_TIME=300000
VITE_CACHE_TIME=600000
VITE_API_RATE_LIMIT_PER_MINUTE=60
```

**Get your API key**: Sign up at [OpenWeatherMap](https://openweathermap.org/api)

### 4. Run Development Server
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

## 🎯 Key Implementation Details

### Custom Hooks

#### `useWeatherSearch`
- **Responsibility**: City autocomplete with debouncing
- **Features**: 
  - Debounced input (500ms)
  - Request cancellation on new input
  - Race condition prevention
  - Loading and error states
  - Empty state detection

#### `useCurrentWeather`
- **Responsibility**: Fetch and format current weather data
- **Features**:
  - React Query caching (5-minute stale time)
  - Automatic refetch every 10 minutes
  - Formatted data transformation
  - Error retry logic (2 attempts)

#### `useForecast`
- **Responsibility**: Fetch and process 7-day forecast
- **Features**:
  - Daily forecast aggregation
  - React Query caching (5-minute stale time)
  - Automatic refetch every 30 minutes
  - Temperature min/max calculation

### Performance Optimizations

1. **React Query Caching**
   - Stale time: 5 minutes
   - Cache time: 10 minutes
   - Reduces unnecessary API calls

2. **Memoization**
   - `useMemo` for expensive computations
   - `useCallback` for event handlers
   - `React.memo` for components (where appropriate)

3. **Code Splitting**
   - Vite's automatic code splitting
   - Lazy loading for better initial load

4. **Debouncing**
   - Search input debounced at 500ms
   - Prevents excessive API requests

5. **Request Cancellation**
   - AbortController for in-flight requests
   - Prevents race conditions

### Error Handling Strategy

1. **API Errors**: Custom `ApiError` class with status codes
2. **Error Boundaries**: Catch React rendering errors
3. **User Feedback**: Friendly error messages with retry options
4. **Network Errors**: Graceful handling with offline detection
5. **Rate Limiting**: Awareness and user notification

### Accessibility Features

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Color contrast compliance

## 🎨 Design Decisions

### Why OpenWeatherMap?
- Comprehensive free tier
- Reliable API with good documentation
- Rich dataset (current + forecast + geocoding)
- Well-maintained and stable

### Why TanStack Query?
- Built-in caching and background refetching
- Request deduplication
- Automatic error retry
- DevTools for debugging
- Better than manual useState + useEffect

### Why Feature-Based Architecture?
- Clear feature boundaries
- Easier to test and maintain
- Scales better than flat structure
- Team-friendly organization

## 🔧 Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Assumptions & Trade-offs

### Assumptions
1. Users have stable internet connection
2. OpenWeatherMap API remains stable and available
3. Modern browser support (ES2020+)
4. API key limits are sufficient for usage

### Trade-offs
1. **Client-side only**: No backend for API key security
   - Trade-off: Simpler deployment vs. API key exposure
   - Mitigation: Environment variables, rate limiting awareness

2. **No data persistence**: Weather data not stored locally beyond cache
   - Trade-off: Fresh data vs. offline functionality
   - Reasoning: Weather data changes frequently

3. **Metric units default**: Defaulting to metric system
   - Trade-off: International standard vs. US preference
   - Solution: Could add unit toggle in future

4. **Free API tier**: Limited to 60 calls/minute
   - Trade-off: Cost vs. features
   - Mitigation: Smart caching, user feedback on limits

## 🚀 Future Enhancements

- [ ] Unit system toggle (Metric/Imperial)
- [ ] Geolocation support
- [ ] Weather alerts and notifications
- [ ] Hourly forecast view
- [ ] Historical weather data
- [ ] Multiple locations tracking
- [ ] Weather maps integration
- [ ] PWA support for offline access
- [ ] Social sharing features
- [ ] Weather widgets

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Built with ❤️ as a demonstration of senior-level React development practices.
-- Siavash Peymanvand -- 
---

**Note**: Remember to never commit your `.env` file with real API keys to version control.
```



