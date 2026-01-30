import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个 3D 翻转动画，要求：
 * - 多张卡片依次翻转
 * - 使用 3D rotateX 或 rotateY
 * - 翻转时有弹性效果
 * - 显示卡片翻转的层次感
 * - 支持翻转方向控制
 *
 * 【效果说明】
 * 演示如何创建 3D 翻转效果，使用 spring 动画让翻转更有弹性。
 */

export const ThreeDFlip = () => {
  const frame = useCurrentFrame();

  const cards = [
    {id: 1, title: '卡片 1', color: '#3498db', delay: 0},
    {id: 2, title: '卡片 2', color: '#e74c3c', delay: 20},
    {id: 3, title: '卡片 3', color: '#2ecc71', delay: 40},
    {id: 4, title: '卡片 4', color: '#f39c12', delay: 60},
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f0f23',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1200,
      }}
    >
      <h1
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: 80,
        }}
      >
        3D 翻转动画
      </h1>

      <div
        style={{
          display: 'flex',
          gap: 40,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {cards.map((card) => (
          <FlipCard key={card.id} {...card} frame={frame} />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 80,
          fontSize: 32,
          color: '#888',
        }}
      >
        使用 spring + rotateX 实现翻转
      </div>
    </AbsoluteFill>
  );
};

const FlipCard = ({id, title, color, delay, frame}) => {
  // Spring 动画
  const flipProgress = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 10,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const clampedProgress = Math.min(Math.max(flipProgress, 0), 1);

  // 从 -180 度翻转到 0 度（或 0 到 180）
  const rotateX = interpolate(clampedProgress, [0, 1], [-180, 0]);

  // 缩放效果配合翻转
  const scale = interpolate(clampedProgress, [0, 0.5, 1], [0.5, 1.1, 1]);

  // 透明度
  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        width: 300,
        height: 200,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotateX}deg) scale(${scale})`,
        opacity: opacity,
      }}
    >
      {/* 正面 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          backgroundColor: color,
          borderRadius: 15,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          {title}
        </div>
      </div>

      {/* 背面 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          backgroundColor: '#2a2a4e',
          borderRadius: 15,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'rotateX(180deg)',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
          border: `4px solid ${color}`,
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: color,
                          textAlign: 'center',
            padding: 20,
          }}
        >
          背面内容
        </div>
      </div>
    </div>
  );
};
