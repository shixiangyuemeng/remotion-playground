import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个音频频谱动画，要求：
 * - 模拟音频频谱分析仪
 * - 显示不同频率段的振幅
 * - 使用镜像对称布局
 * - 频谱随时间动态变化
 * - 支持多种频谱样式
 *
 * 【效果说明】
 * 演示如何创建音频频谱可视化效果。
 * 使用多个频率分量模拟真实音频的频谱分布。
 */

export const AudioSpectrum = () => {
  const frame = useCurrentFrame();

  // 生成频谱数据（低频到高频）
  const bands = 32;
  const spectrumData = Array.from({length: bands}, (_, i) => {
    // 低频（左侧）振幅较大，高频（右侧）振幅较小
    const position = i / bands;
    const baseAmplitude = 1 - position * 0.6; // 低频更强

    // 添加动态变化
    const variation = Math.sin((frame * 0.1 + i * 0.5) * Math.PI * 2);
    const variation2 = Math.sin((frame * 0.15 + i * 0.3) * Math.PI * 2) * 0.5;

    const amplitude = (variation + variation2 + 2) / 4 * baseAmplitude;

    return {
      height: 30 + amplitude * 350, // 30-380px
      color: `hsl(${240 + position * 120}, 100%, ${50 + amplitude * 30}%)`, // 蓝色到紫色
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
          top: 60,
          left: 100,
          right: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          音频频谱
        </div>

        <div
          style={{
            fontSize: 32,
            color: '#888',
          }}
        >
          频率段: {bands}
        </div>
      </div>

      {/* 频谱容器 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
          height: 500,
          width: 1400,
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* 中心线 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: 2,
            height: '100%',
            backgroundColor: '#333',
            transform: 'translateX(-50%)',
          }}
        />

        {/* 左半部分（低频） */}
        {spectrumData.slice(0, bands / 2).map((bar, index) => (
          <SpectrumBar key={`left-${index}`} {...bar} />
        ))}

        {/* 右半部分（高频，镜像） */}
        {spectrumData.slice(bands / 2).reverse().map((bar, index) => (
          <SpectrumBar key={`right-${index}`} {...bar} />
        ))}
      </div>

      {/* 频率标签 */}
      <div
        style={{
          display: 'flex',
          width: 1400,
          justifyContent: 'space-between',
          marginTop: 20,
          padding: '0 20px',
        }}
      >
        <span style={{fontSize: 24, color: '#666'}}>低频</span>
        <span style={{fontSize: 24, color: '#666'}}>高频</span>
        <span style={{fontSize: 24, color: '#666'}}>低频</span>
      </div>

      {/* 说明 */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 100,
          fontSize: 28,
          color: '#666',
          maxWidth: 600,
          lineHeight: '1.6',
        }}
      >
        模拟音频频谱分析仪，低频振幅较大，高频振幅较小，镜像对称布局
      </div>

      {/* 实时信息 */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 100,
          fontSize: 28,
          color: '#3498db',
          fontFamily: 'monospace',
        }}
      >
        Time: {(frame / 30).toFixed(2)}s
      </div>
    </AbsoluteFill>
  );
};

const SpectrumBar = ({height, color}) => {
  return (
    <div
      style={{
        width: 30,
        height: height,
        backgroundColor: color,
        borderRadius: 4,
        boxShadow: `0 0 15px ${color}`,
        transition: 'height 0.05s ease',
      }}
    />
  );
};
