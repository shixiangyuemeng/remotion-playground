import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个视差滚动动画，要求：
 * - 多个图层以不同速度移动
 * - 模拟 3D 深度效果
 * - 支持水平和垂直滚动
 * - 背景移动较慢，前景移动较快
 * - 可以叠加多个元素层
 *
 * 【效果说明】
 * 演示如何创建视差效果，让不同层次的元素以不同速度移动。
 */

export const Parallax = () => {
  const frame = useCurrentFrame();

  // 滚动进度（0 到 1）
  const scrollProgress = interpolate(frame, [0, 200], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#87CEEB',
        overflow: 'hidden',
      }}
    >
      {/* 远景层 - 移动最慢 */}
      <ParallaxLayer
        speed={0.2}
        scrollProgress={scrollProgress}
        direction="left"
      >
        <BackgroundMountains />
      </ParallaxLayer>

      {/* 中景层 - 中等速度 */}
      <ParallaxLayer
        speed={0.5}
        scrollProgress={scrollProgress}
        direction="left"
      >
        <MiddleGround />
      </ParallaxLayer>

      {/* 前景层 - 移动最快 */}
      <ParallaxLayer
        speed={1.0}
        scrollProgress={scrollProgress}
        direction="left"
      >
        <Foreground />
      </ParallaxLayer>

      {/* 标题 */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 100,
          fontSize: 64,
          fontWeight: 'bold',
          color: '#ffffff',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
                        zIndex: 100,
        }}
      >
        视差滚动效果
      </div>

      {/* 说明 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 100,
          fontSize: 32,
          color: '#ffffff',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      >
        不同图层以不同速度移动
      </div>
    </AbsoluteFill>
  );
};

// 视差图层组件
const ParallaxLayer = ({speed, scrollProgress, direction, children}) => {
  const translateX = scrollProgress * speed * 1920;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: `translateX(-${translateX}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

// 远景：山脉
const BackgroundMountains = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '300%',
        height: 600,
      }}
    >
      {Array.from({length: 10}).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: i * 400,
            bottom: 0,
            width: 0,
            height: 0,
            borderLeft: '200px solid transparent',
            borderRight: '200px solid transparent',
            borderBottom: `${300 + (i % 3) * 100}px solid #6B8E23`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
};

// 中景：树木
const MiddleGround = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '300%',
        height: 400,
      }}
    >
      {Array.from({length: 15}).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: i * 250 + 50,
            bottom: 0,
            width: 40,
            height: 150 + (i % 4) * 30,
            backgroundColor: '#228B22',
            borderRadius: '20px 20px 0 0',
          }}
        >
          {/* 树冠 */}
          <div
            style={{
              position: 'absolute',
              top: -80,
              left: -60,
              width: 160,
              height: 100,
              backgroundColor: '#32CD32',
              borderRadius: '50%',
            }}
          />
        </div>
      ))}
    </div>
  );
};

// 前景：草地
const Foreground = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '300%',
        height: 200,
        backgroundColor: '#228B22',
      }}
    >
      {/* 草地上的小花 */}
      {Array.from({length: 20}).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: i * 180 + 80,
            bottom: 150,
            width: 30,
            height: 30,
            borderRadius: '50%',
            backgroundColor: ['#FF69B4', '#FFD700', '#FF6347', '#9370DB'][
              i % 4
            ],
          }}
        />
      ))}
    </div>
  );
};
