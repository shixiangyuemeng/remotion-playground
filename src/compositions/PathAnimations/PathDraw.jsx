import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个 SVG 路径描边动画，要求：
 * - 使用 SVG stroke-dasharray 和 stroke-dashoffset
 * - 路径从无到有逐渐绘制出来
 * - 支持复杂路径形状
 * - 绘制完成后显示填充效果
 * - 多个路径依次绘制
 *
 * 【效果说明】
 * 演示如何使用 SVG 创建路径描边动画。
 * 关键是计算路径长度并使用 stroke-dashoffset 控制绘制进度。
 */

export const PathDraw = () => {
  const frame = useCurrentFrame();

  // 定义要绘制的形状数据
  const shapes = [
    {
      name: '心形',
      path: 'M 960 300 C 600 100, 200 400, 960 800 C 1720 400, 1320 100, 960 300',
      color: '#e74c3c',
      delay: 0,
    },
    {
      name: '星形',
      path: 'M 960 200 L 1050 500 L 1350 500 L 1100 700 L 1200 1000 L 960 850 L 720 1000 L 820 700 L 570 500 L 870 500 Z',
      color: '#f39c12',
      delay: 60,
    },
    {
      name: '圆形',
      path: 'M 960 200 A 400 400 0 1 1 959.99 200',
      color: '#3498db',
      delay: 120,
    },
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
          left: 100,
          fontSize: 64,
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        路径描边动画
      </div>

      {/* SVG 容器 */}
      <svg width="1920" height="1080" style={{position: 'absolute', top: 0, left: 0}}>
        {shapes.map((shape) => (
          <AnimatedPath key={shape.name} {...shape} frame={frame} />
        ))}
      </svg>

      {/* 说明 */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 100,
          fontSize: 28,
          color: '#888',
        }}
      >
        使用 SVG stroke-dashoffset 实现路径绘制
      </div>
    </AbsoluteFill>
  );
};

const AnimatedPath = ({name, path, color, delay, frame}) => {
  // 计算路径长度（估算值）
  const pathLength = 3000;

  // 绘制进度
  const drawProgress = interpolate(frame - delay, [0, 60], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const dashOffset = pathLength * (1 - drawProgress);

  // 填充透明度
  const fillOpacity = interpolate(frame - delay, [60, 90], [0, 0.3], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 整体透明度（淡入淡出）
  const opacity = interpolate(frame - delay, [0, 20, 150, 180], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <g style={{opacity}}>
      {/* 路径描边 */}
      <path
        d={path}
        stroke={color}
        strokeWidth="8"
        fill="none"
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: `drop-shadow(0 0 10px ${color})`,
        }}
      />

      {/* 填充层 */}
      <path
        d={path}
        fill={color}
        fillOpacity={fillOpacity}
        stroke="none"
      />

      {/* 标签 */}
      <text
        x={960}
        y={540}
        fill="#ffffff"
        fontSize="48"
        fontWeight="bold"
        textAnchor="middle"
        opacity={fillOpacity}
        style={{
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
        }}
      >
        {name}
      </text>
    </g>
  );
};
