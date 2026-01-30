import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个电影级摄像机镜头效果，要求：
 * - 缓慢的推镜头效果
 * - 电影感调色（LUT 风格）
 * - 宽银幕黑边
 - - 多层景深
 * - 电影颗粒效果
 * - 缓慢的摄像机运动
 *
 * 【效果说明】
 * 演示如何创建电影级摄像机效果。
 * 使用缩放、裁剪和调色模拟电影质感。
 */

export const CinematicCamera = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      {/* 场景内容 */}
      <CameraMovement frame={frame} />

      {/* 电影调色层 */}
      <ColorGrading frame={frame} />

      {/* 宽银幕黑边 */}
      <Letterbox />

      {/* 颗粒效果 */}
      <FilmGrain frame={frame} />

      {/* 片名和水印 */}
      <FilmMetadata frame={frame} />
    </AbsoluteFill>
  );
};

// 摄像机运动组件
const CameraMovement = ({frame}) => {
  // 推镜头：从 1.2x 缩放到 1.0x（缓慢推近）
  const zoom = interpolate(frame, [0, 300], [1.2, 1.0], {
    extrapolateRight: 'clamp',
  });

  // 极其缓慢的水平移动
  const panX = interpolate(frame, [0, 300], [-30, 30]);

  // 垂直微调
  const panY = interpolate(frame, [0, 300], [-10, 10]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
      }}
    >
      {/* 主场景 */}
      <SceneContent />
    </div>
  );
};

// 场景内容
const SceneContent = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg,
          #1a1a2e 0%,
          #16213e 50%,
          #0f3460 100%)`,
        position: 'relative',
      }}
    >
      {/* 背景山脉 */}
      <div
        style={{
          position: 'absolute',
          bottom: 300,
          left: -200,
          width: 2800,
          height: 400,
          background: 'linear-gradient(to top, #1a1a2e, transparent)',
          clipPath: 'polygon(0% 100%, 10% 30%, 25% 60%, 40% 40%, 55% 70%, 70% 50%, 85% 60%, 100% 30%, 100% 100%)',
        }}
      />

      {/* 太阳/月亮 */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          right: 200,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ffecd2 0%, #fcb69f 100%)',
          boxShadow: '0 0 100px 50px rgba(252, 182, 159, 0.3)',
        }}
      />

      {/* 中景元素 */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          left: 200,
          fontSize: 48,
          fontWeight: 'bold',
          color: '#ffffff',
          textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
        }}
      >
        CINEMATIC
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 150,
          left: 200,
          fontSize: 28,
          color: '#cccccc',
          textShadow: '1px 1px 5px rgba(0,0,0,0.8)',
        }}
      >
        电影级摄像机效果演示
      </div>

      {/* 光效 */}
      <LightRays />
    </div>
  );
};

// 光射线效果
const LightRays = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: -100,
        right: 100,
        width: 600,
        height: 800,
        background: 'linear-gradient(to bottom, rgba(255,236,210,0.3), transparent)',
        transform: 'rotate(-15deg)',
        pointerEvents: 'none',
      }}
    />
  );
};

// 电影调色层
const ColorGrading = ({frame}) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        // 电影感调色：增加对比度、稍微偏青色调
        background: 'linear-gradient(to bottom, rgba(0,20,40,0.2), transparent)',
        mixBlendMode: 'overlay',
      }}
    />
  );
};

// 宽银幕黑边
const Letterbox = () => {
  const barHeight = 100; // 2.35:1 宽高比

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: barHeight,
          backgroundColor: '#000000',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: barHeight,
          backgroundColor: '#000000',
        }}
      />
    </>
  );
};

// 电影颗粒效果
const FilmGrain = ({frame}) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.05,
        backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYkVyVElwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PC9zdmc+')`,
        pointerEvents: 'none',
      }}
    />
  );
};

// 片名和水印
const FilmMetadata = ({frame}) => {
  const opacity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const y = interpolate(frame, [20, 60], [50, 120], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: y,
        right: 150,
        opacity: opacity,
        textAlign: 'right',
      }}
    >
      <div
        style={{
          fontSize: 32,
          color: '#ffffff',
          textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
          fontWeight: 'bold',
        }}
      >
        REMOTION CINEMATIC
      </div>
      <div
        style={{
          fontSize: 20,
          color: '#aaaaaa',
          marginTop: 8,
        }}
      >
        Professional Camera Movement
      </div>
    </div>
  );
};
