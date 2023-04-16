import * as React from 'react';
import Svg, {
  Circle,
  Ellipse,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    width={172}
    height={162}
    viewBox="0 0 172 162"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={85} cy={93} r={67} fill="url(#paint0_linear_53141_27828)" />
    <Circle
      cx={165.5}
      cy={32.5}
      r={6.5}
      fill="url(#paint1_linear_53141_27828)"
    />
    <Ellipse
      cx={10.5}
      cy={10}
      rx={10.5}
      ry={10}
      fill="url(#paint2_linear_53141_27828)"
    />
    <Ellipse
      cx={5}
      cy={136.5}
      rx={5}
      ry={5.5}
      fill="url(#paint3_linear_53141_27828)"
    />
    <Ellipse
      cx={153.5}
      cy={160}
      rx={2.5}
      ry={2}
      fill="url(#paint4_linear_53141_27828)"
    />
    <Path
      d="M80.0226 111.118C78.6017 111.118 77.1809 110.509 76.3689 109.291L65.002 94.6763C63.3781 92.6465 63.7841 89.8048 65.8139 88.1809C67.8437 86.557 70.6855 86.963 72.3094 88.9928L80.0226 98.939L97.0732 76.8139C98.6971 74.7841 101.539 74.3781 103.569 76.002C105.598 77.6259 106.004 80.4676 104.381 82.4974L83.6763 109.291C82.6614 110.306 81.4436 111.118 80.0226 111.118Z"
      fill="white"
    />
    <Circle cx={113.5} cy={103.5} r={2.5} fill="white" />
    <Circle cx={48} cy={76} r={4} fill="white" />
    <Circle cx={106.5} cy={54.5} r={1.5} fill="white" />
    <Circle cx={65} cy={125} r={2} fill="white" />
    <Circle cx={87} cy={77} r={1} fill="white" />
    <Defs>
      <LinearGradient
        id="paint0_linear_53141_27828"
        x1={18}
        y1={17.7719}
        x2={172.69}
        y2={41.7389}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F0A330" />
        <Stop offset={1} stopColor="#EF560C" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_53141_27828"
        x1={159}
        y1={25.2018}
        x2={174.007}
        y2={27.5269}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F0A330" />
        <Stop offset={1} stopColor="#EF560C" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_53141_27828"
        x1={-2.97791e-8}
        y1={-1.22807}
        x2={24.1844}
        y2={2.7063}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F0A330" />
        <Stop offset={1} stopColor="#EF560C" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_53141_27828"
        x1={-1.41805e-8}
        y1={130.325}
        x2={11.5912}
        y2={131.957}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F0A330" />
        <Stop offset={1} stopColor="#EF560C" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_53141_27828"
        x1={151}
        y1={157.754}
        x2={156.697}
        y2={158.858}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F0A330" />
        <Stop offset={1} stopColor="#EF560C" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
