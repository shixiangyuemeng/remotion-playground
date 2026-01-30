import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个流动波浪动画，要求：
 * - 多层波浪叠加
 * - 不同颜色和透明度
 * - 波浪起伏运动
 * - 使用 SVG path 和正弦函数
 * - 平滑的流动效果
 *
 * 【效果说明】
 * 演示如何使用 SVG 和正弦函数创建波浪效果。
 * 多层波浪通过不同的相位和振幅创建深度感。
 */

export const Wave = () => {
  const frame = useCurrentFrame();

  const waves = [
    {
      color: '#006994',
      amplitude: 50,
      frequency: 0.005,
      speed: 0.02,
      phase: 0,
      opacity: 0.3,
      yOffset: 540,
    },
    {
      color: '#0099cc',
      amplitude: 40,
      frequency: 0.006,
      speed: 0.03,
      phase: 1,
      opacity: 0.5,
      yOffset: 560,
    },
    {
      color: '#00ccff',
      amplitude: 30,
      frequency: 0.007,
      speed: 0.04,
      phase: 2,
      opacity: 0.7,
      yOffset: 580,
    },
    {
      color: '#66ddff',
      amplitude: 20,
      frequency: 0.008,
      speed: 0.05,
      phase: 3,
      opacity: 0.9,
      yOffset: 600,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #0a1628 0%, #1a3a5c 100%)',
      }}
    >
      {/* 天空装饰 */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 100,
          fontSize: 64,
          fontWeight: 'bold',
          color: '#ffffff',
          textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
        }}
      >
        波浪动画
      </div>

      {/* 月亮 */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          right: 200,
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: '#ffffcc',
          boxShadow: '0 0 50px rgba(255, 255, 204, 0.8)',
        }}
      />

      {/* SVG 波浪 */}
      <svg width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0}}>
        {waves.map((wave, index) => (
          <AnimatedWave key={index} {...wave} frame={frame} index={index} />
        ))}
      </svg>

      {/* 底部说明 */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 100,
          fontSize: 28,
          color: '#88aacc',
        }}
      >
        使用 Math.sin 创建流动的波浪效果
      </div>
    </AbsoluteFill>
  );
};

const AnimatedWave = ({
  color,
  amplitude,
  frequency,
  speed,
  phase,
  opacity,
  yOffset,
  frame,
  index,
}) => {
  // 生成波浪路径
  const generateWavePath = (frameOffset) => {
    const points = [];
    const width = 1920;

    for (let x = 0; x <= width; x += 10) {
      const y =
        yOffset +
        Math.sin((x * frequency + frame * speed + phase) * Math.PI * 2) * amplitude;
      points.push(`${x},${y}`);
    }

    // 闭合路径
    const path = `M 0,1080 L 0,${points[0]?.split(',')[1] || 0} L ${points.join(
      ' L '
    )} L 1920,1080 Z`;

    return path;
  };

  const path = generateWavePath(frame);

  // 渐变定义
  const gradientId = `wave-gradient-${index}`;

  return (
    <g style={{opacity}}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="50%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <path
        d={path}
        fill={`url(#${gradientId})`}
        stroke={color}
        strokeWidth="2"
        style={{
          filter: `drop-shadow(0 0 10px ${color})`,
        }}
      />
    </g>
  );
};
