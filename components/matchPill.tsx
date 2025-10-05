import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";

const MatchPill = ({ percentage }: { percentage: number }) => {
  const radius = 17;
  const strokeWidth = 3;
  const size = (radius + strokeWidth) * 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return (
    <View style={styles.pillContainer}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 1. Solid light grey background for the text */}
        <Circle cx={center} cy={center} r={radius} fill="#FFFFFF" />

        {/* 2. The white background track for the progress bar */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#D9D9D9"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* 3. The dark progress indicator */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#424242"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />

        {/* 4. The percentage text, perfectly centered */}
        <SvgText
          x={center}
          y={center}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize="14"
          fontWeight="bold"
          fill="#212121"
        >
          {`${percentage}%`}
        </SvgText>
      </Svg>
      <Text style={styles.matchText}>Match</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#666666",
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 4,
    alignSelf: "flex-start",
    gap: 12,
  },
  matchText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 20,
  },
});

export default MatchPill;