import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个霓虹灯文字效果，要求：
 * - 文字发光效果
 * - 多种颜色组合
 * - 闪烁动画
 * - 边框和阴影效果
 * - 模拟真实霓虹灯
 *
 * 【效果说明】
 * 演示如何使用 CSS text-shadow 和 box-shadow 创建发光效果。
 * 通过多层阴影叠加创建逼真的霓虹灯效果。
 */

export const NeonText = () => {
  const frame = useCurrentFrame();

  const neonTexts = [
    {
      text: '霓虹灯',
      color: '#ff0066',
      glowColor: '#ff3399',
      delay: 0,
    },
    {
      text: 'REMOTION',
      color: '#00ffff',
      glowColor: '#66ffff',
      delay: 60,
    },
    {
      text: '动画效果',
      color: '#ffff00',
      glowColor: '#ffff66',
      delay: 120,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 背景墙纹理 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 100px,
              rgba(255, 255, 255, 0.02) 100px,
              rgba(255, 255, 255, 0.02) 101px
            )
          `,
        }}
      />

      {/* 霓虹灯文字 */}
      {neonTexts.map((neon, index) => (
        <NeonItem key={index} {...neon} frame={frame} index={index} />
      ))}

      {/* 底部边框 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 20,
          background: 'linear-gradient(90deg, #ff0066, #00ffff, #ffff00, #ff0066)',
          backgroundSize: '400% 100%',
          animation: 'gradient 3s linear infinite',
        }}
      />

      {/* 说明 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          fontSize: 28,
          color: '#666',
          fontFamily: 'monospace',
        }}
      >
        使用多层 text-shadow 创建霓虹灯效果
      </div>
    </AbsoluteFill>
  );
};

const NeonItem = ({text, color, glowColor, delay, frame, index}) => {
  // 闪烁效果
  const flicker = interpolate(
    (frame - delay) % 120,
    [0, 30, 60, 90, 120],
    [0, 1, 0.8, 1, 0],
    {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}
  );

  // 主要显示时间
  const mainOpacity = interpolate(frame - delay, [0, 20, 100, 120], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 最终透明度
  const opacity = mainOpacity * flicker;

  // 位置
  const y = 200 + index * 150;

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: opacity,
      }}
    >
      {/* 主文字 */}
      <div
        style={{
          fontSize: 120 - index * 20,
          fontWeight: 'bold',
          color: color,
          fontFamily: 'Arial Black, sans-serif',
          textShadow: `
            0 0 5px ${glowColor},
            0 0 10px ${glowColor},
            0 0 20px ${glowColor},
            0 0 40px ${color},
            0 0 80px ${color},
            0 0 90px ${color},
            0 0 100px ${color},
            0 0 150px ${color}
          `,
          letterSpacing: 20,
        }}
      >
        {text}
      </div>

      {/* 管道效果 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: -200,
          right: -200,
          height: 4,
          backgroundColor: color,
          boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${color}`,
          opacity: 0.5,
        }}
      />
    </div>
  );
};
