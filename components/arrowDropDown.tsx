import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const ArrowDropDownIcon: React.FC<SvgProps> = (props) => (
  <Svg width={24} height={24} viewBox="2 3 20 16" {...props}>
    <Path d="M7 10l5 5 5-5H7z" fill="#444444" />
  </Svg>
);

export default ArrowDropDownIcon;
