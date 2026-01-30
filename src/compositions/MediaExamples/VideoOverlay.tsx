import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个视频叠加效果演示，要求：
 * - 主视频背景（使用占位符）
 * - 叠加内容（画中画）
 * - 标题文字叠加
 * - 显示素材使用说明
 *
 * 【效果说明】
 * 演示如何在 Remotion 中使用视频素材。
 * 实际使用时将占位符替换为真实的 Video 组件。
 */

export const VideoOverlay = () => {
  return (
    <AbsoluteFill>
      {/* 背景视频占位符 */}
      <BackgroundPlaceholder />

      {/* 叠加视频（画中画） */}
      <PictureInPicture />

      {/* 标题叠加层 */}
      <TitleOverlay />
    </AbsoluteFill>
  );
};

// 背景视频占位符组件
const BackgroundPlaceholder = () => {
  const frame = useCurrentFrame();

  // 创建动态渐变背景模拟视频
  const hue1 = interpolate(frame % 180, [0, 180], [200, 260]);
  const hue2 = interpolate(frame % 180, [0, 180], [260, 200]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(45deg,
          hsl(${hue1}, 70%, 50%) 0%,
          hsl(${hue2}, 70%, 50%) 100%)`,
        position: 'relative',
      }}
    >
      {/* 模拟视频效果 */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 100,
          fontSize: 32,
          color: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '20px 30px',
          borderRadius: 10,
        }}
      >
        📹 背景视频占位符
      </div>

      <div
        style={{
          position: 'absolute',
          top: 160,
          left: 100,
          fontSize: 24,
          color: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '15px 25px',
          borderRadius: 8,
        }}
      >
        实际使用时替换为：
      </div>

      <div
        style={{
          position: 'absolute',
          top: 220,
          left: 100,
          fontSize: 20,
          color: '#3498db',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '15px 25px',
          borderRadius: 8,
          fontFamily: 'monospace',
          whiteSpace: 'pre',
        }}
      >
        {`import {Video, staticFile} from 'remotion';

<Video
  src={staticFile('/videos/background.mp4')}
  style={{width: '100%', objectFit: 'cover'}}
/>`}
      </div>

      {/* 黑色半透明遮罩 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      />
    </div>
  );
};

// 画中画组件
const PictureInPicture = () => {
  const frame = useCurrentFrame();

  // 入场动画
  const scale = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 悬浮动画
  const floatY = Math.sin((frame * 0.03) * Math.PI * 2) * 15;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 100,
        right: 100,
        width: 480,
        height: 270,
        transform: `scale(${scale}) translateY(${floatY}px)`,
        opacity: opacity,
      }}
    >
      {/* 视频容器 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 15,
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
          border: '4px solid #ffffff',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        {/* 占位内容 */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 64,
              marginBottom: 15,
            }}
          >
            ▶️
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#ffffff',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            画中画视频
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#ffffff',
              opacity: 0.8,
              marginTop: 10,
            }}
          >
            放置你的视频文件
          </div>
        </div>

        {/* 播放指示器 */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#ffffff',
            padding: '5px 10px',
            borderRadius: 5,
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          ▶ PIP
        </div>
      </div>
    </div>
  );
};

// 标题叠加层
const TitleOverlay = () => {
  const frame = useCurrentFrame();

  // 标题入场
  const titleY = interpolate(frame, [20, 50], [-100, 100], {
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 副标题
  const subtitleOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 100,
        pointerEvents: 'none',
      }}
    >
      {/* 主标题 */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 'bold',
            color: '#ffffff',
            textShadow: '4px 4px 12px rgba(0, 0, 0, 0.9)',
            lineHeight: 1.2,
          }}
        >
          视频叠加示例
        </div>
      </div>

      {/* 副标题 */}
      <div
        style={{
          opacity: subtitleOpacity,
          maxWidth: 800,
        }}
      >
        <div
          style={{
            fontSize: 36,
            color: '#ffffff',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: '15px 25px',
            borderRadius: 10,
            display: 'inline-block',
          }}
        >
          演示 Video 和 OffthreadVideo 组件的使用
        </div>
      </div>

      {/* 使用提示 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 100,
          opacity: subtitleOpacity,
        }}
      >
        <TechTip />
      </div>
    </div>
  );
};

// 技术提示组件
const TechTip = () => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(52, 152, 219, 0.9)',
        padding: '20px 30px',
        borderRadius: 10,
        maxWidth: 700,
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: 15,
        }}
      >
        💡 视频素材使用
      </div>
      <div
        style={{
          fontSize: 20,
          color: '#f0f0f0',
          lineHeight: 1.6,
        }}
      >
        <div style={{marginBottom: 8}}>
          <strong>1. Video</strong> - 适合实时预览
        </div>
        <div style={{marginBottom: 8}}>
          <strong>2. OffthreadVideo</strong> - 适合离线渲染（性能更好）
        </div>
        <div style={{marginBottom: 8}}>
          <strong>3. 素材位置</strong> - 放在 public/videos/ 目录
        </div>
        <div style={{marginBottom: 8}}>
          <strong>4. 支持格式</strong> - MP4（推荐）, WebM, MOV
        </div>
      </div>

      <div
        style={{
          marginTop: 15,
          padding: '15px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 8,
          fontSize: 18,
          color: '#ffffff',
        }}
      >
        <strong>添加视频后，将占位符代码替换为：</strong>
        <code
          style={{
            display: 'block',
            marginTop: 10,
            backgroundColor: '#1a1a2e',
            padding: '10px',
            borderRadius: 5,
            fontFamily: 'monospace',
            fontSize: 16,
          }}
        >
          {`<Video
  src={staticFile('/videos/background.mp4')}
  style={{width: '100%', objectFit: 'cover'}}
/>`}
        </code>
      </div>
    </div>
  );
};
