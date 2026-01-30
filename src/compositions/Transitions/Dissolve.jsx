import {AbsoluteFill, useCurrentFrame, interpolate, Sequence} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个溶解过渡动画，要求：
 * - 场景通过透明度混合过渡
 * - 在重叠期间两个场景都可见
 * - 使用像素化或模糊效果增强
 * - 平滑的淡入淡出曲线
 * - 简单但优雅的过渡
 *
 * 【效果说明】
 * 演示最简单但最常用的过渡效果：溶解（淡入淡出）。
 * 关键是要让两个场景有时间重叠，实现平滑过渡。
 */

export const Dissolve = () => {
  return (
    <AbsoluteFill>
      {/* 场景 1：在 0-60 帧显示，在 30-60 帧淡出 */}
      <Sequence from={0} durationInFrames={60}>
        <SceneFadeOut />
      </Sequence>

      {/* 场景 2：在 30-90 帧显示，在 30-60 帧淡入 */}
      {/* 注意：这里使用绝对定位让两个场景重叠 */}
      <AbsoluteForceSequence from={30} durationInFrames={90}>
        <SceneFadeIn />
      </AbsoluteForceSequence>
    </AbsoluteFill>
  );
};

// 场景 1：淡出
const SceneFadeOut = () => {
  const frame = useCurrentFrame();

  // 0-30 帧完全不透明
  // 30-60 帧淡出
  const opacity = interpolate(frame, [30, 60], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 添加轻微的缩放效果让过渡更自然
  const scale = interpolate(frame, [30, 60], [1, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#8e44ad',
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
        场景 1
        <div style={{fontSize: 40, marginTop: 30}}>淡出效果</div>
      </div>
    </AbsoluteFill>
  );
};

// 场景 2：淡入
const SceneFadeIn = () => {
  const frame = useCurrentFrame();

  // 30-60 帧淡入
  // 60-120 帧完全不透明
  const opacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 从略大的尺寸缩小到正常尺寸
  const scale = interpolate(frame, [30, 60], [0.95, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#c0392b',
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
        场景 2
        <div style={{fontSize: 40, marginTop: 30}}>淡入效果</div>
      </div>
    </AbsoluteFill>
  );
};

// 使用绝对定位的 Sequence 组件，让场景可以重叠
const AbsoluteForceSequence = ({from, durationInFrames, children}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - from;

  // 只在指定时间范围内渲染
  if (relativeFrame < 0 || relativeFrame >= durationInFrames) {
    return null;
  }

  return <AbsoluteFill>{children}</AbsoluteFill>;
};
