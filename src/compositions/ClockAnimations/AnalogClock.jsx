import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个模拟时钟动画，要求：
 * - 时针、分针、秒针独立运动
 * - 平滑的秒针移动
 * - 时钟刻度显示
 * - 数字时间显示
 * - 日夜变化背景
 *
 * 【效果说明】
 * 演示如何使用旋转和帧计算创建时钟动画。
 * 秒针每秒移动，分针每分钟移动，时针每小时移动。
 */

export const AnalogClock = () => {
  const frame = useCurrentFrame();

  // 计算时间（假设 30fps，每帧代表一定的时间）
  // 为了演示效果，让时间加速
  const timeScale = 10; // 时间加速倍数
  const totalSeconds = (frame * timeScale) / 30;

  const hours = Math.floor(totalSeconds / 3600) % 12;
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // 计算指针角度
  const secondAngle = (seconds * 6 + (totalSeconds % 1) * 6) - 90; // 每秒 6 度
  const minuteAngle = (minutes * 6 + seconds * 0.1) - 90; // 每分钟 6 度
  const hourAngle = (hours * 30 + minutes * 0.5) - 90; // 每小时 30 度

  // 背景颜色随时间变化
  const dayProgress = (totalSeconds % 86400) / 86400; // 24小时周期
  const bgHue = interpolate(dayProgress, [0, 0.25, 0.5, 0.75, 1], [220, 180, 60, 200, 220]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `hsl(${bgHue}, 50%, 20%)`,
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
          top: 80,
          fontSize: 48,
          fontWeight: 'bold',
          color: '#ffffff',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
        }}
      >
        模拟时钟
      </div>

      {/* 时钟主体 */}
      <div
        style={{
          position: 'relative',
          width: 500,
          height: 500,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: `
            0 0 50px rgba(0, 0, 0, 0.3),
            inset 0 0 30px rgba(0, 0, 0, 0.1)
          `,
          border: '20px solid #2c3e50',
        }}
      >
        {/* 时钟刻度 */}
        <ClockMarks />

        {/* 时针 */}
        <ClockHand
          angle={hourAngle}
          length={150}
          width={12}
          color="#2c3e50"
          zIndex={3}
        />

        {/* 分针 */}
        <ClockHand
          angle={minuteAngle}
          length={180}
          width={8}
          color="#34495e"
          zIndex={2}
        />

        {/* 秒针 */}
        <ClockHand
          angle={secondAngle}
          length= {200}
          width={4}
          color="#e74c3c"
          zIndex={4}
        />

        {/* 中心点 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 30,
            height: 30,
            borderRadius: '50%',
            backgroundColor: '#e74c3c',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          }}
        />

        {/* 数字时间 */}
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 36,
            fontWeight: 'bold',
            color: '#2c3e50',
            fontFamily: 'monospace',
          }}
        >
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </div>
      </div>

      {/* 说明 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          fontSize: 24,
          color: '#ffffff',
          opacity: 0.8,
        }}
      >
        时间加速 x{timeScale} | 使用旋转计算模拟时钟
      </div>
    </AbsoluteFill>
  );
};

// 时钟刻度组件
const ClockMarks = () => {
  const marks = [];

  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const isHour = i % 3 === 0;
    const length = isHour ? 30 : 15;
    const width = isHour ? 6 : 3;

    const x1 = 250 + Math.cos(angle) * 210;
    const y1 = 250 + Math.sin(angle) * 210;
    const x2 = 250 + Math.cos(angle) * (210 - length);
    const y2 = 250 + Math.sin(angle) * (210 - length);

    marks.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: Math.min(x1, x2),
          top: Math.min(y1, y2),
          width: width,
          height: length,
          backgroundColor: isHour ? '#2c3e50' : '#95a5a6',
          transform: `rotate(${i * 30}deg)`,
          transformOrigin: isHour
            ? `${width / 2}px ${210 - length / 2}px`
            : `${width / 2}px ${210 - length / 2}px`,
        }}
      />
    );
  }

  return <>{marks}</>;
};

// 指针组件
const ClockHand = ({angle, length, width, color, zIndex}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: width,
        height: length,
        backgroundColor: color,
        borderRadius: width / 2,
        transformOrigin: 'top center',
        transform: `translate(-50%, 0) rotate(${angle}deg)`,
        zIndex: zIndex,
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      }}
    />
  );
};
