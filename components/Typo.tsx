import { colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

interface TypoProps extends TextProps {
  size?: number;
  color?: string;
  fontWeight?: TextStyle['fontWeight'];
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

const Typo = ({
  size = 14,
  color = colors.text,
  fontWeight = '400',
  children,
  style,
  ...textProps
}: TypoProps) => {
  return (
    <Text
      style={[
        { fontSize: size, color, fontWeight },
        style
      ]}
      {...textProps}
    >
      {children}
    </Text>
  );
};

export default Typo;

const styles = StyleSheet.create({});
