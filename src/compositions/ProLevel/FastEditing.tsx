import {AbsoluteFill, useCurrentFrame, interpolate, Sequence} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个快速剪辑风格效果，要求：
 * - 快速切换多个场景
 * - 节奏感强的动画
 * - 缩放冲击
 * - 闪烁过渡
 * - 文字叠加
 * - 动态形状
 * 社交媒体风格
 *
 * 【效果说明】
 * 演示如何创建 Instagram/TikTok 风格的快速剪辑。
 * 短镜头、快节奏、强视觉冲击。
 */

export const FastEditing = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000000'}}>
      {/* 场景 1：文字冲击 */}
      <Sequence from={0} durationInFrames={40}>
        <Scene1 />
      </Sequence>

      {/* 场景 2：几何图形 */}
      <Sequence from={30} durationInFrames={40}>
        <Scene2 />
      </Sequence>

      {/* 场景 3：色块冲击 */}
      <Sequence from={60} durationInFrames={40}>
        <Scene3 />
      </Sequence>

      {/* 场景 4：文字闪现 */}
      <Sequence from={90} durationInFrames={40}>
        <Scene4 />
      </Sequence>

      {/* 场景 5：线条动画 */}
      <Sequence from={120} durationInFrames={40}>
        <Scene5 />
      </Sequence>

      {/* 场景 6：粒子爆发 */}
      <Sequence from={150} durationInFrames={40}>
        <Scene6 />
      </Sequence>

      {/* 场景 7：最终标题 */}
      <Sequence from={180} durationInFrames={60}>
        <Scene7 />
      </Sequence>

      {/* 闪烁叠加层 */}
      <GlitchOverlay />
    </AbsoluteFill>
  );
};

// 场景 1：文字冲击
const Scene1 = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 20, 40], [3, 1, 0.8], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [0, 10, 30, 40], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: opacity,
      }}
    >
      <div
        style={{
          fontSize: 200,
          fontWeight: '900',
          color: '#ffffff',
          transform: `scale(${scale})`,
          textShadow: '0 0 60px rgba(255, 255, 255, 0.8)',
        }}
      >
        IMPACT
      </div>
    </div>
  );
};

// 场景 2：几何图形
const Scene2 = () => {
  const frame = useCurrentFrame();

  const rotation = interpolate(frame, [0, 40], [0, 180]);

  const scale = interpolate(frame, [0, 20, 40], [0, 1.5, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a2e',
      }}
    >
      <div
        style={{
          width: 400,
          height: 400,
          border: '20px solid #e74c3c',
          transform: `rotate(${rotation}deg) scale(${scale})`,
        }}
      />
    </div>
  );
};

// 场景 3：色块冲击
const Scene3 = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {[0, 1, 2, 3].map((i) => {
        const delay = i * 5;
        const x = interpolate(frame - delay, [0, 20], [-1920, 0], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });

        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12'];

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: i * 270,
              left: x,
              width: '100%',
              height: 270,
              backgroundColor: colors[i],
            }}
          />
        );
      })}
    </div>
  );
};

// 场景 4：文字闪现
const Scene4 = () => {
  const frame = useCurrentFrame();

  const words = ['FAST', 'EDITING', 'STYLE'];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 60,
        backgroundColor: '#000000',
      }}
    >
      {words.map((word, index) => {
        const delay = index * 5;
        const opacity = interpolate(frame - delay, [0, 10, 25, 40], [0, 1, 1, 0], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });

        const scale = interpolate(frame - delay, [0, 20], [2, 1], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });

        return (
          <div
            key={index}
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#ffffff',
              opacity: opacity,
              transform: `scale(${scale})`,
            }}
          >
            {word}
          </div>
        );
      })}
    </div>
  );
};

// 场景 5：线条动画
const Scene5 = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        position: 'relative',
      }}
    >
      {Array.from({length: 20}).map((_, i) => {
        const delay = i * 2;
        const height = interpolate(frame - delay, [0, 20], [0, 1080], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });

        const x = 96 + i * 90;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: 0,
              width: 80,
              height: height,
              backgroundColor: `hsl(${(i / 20) * 360}, 100%, 60%)`,
            }}
          />
        );
      })}
    </div>
  );
};

// 场景 6：粒子爆发
const Scene6 = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0a',
      }}
    >
      {Array.from({length: 100}).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = interpolate(frame, [0, 30], [0, 1000], {
          extrapolateRight: 'clamp',
        });

        const x = 960 + Math.cos(angle) * distance;
        const y = 540 + Math.sin(angle) * distance;

        const opacity = interpolate(frame, [0, 10, 30], [0, 1, 0], {
          extrapolateRight: 'clamp',
        });

        const size = Math.random() * 20 + 10;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
              opacity: opacity,
            }}
          />
        );
      })}
    </div>
  );
};

// 场景 7：最终标题
const Scene7 = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 30, 60], [2, 1, 1], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const rotation = interpolate(frame, [0, 30], [-10, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: opacity,
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: '900',
          color: '#ffffff',
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          textShadow: '0 0 60px rgba(255, 255, 255, 0.8)',
          marginBottom: 30,
        }}
      >
        FAST EDITING
      </div>

      <div
        style={{
          fontSize: 36,
          color: '#cccccc',
        }}
      >
        快速剪辑风格
      </div>
    </div>
  );
};

// 故障效果叠加层
const GlitchOverlay = () => {
  const frame = useCurrentFrame();

  // 随机故障效果
  const shouldGlitch = Math.random() < 0.1;

  const offsetX = shouldGlitch ? Math.random() * 20 - 10 : 0;
  const offsetY = shouldGlitch ? Math.random() * 10 - 5 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'add',
        transform: `translate(${offsetX}px, ${offsetY}px)`,
      }}
    >
      {shouldGlitch && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            top: Math.random() * 1080,
          }}
        />
      )}
    </div>
  );
};
