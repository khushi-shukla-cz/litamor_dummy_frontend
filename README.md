
## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Building & Deployment](#building--deployment)
- [Contributing](#contributing)
- [Environment Variables](#environment-variables)

## 🚀 Tech Stack

- **React Native** - Mobile application framework
- **Expo SDK 52** - Development platform
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS (NativeWind)** - Utility-first CSS framework
- **Redux Toolkit** - State management library
- **Firebase** - Backend-as-a-Service (Authentication, Firestore, Storage)
- **EAS Build** - Cloud build service

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Git
- Expo CLI
- EAS CLI

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-name>
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Install Expo CLI and EAS CLI

```bash
npm install -g @expo/cli eas-cli
```

### 4. Login to Expo

```bash
expo login
eas login
```

### 5. Configure EAS Build

```bash
eas build:configure
```

### 6. Environment Setup

Copy the environment template and fill in your values:

```bash
cp .env.example .env
```

### 7. Start the development server

```bash
npm start
# or
yarn start
```

### 8. Build for development

```bash
# For iOS
eas build --platform ios --profile development

# For Android
eas build --platform android --profile development

# For both platforms
eas build --platform all --profile development
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (buttons, inputs, etc.)
│   │   ├── customButton.tsx
│   │   ├── customButton.types.ts
│   │   └── index.ts
│   └── screens/         # Screen-specific components
│       ├── homeHeader.tsx
│       ├── homeHeader.types.ts
│       └── index.ts
├── screens/             # Application screens
│   ├── homeScreen.tsx
│   ├── homeScreen.types.ts
│   ├── profileScreen.tsx
│   ├── profileScreen.types.ts
│   └── index.ts
├── navigation/          # Navigation configuration
│   ├── appNavigator.tsx
│   ├── appNavigator.types.ts
│   └── index.ts
├── services/           # API services and external integrations
│   ├── apiService.tsx
│   ├── apiService.types.ts
│   └── index.ts
├── utils/              # Utility functions and helpers
│   ├── constants.ts
│   ├── helpers.tsx
│   ├── helpers.types.ts
│   └── index.ts
├── hooks/              # Custom React hooks
│   ├── useAuth.tsx
│   ├── useAuth.types.ts
│   └── index.ts
├── store/              # Redux Toolkit state management
│   ├── slices/         # Redux slices
│   │   ├── authSlice.tsx
│   │   ├── authSlice.types.ts
│   │   ├── userSlice.tsx
│   │   └── userSlice.types.ts
│   ├── store.tsx       # Redux store configuration
│   ├── store.types.ts
│   └── index.ts
└── types/              # Global TypeScript type definitions
    ├── global.types.ts
    ├── api.types.ts
    └── navigation.types.ts
```

## 📐 Development Guidelines

### File Naming Convention

**All files must use camelCase naming convention:**

✅ **Correct:**
- `homeScreen.tsx`
- `customButton.tsx`
- `userProfile.types.ts`
- `apiService.tsx`

❌ **Incorrect:**
- `HomeScreen.tsx`
- `custom-button.tsx`
- `user_profile.types.ts`
- `api-service.tsx`

### TypeScript Guidelines

1. **Type Files**: Every component/service must have a corresponding `.types.ts` file
2. **Type Definitions**: Define interfaces for all props, state, and function parameters
3. **Export Types**: Export all types from their respective `.types.ts` files

#### Example Structure:

**customButton.tsx**
```typescript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CustomButtonProps } from './customButton.types';

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  return (
    <TouchableOpacity 
      className={`p-4 rounded-lg ${variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'}`}
      onPress={onPress}
    >
      <Text className="text-white text-center font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
```

**customButton.types.ts**
```typescript
export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export interface CustomButtonState {
  isPressed: boolean;
}
```

### State Management Guidelines

**All state management must be done using Redux Toolkit:**

1. **Redux Store**: Configure store using Redux Toolkit's `configureStore`
2. **Slices**: Create slices using `createSlice` for each feature
3. **Type Safety**: Define proper TypeScript types for all state, actions, and selectors
4. **Async Actions**: Use `createAsyncThunk` for API calls and async operations

#### Redux Store Structure Example:

**store/store.tsx**
```typescript
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**store/slices/authSlice.tsx**
```typescript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, User } from './authSlice.types';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials) => {
    // API call logic here
    const response = await authService.login(credentials);
    return response.data;
  }
);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
```

### Firebase Integration

**Firebase services should be configured and used throughout the app:**

1. **Authentication**: Firebase Auth for user management
2. **Database**: Firestore for real-time data storage
3. **Storage**: Firebase Storage for file uploads
4. **Push Notifications**: Firebase Cloud Messaging (FCM)

#### Firebase Configuration Example:

**services/firebaseConfig.tsx**
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### Environment Variables

All configuration keys, API endpoints, and sensitive data must be stored in the `.env` file:

```env
# API Configuration
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
EXPO_PUBLIC_API_KEY=your_api_key_here
EXPO_PUBLIC_APP_ENV=development

# Authentication
EXPO_PUBLIC_AUTH_DOMAIN=your-auth-domain.com
EXPO_PUBLIC_CLIENT_ID=your_client_id

# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

# Third-party Services
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

**Usage in code:**
```typescript
const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;
```

## 🏗️ Building & Deployment

### Development Build

```bash
# iOS Development Build
eas build --platform ios --profile development

# Android Development Build
eas build --platform android --profile development
```

### Production Build

```bash
# iOS Production Build
eas build --platform ios --profile production

# Android Production Build
eas build --platform android --profile production
```

### Submit to App Stores

```bash
# iOS App Store
eas submit --platform ios

# Google Play Store
eas submit --platform android
```

## 🤝 Contributing

### Pull Request Workflow

**All changes must be submitted via Pull Request. Direct pushes to main branch are not allowed.**

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes following the project guidelines**

3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request:**
   - Go to the repository on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Add a descriptive title and description
   - Request review from team members

### Pull Request Guidelines

- **Title**: Use conventional commits format (`feat:`, `fix:`, `docs:`, etc.)
- **Description**: Clearly describe what changes were made and why
- **Testing**: Ensure all tests pass and the app builds successfully
- **Code Review**: At least one approval required before merging
- **Conflicts**: Resolve any merge conflicts before requesting review

### Code Review Checklist

- [ ] Follows camelCase naming convention
- [ ] Has corresponding `.types.ts` file
- [ ] Uses environment variables for configuration
- [ ] Implements proper TypeScript typing
- [ ] Uses Tailwind CSS for styling
- [ ] **Uses Redux Toolkit for state management**
- [ ] **Firebase integration follows project patterns**
- [ ] No direct commits to main branch
- [ ] Tests pass successfully
- [ ] No console.log statements in production code

## 🔧 Scripts

```bash
# Start development server
npm start

# Start with cleared cache
npm start -- --clear

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run type checking
npm run type-check

# Build for development
npm run build:dev

# Build for production
npm run build:prod
```

## 📝 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Copy from .env.example and fill in your values
EXPO_PUBLIC_API_BASE_URL=
EXPO_PUBLIC_API_KEY=
EXPO_PUBLIC_APP_ENV=
# Add other environment variables as needed
```

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Build failures**: Check EAS build logs for detailed error messages
3. **Type errors**: Ensure all components have proper TypeScript definitions
4. **Environment variables**: Make sure all required env vars are set

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This project uses EAS Build instead of Expo Go for better native module support and production-ready builds.
