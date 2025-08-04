# Gift Galaxy Solo Sparks

A beautiful React Native e-commerce app built with Expo 52, Tailwind CSS (NativeWind), and TypeScript.

## 🚀 Features

- **Modern UI/UX**: Beautiful design with Tailwind CSS styling
- **Cross-platform**: Works on iOS, Android, and Web
- **TypeScript**: Full type safety and better developer experience
- **Dark Mode**: Automatic dark/light theme support
- **Expo Router**: File-based routing for seamless navigation
- **NativeWind**: Tailwind CSS for React Native

## 📱 Screenshots

The app features a modern e-commerce interface with:
- Hero section with special offers
- Category browsing
- Featured products carousel
- Responsive design for all screen sizes

## 🛠️ Tech Stack

- **React Native** 0.73.6
- **Expo** 52.0.0
- **TypeScript** 5.1.3
- **NativeWind** 2.0.11 (Tailwind CSS for React Native)
- **Expo Router** 3.4.0
- **React Navigation** 6.1.9

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gift-galaxy-solosparks.git
   cd gift-galaxy-solosparks
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

## 🎯 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android
- `npm run ios` - Start the app on iOS
- `npm run web` - Start the app on Web
- `npm test` - Run tests

## 📁 Project Structure

```
gift-galaxy-solosparks/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Home page
├── components/            # Reusable components
│   └── ui/               # UI components
│       ├── Button.tsx
│       └── Card.tsx
├── assets/               # Images, fonts, etc.
├── types/                # TypeScript type definitions
├── lib/                  # Utility functions
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── babel.config.js       # Babel configuration
├── metro.config.js       # Metro bundler configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Styling

This project uses **NativeWind** (Tailwind CSS for React Native) for styling. The configuration includes:

- Custom color palette with primary and secondary colors
- Dark mode support
- Responsive design utilities
- Custom font families

### Usage Example

```tsx
import { View, Text } from 'react-native';

export function MyComponent() {
  return (
    <View className="bg-white dark:bg-gray-900 p-4 rounded-lg">
      <Text className="text-gray-900 dark:text-white text-lg font-bold">
        Hello World!
      </Text>
    </View>
  );
}
```

## 🔧 Configuration Files

- **`tailwind.config.js`**: Tailwind CSS configuration with custom colors and fonts
- **`babel.config.js`**: Babel configuration with NativeWind plugin
- **`metro.config.js`**: Metro bundler configuration for Expo
- **`tsconfig.json`**: TypeScript configuration with path aliases
- **`app.d.ts`**: TypeScript declarations for NativeWind

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web
- ✅ macOS (with Expo)
- ✅ Windows (with Expo)

## 🚀 Deployment

### Expo Application Services (EAS)

1. **Install EAS CLI**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure EAS**
   ```bash
   eas build:configure
   ```

4. **Build for production**
   ```bash
   eas build --platform all
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [NativeWind](https://www.nativewind.dev/) for bringing Tailwind CSS to React Native
- [React Navigation](https://reactnavigation.org/) for navigation solutions
- [Expo Router](https://expo.github.io/router/) for file-based routing

---

Made with ❤️ using React Native, Expo, and Tailwind CSS

