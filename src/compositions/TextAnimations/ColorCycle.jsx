import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个文字颜色变换动画，要求：
 * - 文字颜色在彩虹色谱中循环
 * - 颜色平滑过渡
 * - 支持多种颜色变换模式
 * - 文字大小随颜色变化脉冲
 * - 背景与文字形成对比
 *
 * 【效果说明】
 * 演示如何动态改变文字颜色，使用 HSL 色彩空间实现彩虹效果。
 * 通过 interpolate 计算 hue 值，实现颜色循环。
 */

export const ColorCycle = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RainbowText frame={frame} />
      <PulseText frame={frame} />
      <GradientText frame={frame} />
    </AbsoluteFill>
  );
};

// 彩虹循环文字
const RainbowText = ({frame}) => {
  const text = '彩虹色彩循环';

  // Hue 从 0 到 360 循环
  const baseHue = interpolate(frame % 180, [0, 180], [0, 360]);

  const letters = text.split('').map((letter, index) => {
    // 每个字母有不同的色相偏移
    const hueOffset = index * 20;
    const hue = (baseHue + hueOffset) % 360;

    return (
      <span
        key={index}
        style={{
          color: `hsl(${hue}, 100%, 60%)`,
          display: 'inline-block',
        }}
      >
        {letter}
      </span>
    );
  });

  return (
    <div
      style={{
        fontSize: 96,
        fontWeight: 'bold',
        marginBottom: 80,
        letterSpacing: 8,
      }}
    >
      {letters}
    </div>
  );
};

// 脉冲变色文字
const PulseText = ({frame}) => {
  const text = '脉冲变色效果';

  // 颜色循环
  const hue = interpolate(frame % 120, [0, 120], [0, 360]);

  // 大小脉冲
  const scale = spring({
    frame: frame % 60,
    fps: 30,
    config: {
      damping: 10,
      stiffness: 100,
    },
  });

  // 透明度脉冲
  const opacity = interpolate(frame % 60, [0, 30, 60], [0.5, 1, 0.5], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontSize: 64,
        fontWeight: 'bold',
        color: `hsl(${hue}, 100%, 50%)`,
        marginBottom: 80,
        transform: `scale(${scale})`,
        opacity: opacity,
      }}
    >
      {text}
    </div>
  );
};

// 渐变文字
const GradientText = ({frame}) => {
  const text = '动态渐变文字';

  // 创建渐变背景
  const hue1 = interpolate(frame % 180, [0, 180], [0, 180]);
  const hue2 = interpolate(frame % 180, [0, 180], [180, 360]);

  return (
    <div
      style={{
        fontSize: 72,
        fontWeight: 'bold',
        background: `linear-gradient(90deg, hsl(${hue1}, 100%, 50%), hsl(${hue2}, 100%, 50%))`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {text}
    </div>
  );
};
