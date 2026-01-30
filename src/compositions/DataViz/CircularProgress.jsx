import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个圆形进度动画，要求：
 * - 显示多个圆形进度指示器
 * - 使用 SVG 绘制圆形路径
 * - 通过 stroke-dasharray 和 stroke-dashoffset 控制进度
 * - 中心显示百分比数值
 * - 不同的颜色和大小
 *
 * 【效果说明】
 * 演示如何使用 SVG 创建圆形进度条动画。
 * 关键是使用 stroke-dasharray 和 stroke-dashoffset 属性。
 */

export const CircularProgress = () => {
  const frame = useCurrentFrame();

  const circles = [
    {radius: 120, target: 75, color: '#3498db', label: '进度 1', delay: 0},
    {radius: 100, target: 90, color: '#e74c3c', label: '进度 2', delay: 20},
    {radius: 80, target: 60, color: '#2ecc71', label: '进度 3', delay: 40},
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f0f23',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: 100,
        }}
      >
        圆形进度动画
      </h1>

      <div style={{display: 'flex', gap: 80, alignItems: 'center'}}>
        {circles.map((circle, index) => (
          <CircleProgress key={index} {...circle} frame={frame} />
        ))}
      </div>

      <div
        style={{
          marginTop: 120,
          fontSize: 32,
          color: '#888',
        }}
      >
        使用 SVG stroke-dashoffset 实现圆形进度
      </div>
    </AbsoluteFill>
  );
};

const CircleProgress = ({radius, target, color, label, delay, frame}) => {
  // Spring 动画
  const progress = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 12,
      stiffness: 80,
      mass: 1,
    },
  });

  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const currentPercent = Math.round(clampedProgress * target);

  // SVG 圆的参数
  const strokeWidth = 15;
  const center = radius + strokeWidth;
  const size = center * 2;

  // 计算圆的周长
  const circumference = 2 * Math.PI * radius;

  // 计算当前的偏移量
  const offset = circumference - (clampedProgress * target / 100) * circumference;

  // 数字淡入
  const opacity = interpolate(frame - delay, [20, 40], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <svg width={size} height={size} style={{transform: 'rotate(-90deg)'}}>
        {/* 背景圆 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#1a1a3e"
          strokeWidth={strokeWidth}
        />

        {/* 进度圆 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.3s ease',
          }}
        />
      </svg>

      {/* 中心的百分比文字 */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <div
          style={{
            fontSize: radius * 0.5,
            fontWeight: 'bold',
            color: color,
            opacity: opacity,
          }}
        >
          {currentPercent}%
        </div>
      </div>

      {/* 标签 */}
      <div
        style={{
          marginTop: 30,
          fontSize: 24,
          color: '#ffffff',
          fontWeight: 'bold',
        }}
      >
        {label}
      </div>
    </div>
  );
};
