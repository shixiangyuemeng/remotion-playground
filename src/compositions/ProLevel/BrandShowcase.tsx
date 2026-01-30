import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个品牌展示宣传片效果，要求：
 * - 动态 Logo 展示
 - 扫光效果
 - 粒子爆发
 - 3D 旋转 Logo
 - 品牌色动画
 - Slogan 逐字显示
 * 专业转场
 *
 * 【效果说明】
 * 演示如何创建品牌级宣传片开场。
 * 适合产品发布、品牌介绍等场景。
 */

export const BrandShowcase = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        overflow: 'hidden',
      }}
    >
      {/* 背景光效 */}
      <AmbientLight frame={frame} />

      {/* 粒子爆发 */}
      <ParticleExplosion frame={frame} />

      {/* Logo 展示 */}
      <LogoReveal frame={frame} />

      {/* 扫光效果 */}
      <LightSweep frame={frame} />

      {/* Slogan */}
      <SloganReveal frame={frame} />

      {/* 品牌色条 */}
      <BrandBar frame={frame} />
    </AbsoluteFill>
  );
};

// 环境光
const AmbientLight = ({frame}) => {
  const rotation = interpolate(frame, [0, 300], [0, 360], {
    extrapolateRight: 'loop',
  });

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `conic-gradient(from ${rotation}deg,
          transparent 0deg,
          rgba(52, 152, 219, 0.1) 90deg,
          transparent 180deg,
          rgba(231, 76, 60, 0.1) 270deg,
          transparent 360deg)`,
      }}
    />
  );
};

// Logo 展示
const LogoReveal = ({frame}) => {
  // 弹性缩放
  const scale = spring({
    frame: frame - 30,
    fps: 30,
    config: {
      damping: 8,
      stiffness: 100,
      mass: 0.5,
    },
  });

  const clampedScale = Math.min(Math.max(scale, 0), 1);

  // 旋转 3D
  const rotateY = interpolate(frame, [30, 90], [-180, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 透明度
  const opacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${clampedScale})`,
        opacity: opacity,
      }}
    >
      {/* Logo 容器 */}
      <div
        style={{
          width: 400,
          height: 400,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotateY}deg)`,
        }}
      >
        {/* 外圈 */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '8px solid #3498db',
            borderRadius: '50%',
            transform: 'rotateZ(0deg)',
          }}
        />

        {/* 内圈 */}
        <div
          style={{
            position: 'absolute',
            top: 50,
            left: 50,
            width: 280,
            height: 280,
            transform: 'translate(-50%, -50%)',
            border: '4px solid #e74c3c',
            borderRadius: '50%',
          }}
        />

        {/* 中心文字 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 72,
            fontWeight: 'bold',
            color: '#ffffff',
            textShadow: '0 0 30px rgba(52, 152, 219, 0.8)',
          }}
        >
          LOGO
        </div>
      </div>
    </div>
  );
};

// 扫光效果
const LightSweep = ({frame}) => {
  const sweepX = interpolate(frame, [60, 150], [-200, 2120], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const opacity = interpolate(frame, [60, 80, 130, 150], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: sweepX,
        width: 200,
        height: '100%',
        background: 'linear-gradient(90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent)',
        opacity: opacity,
        pointerEvents: 'none',
        transform: 'skewX(-20deg)',
      }}
    />
  );
};

// 粒子爆发
const ParticleExplosion = ({frame}) => {
  const particles = Array.from({length: 50}, (_, i) => {
    const angle = (i / 50) * Math.PI * 2;
    const distance = spring({
      frame: frame - 45,
      fps: 30,
      config: {
        damping: 10,
        stiffness: 120,
        mass: 0.5,
      },
    });

    const clampedDistance = Math.min(Math.max(distance, 0), 1) * 800;
    const x = Math.cos(angle) * clampedDistance;
    const y = Math.sin(angle) * clampedDistance;

    const opacity = interpolate(frame - 45, [0, 20, 60], [1, 1, 0], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    });

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: i % 2 === 0 ? '#3498db' : '#e74c3c',
          transform: `translate(${x}px, ${y}px)`,
          opacity: opacity,
          boxShadow: `0 0 10px ${i % 2 === 0 ? '#3498db' : '#e74c3c'}`,
        }}
      />
    );
  });

  return <>{particles}</>;
};

// Slogan 展示
const SloganReveal = ({frame}) => {
  const text = 'CREATING THE FUTURE';
  const startFrame = 120;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 300,
        left: 0,
        right: 0,
        textAlign: 'center',
      }}
    >
      {text.split('').map((char, index) => {
        const delay = index * 5;
        const opacity = interpolate(frame - startFrame - delay, [0, 20], [0, 1], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });

        const y = interpolate(frame - startFrame - delay, [0, 20], [50, 0], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });

        const hue = interpolate(index, [0, text.length], [200, 280]);

        return (
          <span
            key={index}
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: `hsl(${hue}, 100%, 70%)`,
              opacity: opacity,
              transform: `translateY(${y}px)`,
              display: 'inline-block',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
              marginRight: 5,
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

// 品牌色条
const BrandBar = ({frame}) => {
  const width = interpolate(frame, [150, 210], [0, 1000], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const opacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 200,
        left: 0,
        height: 6,
        backgroundColor: '#3498db',
        width: width,
        opacity: opacity,
        boxShadow: '0 0 20px #3498db',
      }}
    />
  );
};
