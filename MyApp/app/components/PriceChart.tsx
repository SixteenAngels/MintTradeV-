import React from 'react';
import { View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

type Props = { data: Array<{ x: number; y: number }> };

function buildPath(points: Array<{ x: number; y: number }>, width: number, height: number) {
  if (points.length === 0) return '';
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = Math.max(1, maxX - minX);
  const spanY = Math.max(1, maxY - minY);
  const px = (x: number) => ((x - minX) / spanX) * width;
  const py = (y: number) => height - ((y - minY) / spanY) * height;
  let d = `M ${px(points[0].x)} ${py(points[0].y)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${px(points[i].x)} ${py(points[i].y)}`;
  }
  return d;
}

export function PriceChart({ data }: Props) {
  const width = 360;
  const height = 200;
  const d = buildPath(data, width, height);
  return (
    <View style={{ height, width }}>
      <Svg width={width} height={height}>
        <Path d={d} stroke="#2563eb" strokeWidth={2} fill="none" />
      </Svg>
    </View>
  );
}
