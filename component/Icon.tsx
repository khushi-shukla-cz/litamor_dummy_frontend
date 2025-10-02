import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, style }) => {
  const getIconSource = (iconName: string) => {
    switch (iconName) {
      case 'heart':
        return require('../assets/heart.png');
      case 'male':
        return require('../assets/male.png');
      case 'female':
        return require('../assets/female.png');
        case 'partner':
          return require('../assets/male.png');
      default:
        return require('../assets/heart.png'); // fallback
    }
  };

  return (
    <Image
      source={getIconSource(name)}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
      resizeMode="contain"
    />
  );
};

export default Icon;