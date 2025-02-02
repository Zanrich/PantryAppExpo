import * as React from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';

export const ProfileIcon = (props) => (
  <Svg width={11} height={10} viewBox="0 0 11 10" fill="none" {...props}  xmlns="http://www.w3.org/2000/svg">
   <Circle cx="11" cy="5" r="4" stroke="#FCF9F5" stroke-width="2"/>
   <Rect x="1" y="13" width="20" height="7" rx="3.5" stroke="#FCF9F5" stroke-width="2"/>
  </Svg>
);