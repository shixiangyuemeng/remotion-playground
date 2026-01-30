import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个数字计数动画，要求：
 * - 数字从 0 开始计数到目标值
 * - 支持整数和小数
 * - 使用弹性动画效果
 * - 显示多个不同的计数器
 * - 可以自定义格式化（如货币、百分比等）
 *
 * 【效果说明】
 * 演示如何创建动态计数动画，使用 interpolate 和 spring 实现平滑的数字增长。
 */

export const CounterAnimation = () => {
  const frame = useCurrentFrame();

  const counters = [
    {
      label: '活跃用户',
      value: 1234567,
      prefix: '',
      suffix: '',
      color: '#3498db',
      delay: 0,
      decimals: 0,
    },
    {
      label: '转化率',
      value: 87.5,
      prefix: '',
      suffix: '%',
      color: '#2ecc71',
      delay: 20,
      decimals: 1,
    },
    {
      label: '收入',
      value: 987654,
      prefix: '¥',
      suffix: '',
      color: '#f39c12',
      delay: 40,
      decimals: 0,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a2e',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
      }}
    >
      <h1
        style={{
          fontSize: 72,
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: 120,
        }}
      >
        数字计数动画
      </h1>

      <div
        style={{
          display: 'flex',
          gap: 100,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {counters.map((counter, index) => (
          <Counter key={index} {...counter} frame={frame} />
        ))}
      </div>

      <div
        style={{
          marginTop: 120,
          fontSize: 32,
          color: '#888',
        }}
      >
        使用 interpolate 实现数字平滑增长
      </div>
    </AbsoluteFill>
  );
};

const Counter = ({label, value, prefix, suffix, color, delay, decimals, frame}) => {
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

  // 计算当前值
  const currentValue = value * clampedProgress;

  // 格式化数字
  const formattedValue = formatNumber(currentValue, decimals);

  // 缩放效果
  const scale = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 8,
      stiffness: 100,
      mass: 0.5,
    },
  });

  const clampedScale = Math.min(Math.max(scale, 0), 1.1);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* 数字显示 */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 'bold',
          color: color,
          transform: `scale(${clampedScale})`,
        }}
      >
        {prefix}
        {formattedValue}
        {suffix}
      </div>

      {/* 标签 */}
      <div
        style={{
          fontSize: 28,
          color: '#ffffff',
          marginTop: 20,
          fontWeight: 'bold',
        }}
      >
        {label}
      </div>
    </div>
  );
};

// 格式化数字函数
const formatNumber = (num, decimals = 0) => {
  // 如果是小数
  if (decimals > 0) {
    return num.toFixed(decimals);
  }

  // 如果是整数，添加千位分隔符
  const rounded = Math.round(num);
  return rounded.toLocaleString('en-US');
};
