import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个欢迎页面动画，要求：
 * - 标题从淡入并从下方滑入
 * - 副标题延迟出现
 * - 包含项目分类列表，逐项显示
 * - 背景使用渐变色
 * - 使用 spring 动画实现流畅效果
 *
 * 【效果说明】
 * 这是 Remotion Playground 的欢迎页面，展示项目的功能分类。
 * 使用了 spring 动画、延迟序列、渐变背景等技术。
 */

export const Welcome = ({title}) => {
  const frame = useCurrentFrame();

  // 标题动画
  const titleScale = spring({
    frame: frame - 10,
    fps: 30,
    config: {
      damping: 10,
      stiffness: 100,
      mass: 1,
    },
  });

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [0, 40], [100, 0], {
    extrapolateRight: 'clamp',
  });

  // 副标题动画
  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 分类列表项动画
  const categories = [
    '文字动画',
    '过渡动画',
    '数据可视化',
    '3D 交互',
    '音频响应',
  ];

  const listItems = categories.map((category, index) => {
    const startFrame = 60 + index * 15;
    const itemOpacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
      extrapolateRight: 'clamp',
    });
    const itemX = interpolate(frame, [startFrame, startFrame + 20], [-50, 0], {
      extrapolateRight: 'clamp',
    });

    return (
      <div
        key={index}
        style={{
          opacity: itemOpacity,
          transform: `translateX(${itemX}px)`,
          fontSize: 32,
          margin: '10px 0',
          color: '#ffffff',
          fontWeight: 300,
        }}
      >
        {index + 1}. {category}
      </div>
    );
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          fontSize: 96,
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: 40,
          textAlign: 'center',
        }}
      >
        {title}
      </div>

      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: 36,
          color: '#ffffff',
          marginBottom: 60,
          fontWeight: 300,
        }}
      >
        探索 Remotion 动画的各种可能性
      </div>

      <div style={{marginTop: 60}}>{listItems}</div>
    </AbsoluteFill>
  );
};
