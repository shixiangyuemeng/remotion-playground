import {AbsoluteFill, useCurrentFrame, interpolate, Sequence, Img, staticFile} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个图片轮播效果，要求：
 * - 多张图片依次显示
 * - 淡入淡出过渡
 * - 缩放动画（Ken Burns 效果）
 * - 图片标题说明
 * - 使用 public 目录中的图片
 *
 * 【效果说明】
 * 演示如何在 Remotion 中使用图片素材。
 * 素材应放在 public/ 目录下，使用 staticFile() 或相对路径引用。
 */

export const ImageSlideshow = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000000'}}>
      {/* 第一张图片：0-90帧 */}
      <Sequence from={0} durationInFrames={90}>
        <ImageSlide
          image="/images/photo1.jpg"
          title="美丽的风景"
          subtitle="第一张图片展示"
          zoomDirection="in"
        />
      </Sequence>

      {/* 第二张图片：90-180帧 */}
      <Sequence from={90} durationInFrames={90}>
        <ImageSlide
          image="/images/photo2.jpg"
          title="城市夜景"
          subtitle="第二张图片展示"
          zoomDirection="out"
        />
      </Sequence>

      {/* 第三张图片：180-270帧 */}
      <Sequence from={180} durationInFrames={90}>
        <ImageSlide
          image="/images/photo3.jpg"
          title="人物肖像"
          subtitle="第三张图片展示"
          zoomDirection="in"
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const ImageSlide = ({image, title, subtitle, zoomDirection}) => {
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
      {/* 图片层 */}
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* 方式1: 使用 Img 组件（推荐） */}
        <Img
          src={staticFile(image)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${scale}) translate(${x}px, ${y}px)`,
          }}
        />

        {/* 方式2: 使用普通 img 标签 */}
        {/* <img
          src={staticFile(image)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${scale}) translate(${x}px, ${y}px)`,
          }}
        /> */}
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

      {/* 提示信息 */}
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
        💡 图片素材使用示例
      </div>

      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 100,
          fontSize: 24,
          color: '#cccccc',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '10px 20px',
          borderRadius: 8,
        }}
      >
        素材路径: public{image}
      </div>
    </AbsoluteFill>
  );
};
