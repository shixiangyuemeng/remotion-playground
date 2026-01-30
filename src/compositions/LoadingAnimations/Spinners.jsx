import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建多种加载动画效果，要求：
 * - 旋转加载器
 * - 脉冲加载器
 * - 波浪加载器
 * - 点状加载器
 * - 条形加载器
 * - 使用纯 CSS 动画和插值
 *
 * 【效果说明】
 * 演示多种常见的加载动画效果。
 * 使用旋转、缩放、透明度变化创建不同的加载指示器。
 */

export const Spinners = () => {
  const frame = useCurrentFrame();

  const loaders = [
    {type: 'rotate', title: '旋转加载器'},
    {type: 'pulse', title: '脉冲加载器'},
    {type: 'dots', title: '点状加载器'},
    {type: 'bars', title: '条形加载器'},
    {type: 'wave', title: '波浪加载器'},
    {type: 'bounce', title: '弹跳加载器'},
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a2e',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 标题 */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          fontSize: 64,
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        加载动画集合
      </div>

      {/* 加载器网格 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 60,
          padding: 60,
        }}
      >
        {loaders.map((loader, index) => (
          <LoaderItem key={index} {...loader} frame={frame} index={index} />
        ))}
      </div>

      {/* 说明 */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          fontSize: 28,
          color: '#888',
        }}
      >
        使用 CSS 变换和插值创建各种加载效果
      </div>
    </AbsoluteFill>
  );
};

const LoaderItem = ({type, title, frame, index}) => {
  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
  const color = colors[index % colors.length];

  const renderLoader = () => {
    switch (type) {
      case 'rotate':
        return <RotateLoader frame={frame} color={color} />;
      case 'pulse':
        return <PulseLoader frame={frame} color={color} />;
      case 'dots':
        return <DotsLoader frame={frame} color={color} />;
      case 'bars':
        return <BarsLoader frame={frame} color={color} />;
      case 'wave':
        return <WaveLoader frame={frame} color={color} />;
      case 'bounce':
        return <BounceLoader frame={frame} color={color} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        padding: 40,
        backgroundColor: '#2a2a4e',
        borderRadius: 20,
        minWidth: 280,
      }}
    >
      {renderLoader()}
      <div
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        {title}
      </div>
    </div>
  );
};

// 旋转加载器
const RotateLoader = ({frame, color}) => {
  const rotation = interpolate(frame, [0, 60], [0, 360], {
    extrapolateRight: 'loop',
  });

  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        border: '8px solid transparent',
        borderTopColor: color,
        borderRightColor: color,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
};

// 脉冲加载器
const PulseLoader = ({frame, color}) => {
  const scale = interpolate(frame % 40, [0, 20, 40], [0.8, 1.2, 0.8], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame % 40, [0, 20, 40], [1, 0.5, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        backgroundColor: color,
        transform: `scale(${scale})`,
        opacity: opacity,
      }}
    />
  );
};

// 点状加载器
const DotsLoader = ({frame, color}) => {
  const dots = [0, 1, 2];

  return (
    <div style={{display: 'flex', gap: 15}}>
      {dots.map((i) => {
        const delay = i * 10;
        const scale = interpolate((frame - delay) % 40, [0, 20, 40], [0.8, 1.5, 0.8], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: color,
              transform: `scale(${scale})`,
            }}
          />
        );
      })}
    </div>
  );
};

// 条形加载器
const BarsLoader = ({frame, color}) => {
  const bars = [0, 1, 2, 3, 4];

  return (
    <div style={{display: 'flex', gap: 8, alignItems: 'flex-end'}}>
      {bars.map((i) => {
        const delay = i * 5;
        const height = interpolate((frame - delay) % 40, [0, 20, 40], [20, 80, 20], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              width: 12,
              height: height,
              backgroundColor: color,
              borderRadius: 6,
            }}
          />
        );
      })}
    </div>
  );
};

// 波浪加载器
const WaveLoader = ({frame, color}) => {
  const waves = [0, 1, 2];

  return (
    <div style={{display: 'flex', gap: 10}}>
      {waves.map((i) => {
        const delay = i * 10;
        const y = interpolate((frame - delay) % 40, [0, 20, 40], [-20, 0, -20], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              width: 16,
              height: 60,
              borderRadius: 8,
              backgroundColor: color,
              transform: `translateY(${y}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

// 弹跳加载器
const BounceLoader = ({frame, color}) => {
  const y = interpolate(frame % 30, [0, 15, 30], [0, -30, 0], {
    extrapolateRight: 'clamp',
  });

  const scaleX = interpolate(frame % 30, [0, 15, 30], [1.2, 0.8, 1.2], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        backgroundColor: color,
        transform: `translateY(${y}px) scaleX(${scaleX})`,
      }}
    />
  );
};
