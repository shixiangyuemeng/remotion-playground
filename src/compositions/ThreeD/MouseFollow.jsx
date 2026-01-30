import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个鼠标/光标跟随动画，要求：
 * - 元素跟随模拟的鼠标路径移动
 * - 使用平滑的插值动画
 * - 多个元素以不同速度跟随（视差效果）
 * - 添加尾迹或延迟效果
 * - 展示 2D 路径动画
 *
 * 【效果说明】
 * 演示如何创建路径跟随动画。
 * 虽然视频中没有真实的鼠标交互，但可以预设路径模拟这种效果。
 */

export const MouseFollow = () => {
  const frame = useCurrentFrame();

  // 模拟鼠标路径（使用正弦和余弦函数创建平滑路径）
  const mouseX = interpolate(frame, [0, 200], [200, 1720], {
    extrapolateRight: 'clamp',
  });

  const mouseYBase = interpolate(frame, [0, 200], [540, 540]);

  // 添加波浪效果
  const mouseY = mouseYBase + Math.sin((frame / 200) * Math.PI * 2) * 300;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a2e',
        overflow: 'hidden',
      }}
    >
      {/* 背景网格 */}
      <GridLines frame={frame} />

      {/* 鼠标位置指示器 */}
      <MouseCursor x={mouseX} y={mouseY} frame={frame} />

      {/* 多个跟随元素（不同速度） */}
      <FollowElement
        x={mouseX}
        y={mouseY}
        delay={5}
        size={60}
        color="#3498db"
        frame={frame}
      />
      <FollowElement
        x={mouseX}
        y={mouseY}
        delay={10}
        size={80}
        color="#e74c3c"
        frame={frame}
      />
      <FollowElement
        x={mouseX}
        y={mouseY}
        delay={15}
        size={100}
        color="#2ecc71"
        frame={frame}
      />

      {/* 说明文字 */}
      <div
        style={{
          position: 'absolute',
                          top: 80,
          left: 100,
          fontSize: 48,
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        路径跟随动画
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 100,
          fontSize: 32,
          color: '#888',
        }}
      >
        使用 interpolate 创建平滑路径
      </div>

      {/* 路径轨迹 */}
      <svg
        width="1920"
        height="1080"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      >
        {/* 绘制路径 */}
        <path
          d={generatePath(frame)}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10,10"
        />
      </svg>
    </AbsoluteFill>
  );
};

// 鼠标光标组件
const MouseCursor = ({x, y, frame}) => {
  const pulse = interpolate(frame % 30, [0, 15, 30], [1, 1.2, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x - 25,
        top: y - 25,
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        transform: `scale(${pulse})`,
        boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
      }}
    />
  );
};

// 跟随元素组件
const FollowElement = ({x, y, delay, size, color, frame}) => {
  // 使用延迟帧数
  const delayedFrame = Math.max(0, frame - delay);

  // 计算延迟后的位置
  const delayedX = interpolate(delayedFrame, [0, 200], [200, 1720], {
    extrapolateRight: 'clamp',
  });

  const delayedYBase = interpolate(delayedFrame, [0, 200], [540, 540]);
  const delayedY =
    delayedYBase + Math.sin((delayedFrame / 200) * Math.PI * 2) * 300;

  // 透明度渐变
  const opacity = interpolate(delayedFrame, [0, 30], [0, 0.6], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: delayedX - size / 2,
        top: delayedY - size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: opacity,
        filter: 'blur(20px)',
      }}
    />
  );
};

// 背景网格线
const GridLines = ({frame}) => {
  const offset = interpolate(frame, [0, 200], [0, 100], {
    extrapolateRight: 'loop',
  });

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.1,
      }}
    >
      {/* 垂直线 */}
      {Array.from({length: 20}).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: i * 100,
            top: 0,
            width: 1,
            height: '100%',
            backgroundColor: '#ffffff',
            transform: `translateX(${offset}px)`,
          }}
        />
      ))}

      {/* 水平线 */}
      {Array.from({length: 15}).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            top: i * 80,
            width: '100%',
            height: 1,
            backgroundColor: '#ffffff',
          }}
        />
      ))}
    </div>
  );
};

// 生成路径数据
const generatePath = (frame) => {
  let path = 'M ';
  for (let i = 0; i <= Math.min(frame, 200); i += 5) {
    const x = interpolate(i, [0, 200], [200, 1720]);
    const y = 540 + Math.sin((i / 200) * Math.PI * 2) * 300;
    path += `${i === 0 ? '' : 'L '}${x} ${y} `;
  }
  return path;
};
