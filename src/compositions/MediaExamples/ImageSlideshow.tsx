import {AbsoluteFill, useCurrentFrame, interpolate, Sequence} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个图片轮播效果演示，要求：
 * - 多张图片依次显示（使用占位符）
 * - 淡入淡出过渡
 * - 缩放动画（Ken Burns 效果）
 * - 图片标题说明
 * - 展示如何使用图片素材
 *
 * 【效果说明】
 * 演示如何在 Remotion 中使用图片素材。
 * 使用彩色占位符代替实际图片，添加素材后替换为 Img 组件。
 */

export const ImageSlideshow = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000000'}}>
      {/* 第一张图片：0-90帧 */}
      <Sequence from={0} durationInFrames={90}>
        <ImageSlide
          color1="#ff6b6b"
          color2="#ee5a6f"
          title="美丽风景"
          subtitle="使用 Img 组件展示图片"
          zoomDirection="in"
          tip="/images/photo1.jpg"
        />
      </Sequence>

      {/* 第二张图片：90-180帧 */}
      <Sequence from={90} durationInFrames={90}>
        <ImageSlide
          color1="#4ecdc4"
          color2="#44a08d"
          title="城市夜景"
          subtitle="支持 JPG, PNG, WebP 等格式"
          zoomDirection="out"
          tip="/images/photo2.jpg"
        />
      </Sequence>

      {/* 第三张图片：180-270帧 */}
      <Sequence from={180} durationInFrames={90}>
        <ImageSlide
          color1="#feca57"
          color2="#ff9f43"
          title="人物肖像"
          subtitle="objectFit 控制填充方式"
          zoomDirection="in"
          tip="/images/photo3.jpg"
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const ImageSlide = ({
  color1,
  color2,
  title,
  subtitle,
  zoomDirection,
  tip,
}) => {
  const frame = useCurrentFrame();

  // 淡入淡出
  const opacity = interpolate(frame, [0, 15, 75, 90], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Ken Burns 效果（缓慢缩放）
  const scale = interpolate(frame, [0, 90], zoomDirection === 'in' ? [1, 1.2] : [1.2, 1]);

  // 图片平移
  const x = interpolate(frame, [0, 90], [-20, 20]);
  const y = interpolate(frame, [0, 90], [-10, 10]);

  // 标题动画
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [10, 30], [50, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{opacity}}>
      {/* 图片层占位符 */}
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* 渐变占位符（模拟图片） */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
            transform: `scale(${scale}) translate(${x}px, ${y}px)`,
          }}
        >
          {/* 占位提示 */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 120,
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            🖼️
          </div>
        </div>

        {/* 使用说明 */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: 100,
            fontSize: 32,
            color: '#ffffff',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '15px 25px',
            borderRadius: 10,
          }}
        >
          💡 图片占位符
        </div>

        <div
          style={{
            position: 'absolute',
            top: 140,
            left: 100,
            fontSize: 20,
            color: '#cccccc',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '10px 20px',
            borderRadius: 8,
            fontFamily: 'monospace',
          }}
        >
          实际使用：
        </div>

        <div
          style={{
            position: 'absolute',
            top: 190,
            left: 100,
            fontSize: 18,
            color: '#3498db',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '15px 20px',
            borderRadius: 8,
            fontFamily: 'monospace',
            whiteSpace: 'pre',
          }}
        >
          {`import {Img, staticFile} from 'remotion';

<Img
  src={staticFile('${tip}')}
  style={{
    width: '100%',
    objectFit: 'cover',
    }}
/>`}
        </div>
      </div>

      {/* 黑色遮罩，让文字更清晰 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 300,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
        }}
      />

      {/* 标题文字 */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 100,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#ffffff',
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
            marginBottom: 20,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#cccccc',
            textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
