import {AbsoluteFill, useCurrentFrame, interpolate, Sequence} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个缩放过渡动画，要求：
 * - 场景从小到大的缩放效果
 * - 配合淡入淡出
 * - 平滑的缩放曲线
 * - 支持放大和缩小两种模式
 * - 使用 scale 和 opacity 组合
 *
 * 【效果说明】
 * 演示如何使用缩放创建场景过渡效果。
 scale 和 opacity 的组合可以创造出更有冲击力的过渡。
 */

export const ScaleTransition = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={60}>
        <ZoomInScene />
      </Sequence>

      <Sequence from={60} durationInFrames={60}>
        <ZoomOutScene />
      </Sequence>
    </AbsoluteFill>
  );
};

// 放大进入的场景
const ZoomInScene = () => {
  const frame = useCurrentFrame();

  // 从 0 到 30 帧：放大并淡入
  const scale = interpolate(frame, [0, 30], [0.3, 1], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 在 30-60 帧时缩小并淡出
  const scaleOut = interpolate(frame, [30, 60], [1, 1.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacityOut = interpolate(frame, [45, 60], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const finalScale = frame < 30 ? scale : scaleOut;
  const finalOpacity = frame < 45 ? opacity : opacityOut;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#9b59b6',
        opacity: finalOpacity,
        transform: `scale(${finalScale})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: 100,
          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        放大进入
        <div style={{fontSize: 40, marginTop: 30}}>Scale + Fade</div>
      </div>
    </AbsoluteFill>
  );
};

// 缩小退出的场景
const ZoomOutScene = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - 60;

  // 从 0 到 30 帧：从大缩小并淡入
  const scale = interpolate(relativeFrame, [0, 30], [1.5, 1], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(relativeFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1abc9c',
        opacity: opacity,
        transform: `scale(${scale})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: 100,
                          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        缩小进入
        <div style={{fontSize: 40, marginTop: 30}}>缩小效果</div>
      </div>
    </AbsoluteFill>
  );
};
