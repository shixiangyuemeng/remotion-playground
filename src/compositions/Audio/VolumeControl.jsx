import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个音量控制动画，要求：
 * - 模拟音量滑块控件
 * - 显示当前音量级别
 * - 音量条动态变化
 * - 显示静音/最大音量等状态
 * - 平滑的音量过渡效果
 *
 * 【效果说明】
 * 演示如何创建音量控制可视化，使用 interpolate 和 spring 实现平滑过渡。
 */

export const VolumeControl = () => {
  const frame = useCurrentFrame();

  // 模拟音量变化（从 0 到 100 再到 0）
  const volume = interpolate(frame, [0, 100, 200], [0, 100, 0], {
    extrapolateRight: 'clamp',
  });

  // 判断是否静音
  const isMuted = volume < 5;

  // 音量百分比
  const volumePercent = Math.round(volume);

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
          top: 100,
          fontSize: 64,
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        音量控制
      </div>

      {/* 音量图标 */}
      <VolumeIcon volume={volume} />

      {/* 音量显示 */}
      <div
        style={{
          fontSize: 120,
          fontWeight: 'bold',
          color: isMuted ? '#e74c3c' : '#3498db',
          margin: '60px 0',
        }}
      >
        {isMuted ? '🔇' : volumePercent > 70 ? '🔊' : volumePercent > 30 ? '🔉' : '🔈'}
      </div>

      {/* 音量百分比 */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: 60,
        }}
      >
        {volumePercent}%
      </div>

      {/* 音量条容器 */}
      <VolumeBar volume={volume} />

      {/* 音量状态标签 */}
      <div
        style={{
          fontSize: 32,
          color: '#888',
          marginTop: 60,
        }}
      >
        {isMuted ? '静音' : volumePercent > 70 ? '高音量' : volumePercent > 30 ? '中音量' : '低音量'}
      </div>

      {/* 说明 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 100,
          fontSize: 28,
          color: '#666',
        }}
      >
        使用 interpolate 控制音量值
      </div>

      {/* 实时音量可视化 */}
      <VolumeVisualization volume={volume} frame={frame} />
    </AbsoluteFill>
  );
};

// 音量图标
const VolumeIcon = ({volume}) => {
  const scale = spring({
    frame: volume,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 100,
    },
  });

  const clampedScale = Math.min(Math.max(scale, 0.5), 1.5);

  return (
    <div
      style={{
        width: 200,
        height: 200,
        borderRadius: '50%',
        backgroundColor: volume > 70 ? '#2ecc71' : volume > 30 ? '#f39c12' : '#e74c3c',
        transform: `scale(${clampedScale})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: `0 0 ${volume * 2}px ${volume > 70 ? '#2ecc71' : volume > 30 ? '#f39c12' : '#e74c3c'}`,
      }}
    >
      <svg width={120} height={120} viewBox="0 0 24 24" fill="#ffffff">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
      </svg>
    </div>
  );
};

// 音量条
const VolumeBar = ({volume}) => {
  // 不同的音量段颜色
  const getColor = (position) => {
    if (position < 33) return '#e74c3c';
    if (position < 66) return '#f39c12';
    return '#2ecc71';
  };

  return (
    <div
      style={{
        width: 800,
        height: 60,
        backgroundColor: '#0a0a1e',
        borderRadius: 30,
        overflow: 'hidden',
        position: 'relative',
        border: '4px solid #333',
      }}
    >
      {/* 音量填充 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${volume}%`,
          background: `linear-gradient(90deg, #e74c3c 0%, #e74c3c 33%, #f39c12 33%, #f39c12 66%, #2ecc71 66%, #2ecc71 100%)`,
          transition: 'width 0.1s ease',
          borderRadius: 30,
        }}
      />

      {/* 音量刻度 */}
      {Array.from({length: 10}).map((_, i) => {
        const position = (i + 1) * 10;
        const isActive = volume >= position;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${position}%`,
              top: 0,
              width: 2,
              height: '100%',
              backgroundColor: isActive ? '#ffffff' : '#666',
              opacity: 0.5,
            }}
          />
        );
      })}
    </div>
  );
};

// 实时音量可视化
const VolumeVisualization = ({volume, frame}) => {
  // 生成动态波形
  const bars = 40;
  const barData = Array.from({length: bars}, (_, i) => {
    const barVolume = (volume / 100) * 0.8; // 最大高度的 80%
    const variation = Math.sin((frame * 0.2 + i * 0.3) * Math.PI * 2) * 0.2;
    const height = (barVolume + variation) * 100;

    return {
      height: Math.max(10, height),
      color: `hsl(${(volume / 100) * 120}, 100%, 50%)`,
    };
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        right: 100,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 4,
        height: 150,
      }}
    >
      {barData.map((bar, index) => (
        <div
          key={index}
          style={{
            width: 8,
            height: bar.height,
            backgroundColor: bar.color,
            borderRadius: 4,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};
