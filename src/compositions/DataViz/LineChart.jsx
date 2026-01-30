import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个折线图绘制动画，要求：
 * - 使用 SVG 绘制折线
 * - 线条从左到右逐渐绘制
 * - 数据点依次出现
 * - 支持多条数据线
 * - 显示坐标轴和标签
 *
 * 【效果说明】
 * 演示如何使用 SVG path 创建动态折线图。
 * 关键是使用 stroke-dasharray 和 stroke-dashoffset 实现线条绘制动画。
 */

export const LineChart = () => {
  const frame = useCurrentFrame();

  // 生成模拟数据
  const datasets = [
    {
      name: '收入',
      data: [20, 45, 30, 60, 55, 80, 75],
      color: '#3498db',
    },
    {
      name: '支出',
      data: [15, 30, 40, 35, 50, 45, 60],
      color: '#e74c3c',
    },
  ];

  const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

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
          marginBottom: 80,
        }}
      >
        折线图动画
      </h1>

      {/* 图表容器 */}
      <div
        style={{
          position: 'relative',
          width: 1400,
          height: 600,
        }}
      >
        {/* 坐标轴 */}
        <svg width="100%" height="100%" style={{position: 'absolute'}}>
          {/* Y轴 */}
          <line
            x1="60"
            y1="50"
            x2="60"
            y2="500"
            stroke="#666"
            strokeWidth="2"
          />

          {/* X轴 */}
          <line
            x1="60"
            y1="500"
            x2="1300"
            y2="500"
            stroke="#666"
            strokeWidth="2"
          />

          {/* Y轴刻度和标签 */}
          {[0, 25, 50, 75, 100].map((value) => {
            const y = 500 - (value / 100) * 450;
            return (
              <g key={value}>
                <line
                  x1="55"
                  y1={y}
                  x2="65"
                  y2={y}
                  stroke="#666"
                  strokeWidth="2"
                />
                <text
                  x="45"
                  y={y + 5}
                  fill="#888"
                  fontSize="18"
                  textAnchor="end"
                  fontWeight="bold"
                >
                  {value}
                </text>
              </g>
            );
          })}

          {/* X轴标签 */}
          {labels.map((label, index) => {
            const x = 100 + index * 180;
            return (
              <text
                key={index}
                x={x}
                y="530"
                fill="#fff"
                fontSize="20"
                textAnchor="middle"
                fontWeight="bold"
              >
                {label}
              </text>
            );
          })}
        </svg>

        {/* 数据线 */}
        {datasets.map((dataset, datasetIndex) => (
          <DataLine
            key={datasetIndex}
            data={dataset.data}
            color={dataset.color}
            delay={datasetIndex * 30}
            frame={frame}
          />
        ))}

        {/* 图例 */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            display: 'flex',
            gap: 30,
          }}
        >
          {datasets.map((dataset, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 4,
                  backgroundColor: dataset.color,
                }}
              />
              <span
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                {dataset.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 60,
          fontSize: 32,
          color: '#888',
        }}
      >
        使用 SVG stroke-dashoffset 实现线条绘制
      </div>
    </AbsoluteFill>
  );
};

const DataLine = ({data, color, delay, frame}) => {
  // Spring 动画
  const progress = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 12,
      stiffness: 80,
      mass: 1,
    },
  });

  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  // 计算路径
  const points = data.map((value, index) => {
    const x = 100 + index * 180;
    const y = 500 - (value / 100) * 450;
    return {x, y, value};
  });

  // 生成 SVG 路径
  let pathD = '';
  points.forEach((point, index) => {
    if (index === 0) {
      pathD += `M ${point.x} ${point.y}`;
    } else {
      pathD += ` L ${point.x} ${point.y}`;
    }
  });

  // 计算路径总长度
  const pathLength = points.length * 200; // 估算值

  // 数据点圆圈
  const circles = points.map((point, index) => {
    const delay = index * 10;
    const pointProgress = spring({
      frame: frame - delay,
      fps: 30,
      config: {
        damping: 10,
        stiffness: 100,
      },
    });
    const clampedPointProgress = Math.min(Math.max(pointProgress, 0), 1);

    return (
      <circle
        key={index}
        cx={point.x}
        cy={point.y}
        r={8 * clampedPointProgress}
        fill={color}
        opacity={clampedPointProgress}
      />
    );
  });

  return (
    <svg width="100%" height="100%" style={{position: 'absolute'}}>
      {/* 数据线 */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - clampedProgress)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 数据点 */}
      {circles}
    </svg>
  );
};
