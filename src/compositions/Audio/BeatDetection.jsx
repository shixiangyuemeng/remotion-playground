import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个节拍检测动画，要求：
 * - 模拟音乐节拍的脉冲效果
 * - 元素随节拍缩放和颜色变化
 * - 显示 BPM（每分钟节拍数）
 * - 多个元素以不同节拍响应
 * - 创建节奏感强烈的视觉效果
 *
 * 【效果说明】
 * 演示如何创建节拍响应动画，使用周期函数模拟音乐节拍。
 */

export const BeatDetection = () => {
  const frame = useCurrentFrame();

  // BPM: 120 (每秒 2 拍)
  const bpm = 120;
  const beatInterval = 30; // 30 帧 = 1 秒 @ 30fps
  const beatIntervalFrames = (60 / bpm) * 30; // 每 15 帧一个节拍

  // 计算当前节拍
  const currentBeat = Math.floor(frame / beatIntervalFrames);

  // 节拍强度（0-1）
  const beatStrength = interpolate(
    frame % beatIntervalFrames,
    [0, beatIntervalFrames * 0.3, beatIntervalFrames],
    [1, 0.3, 0.3],
    {extrapolateRight: 'clamp'}
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 背景脉冲 */}
      <BackgroundPulse beatStrength={beatStrength} />

      {/* 中心圆 */}
      <CenterCircle beatStrength={beatStrength} frame={frame} />

      {/* 环绕圆 */}
      <OrbitingCircles beatStrength={beatStrength} frame={frame} />

      {/* 节拍计数器 */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 100,
          display: 'flex',
          gap: 40,
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 32,
              color: '#888',
              marginBottom: 10,
            }}
          >
            BPM
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#3498db',
            }}
          >
            {bpm}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 32,
              color: '#888',
              marginBottom: 10,
            }}
          >
            Beat
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#e74c3c',
            }}
          >
            {currentBeat + 1}
          </div>
        </div>
      </div>

      {/* 说明 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 100,
          fontSize: 32,
          color: '#888',
        }}
      >
        模拟节拍响应动画
      </div>

      {/* 节拍可视化 */}
      <BeatVisualization frame={frame} beatIntervalFrames={beatIntervalFrames} />
    </AbsoluteFill>
  );
};

// 背景脉冲
const BackgroundPulse = ({beatStrength}) => {
  const scale = beatStrength;

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle, rgba(52, 152, 219, ${scale * 0.3}) 0%, transparent 70%)`,
        transform: `scale(${scale})`,
      }}
    />
  );
};

// 中心圆
const CenterCircle = ({beatStrength, frame}) => {
  const scale = spring({
    frame: frame % 15,
    fps: 30,
    config: {
      damping: 10,
      stiffness: 200,
    },
  });

  const clampedScale = Math.min(Math.max(scale, 0), 1) * beatStrength + 0.5;

  return (
    <div
      style={{
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: `linear-gradient(135deg, #3498db, #e74c3c)`,
        transform: `scale(${clampedScale})`,
        boxShadow: `0 0 ${beatStrength * 100}px rgba(52, 152, 219, 0.8)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        BEAT
      </div>
    </div>
  );
};

// 环绕圆
const OrbitingCircles = ({beatStrength, frame}) => {
  const circles = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div
      style={{
        position: 'absolute',
        width: 800,
        height: 800,
        animation: 'rotate 10s linear infinite',
      }}
    >
      {circles.map((i) => {
        const angle = (i / circles.length) * Math.PI * 2;
        const radius = 350;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const scale = beatStrength * (0.8 + Math.random() * 0.4);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: `hsl(${(i / circles.length) * 360}, 100%, 60%)`,
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              boxShadow: `0 0 30px hsl(${(i / circles.length) * 360}, 100%, 60%)`,
            }}
          />
        );
      })}
    </div>
  );
};

// 节拍可视化
const BeatVisualization = ({frame, beatIntervalFrames}) => {
  // 显示最近 20 个节拍
  const beats = Array.from({length: 20}, (_, i) => {
    const beatFrame = frame - i * beatIntervalFrames;
    const isActive = beatFrame >= 0 && beatFrame % beatIntervalFrames < 10;
    return isActive;
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        right: 100,
        display: 'flex',
        gap: 10,
      }}
    >
      {beats.map((isActive, index) => (
        <div
          key={index}
          style={{
            width: 15,
            height: 60,
            backgroundColor: isActive ? '#e74c3c' : '#333',
            borderRadius: 4,
            transform: isActive ? 'scaleY(1.2)' : 'scaleY(1)',
            transition: 'all 0.1s ease',
          }}
        />
      ))}
    </div>
  );
};
