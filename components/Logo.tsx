import React from 'react';
import { Image, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

interface LogoProps {
  logoSize?: 'medium' | 'large';
  showSubtitle?: boolean;
}

export default function Logo({ logoSize = 'large', showSubtitle = true }: LogoProps) {
  const getLogoSize = () => {
    switch (logoSize) {
      case 'medium':
        return 'w-[5.5rem] h-[5.5rem]';
      case 'large':
        return 'w-[8rem] h-[8rem]';
      default:
        return 'w-[8rem] h-[8rem]';
    }
  };

  const getTitleSize = () => {
    switch (logoSize) {
      case 'medium':
        return 30;
      case 'large':
        return 36;
      default:
        return 36;
    }
  };

  const getSvgWidth = () => {
    switch (logoSize) {
      case 'medium':
        return 200;
      case 'large':
        return 240;
      default:
        return 240;
    }
  };

  const getSvgHeight = () => {
    switch (logoSize) {
      case 'medium':
        return 50;
      case 'large':
        return 60;
      default:
        return 60;
    }
  };

  return (
    <>
      {/* Logo */}
      <Image
        source={require('../assets/images/logo.png')}
        className={`${getLogoSize()} mb-4`}
        resizeMode="contain"
      />
      {/* Title */}
      <View className={`flex-row items-end ${logoSize === 'medium' ? 'mb-6' : ''}`}>
        <Svg width={getSvgWidth()} height={getSvgHeight()}>
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#c026d3" />
              <Stop offset="50%" stopColor="#ec4899" />
              <Stop offset="100%" stopColor="#f472b6" />
            </LinearGradient>
          </Defs>
          <SvgText
            x="50%"
            y="50%"
            fontSize={getTitleSize()}
            fontWeight="800"
            textAnchor="middle"
            fill="url(#gradient)"
          >
            Lit Amor
          </SvgText>
        </Svg>
      </View>
      {/* Subtitle */}
      {showSubtitle && (
        <Text className="italic text-base text-center text-gray-500 mb-12">love but little more</Text>
      )}
    </>
  );
} 