import {AbsoluteFill, useCurrentFrame, interpolate, Sequence} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个旋转切换动画，要求：
 * - 场景旋转进入和退出
 * - 配合缩放效果增强视觉冲击
 * - 支持顺时针和逆时针旋转
 * - 使用 rotate 和 scale 组合
 * - 3D 旋转效果
 *
 * 【效果说明】
 * 演示如何使用旋转创建独特的场景过渡效果。
 * 2D 旋转和 3D 旋转可以创造不同的视觉效果。
 */

export const RotateTransition = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={75}>
        <RotateOutScene />
      </Sequence>

      <Sequence from={75} durationInFrames={75}>
        <RotateInScene />
      </Sequence>
    </AbsoluteFill>
  );
};

// 旋转退出的场景
const RotateOutScene = () => {
  const frame = useCurrentFrame();

  // 0-45 帧：正常显示
  // 45-75 帧：旋转并缩放退出
  const rotation = interpolate(frame, [45, 75], [0, 90], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [45, 75], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [60, 75], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#e67e22',
        opacity: opacity,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transformOrigin: 'center center',
      }}
    >
      <div
        style={{
                          fontSize: 96,
          fontWeight: 'bold',
          color: '#ffffff',
                          textAlign: 'center',
                          transform: `rotate(${-rotation}deg)`, // 反向旋转文字保持水平
                        }}
                      >
        旋转退出
        <div style={{fontSize: 40, marginTop: 30}}>2D 旋转</div>
      </div>
    </AbsoluteFill>
  );
};

// 旋转进入的场景
const RotateInScene = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - 75;

  // 0-30 帧：从反向旋转进入
  const rotation = interpolate(relativeFrame, [0, 30], [-90, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(relativeFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(relativeFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#16a085',
        opacity: opacity,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transformOrigin: 'center center',
      }}
    >
      <div
        style={{
          fontSize: 96,
          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center',
          transform: `rotate(${-rotation}deg)`, // 反向旋转文字保持水平
        }}
      >
        旋转进入
        <div style={{fontSize: 40, marginTop: 30}}>平滑过渡</div>
      </div>
    </AbsoluteFill>
  );
};
