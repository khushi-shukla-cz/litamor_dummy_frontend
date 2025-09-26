// import React from "react";
// import { Dimensions, View } from "react-native";
// import Svg, { Path } from "react-native-svg";

// const { width: screenWidth } = Dimensions.get("window");

// interface SVGCurvedRectangleProps {
//   height?: number;
//   color?: string;
//   curveDepth?: number;
// }

// const SVGCurvedRectangle: React.FC<SVGCurvedRectangleProps> = ({
//   height = 200,
//   color = "#808080",
//   curveDepth = 30,
// }) => {
//   // Create path for rectangle with curved bottom
//   const pathData = `
//     M 0,0
//     L ${screenWidth},0
//     L ${screenWidth},${height - curveDepth}
//     Q ${screenWidth / 2},${height} 0,${height - curveDepth}
//     Z
//   `;

//   return (
//     <View style={{ height, width: "100%" }}>
//       <Svg
//         height={height}
//         width={screenWidth}
//         style={{ position: "absolute", top: 0 }}
//       >
//         <Path d={pathData} fill={color} />
//       </Svg>
//     </View>
//   );
// };

// export default SVGCurvedRectangle;

import React, { ReactNode } from "react";
import { Dimensions, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width: screenWidth } = Dimensions.get("window");

interface SVGCurvedRectangleProps {
  height?: number;
  color?: string;
  curveDepth?: number;
  children?: ReactNode;
}

const SVGCurvedRectangle: React.FC<SVGCurvedRectangleProps> = ({
  height = 100,
  color = "#",
  curveDepth = 30,
  children,
}) => {
  const pathData = `
    M 0,0 
    L ${screenWidth},0 
    L ${screenWidth},${height - curveDepth} 
    Q ${screenWidth / 2},${height} 0,${height - curveDepth} 
    Z
  `;

  return (
    <View style={{ height, width: "100%" }}>
      <Svg
        height={height}
        width={screenWidth}
        style={{ position: "absolute", top: 0 }}
      >
        <Path d={pathData} fill={color} />
      </Svg>
      {/* Render your content here */}
      {children}
    </View>
  );
};

export default SVGCurvedRectangle;
