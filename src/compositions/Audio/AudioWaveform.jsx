import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个音频波形动画，要求：
 * - 模拟音频波形可视化
 * - 使用多条竖线表示振幅
 * - 波形随时间变化
 * - 使用正弦函数模拟音频
 * - 支持不同颜色和样式
 *
 * 【效果说明】
 * 演示如何创建音频波形可视化效果。
 * 使用 Math.sin 和 frame 生成模拟的音频数据。
 */

export const AudioWaveform = () => {
  const frame = useCurrentFrame();

  // 生成波形数据
  const bars = 60;
  const waveformData = Array.from({length: bars}, (_, i) => {
    // 使用多个正弦波叠加创建复杂波形
    const baseFreq = 0.1;
    const wave1 = Math.sin((frame * baseFreq + i * 0.3) * Math.PI * 2);
    const wave2 = Math.sin((frame * baseFreq * 2 + i * 0.5) * Math.PI * 2) * 0.5;
    const wave3 = Math.sin((frame * baseFreq * 0.5 + i * 0.2) * Math.PI * 2) * 0.3;

    const amplitude = (wave1 + wave2 + wave3 + 2) / 4; // 归一化到 0-1

    return {
      height: 50 + amplitude * 400, // 50-450px
      hue: (i / bars) * 360, // 彩虹色
    };
  });

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
      {/* 标题 */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 100,
          fontSize: 64,
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        音频波形可视化
      </div>

      {/* 波形容器 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 6,
          height: 500,
          width: 1600,
          justifyContent: 'center',
        }}
      >
        {waveformData.map((bar, index) => (
          <WaveBar key={index} {...bar} index={index} />
        ))}
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
        使用 Math.sin 模拟音频波形
      </div>

      {/* 实时信息 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          right: 100,
          fontSize: 32,
          color: '#3498db',
          fontFamily: 'monospace',
        }}
      >
        Frame: {frame}
      </div>
    </AbsoluteFill>
  );
};

const WaveBar = ({height, hue, index}) => {
  return (
    <div
      style={{
        width: 20,
        height: height,
        backgroundColor: `hsl(${hue}, 100%, 60%)`,
        borderRadius: 10,
        boxShadow: `0 0 20px hsl(${hue}, 100%, 60%)`,
        transition: 'height 0.1s ease',
      }}
    />
  );
};
