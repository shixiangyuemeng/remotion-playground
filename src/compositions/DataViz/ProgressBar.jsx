import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个进度条动画，要求：
 * - 显示多个不同类型的进度条
 * - 从 0% 动画到目标百分比
 * - 使用弹性动画效果
 * - 显示百分比数字
 * - 支持不同颜色和样式
 *
 * 【效果说明】
 * 演示如何创建动态进度条，使用 spring 动画让进度条增长更自然。
 */

export const ProgressBar = () => {
  const frame = useCurrentFrame();

  const progressItems = [
    {label: '项目完成度', target: 85, color: '#3498db', delay: 0},
    {label: '用户满意度', target: 92, color: '#2ecc71', delay: 20},
    {label: '性能优化', target: 78, color: '#e74c3c', delay: 40},
    {label: '代码覆盖率', target: 95, color: '#9b59b6', delay: 60},
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a2e',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
      }}
    >
      <h1
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: 100,
          textAlign: 'center',
        }}
      >
        进度条动画
      </h1>

      <div style={{width: '100%', maxWidth: 1200, gap: 40, display: 'flex', flexDirection: 'column'}}>
        {progressItems.map((item, index) => (
          <ProgressBarItem key={index} {...item} frame={frame} />
        ))}
      </div>

      <div
        style={{
          marginTop: 100,
          fontSize: 32,
          color: '#888',
        }}
      >
        使用 spring 实现弹性动画
      </div>
    </AbsoluteFill>
  );
};

const ProgressBarItem = ({label, target, color, delay, frame}) => {
  // 使用 spring 动画
  const progress = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 12,
      stiffness: 80,
      mass: 1,
    },
  });

  // 限制进度在 0-1 之间
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  // 当前百分比
  const currentPercent = Math.round(clampedProgress * target);

  return (
    <div>
      <div
        style={{
                          fontSize: 28,
          color: '#ffffff',
          marginBottom: 12,
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
      >
        <span>{label}</span>
        <span style={{color: color, fontWeight: 'bold'}}>{currentPercent}%</span>
      </div>

      {/* 进度条背景 */}
      <div
        style={{
          width: '100%',
          height: 30,
          backgroundColor: '#0f0f1e',
          borderRadius: 15,
          overflow: 'hidden',
        }}
      >
        {/* 进度条前景 */}
        <div
          style={{
            width: `${clampedProgress * target}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 15,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
};
