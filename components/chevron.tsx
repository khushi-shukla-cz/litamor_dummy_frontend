// import React from "react";
// import Svg, { Path } from "react-native-svg";

interface ChevronIconProps {
  color?: string;
  size?: number;
}

export const ChevronDownIcon: React.FC<ChevronIconProps> = ({
  color = "black",
  size = 12,
}) => {
  const viewBox = "0 0 12 8";
  const pathData =
    "M0.166992 0.666504L6.00033 7.33317L11.8337 0.666504H0.166992Z";
  const aspectRatio = 8 / 12;
  const height = size * aspectRatio;

  return (
    <Svg width={size} height={height} viewBox={viewBox}>
      <Path d={pathData} fill={color} fillRule="evenodd" clipRule="evenodd" />
    </Svg>
  );
};
ChevronDownIcon.displayName = "ChevronDownIcon";

// export const ChevronUpIcon: React.FC<ChevronIconProps> = ({
//   color = "black",
//   size = 30,
// }) => {
//   const viewBox = "0 0 26 10";
//   const pathData =
//     "M16.333 13.3335L10.4997 6.66683L4.66634 13.3335L16.333 13.3335Z";
//   const aspectRatio = 8 / 12;
//   const height = size * aspectRatio;

//   return (
//     <Svg width={size} height={height} viewBox={viewBox}>
//       <Path d={pathData} fill={color} fillRule="evenodd" clipRule="evenodd" />
//     </Svg>
//   );
// };
// ChevronUpIcon.displayName = "ChevronUpIcon";

import React from "react";
import Svg, { Path } from "react-native-svg";

interface ChevronIconProps {
  color?: string;
  size?: number; // width in px
}

const VIEW_BOX_WIDTH = 20;
const VIEW_BOX_HEIGHT = 20;

export const ChevronUpIcon: React.FC<ChevronIconProps> = ({
  color = "black",
  size = 24,
}) => {
  const aspectRatio = VIEW_BOX_HEIGHT / VIEW_BOX_WIDTH;
  const height = size * aspectRatio;

  // Adjusted path scaled to fit same viewBox as ChevronDownIcon
  const pathData = "M6 15l6-6 6 6z"; // simple chevron up arrow scaled for 24x24

  return (
    <Svg
      width={size}
      height={height}
      viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
    >
      <Path d={pathData} fill={color} />
    </Svg>
  );
};
ChevronUpIcon.displayName = "ChevronUpIcon";
