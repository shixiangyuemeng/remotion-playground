import {AbsoluteFill, useCurrentFrame, interpolate, Video, OffthreadVideo, staticFile, Audio} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个视频叠加效果，要求：
 * - 主视频背景
 * - 叠加第二个视频（画中画）
 * - 背景音乐
 * - 文字标题叠加
 * - 视频边框和阴影效果
 *
 * 【效果说明】
 * 演示如何在 Remotion 中使用视频素材。
 * Video 组件用于实时预览，OffthreadVideo 用于离线渲染（性能更好）。
 */

export const VideoOverlay = () => {
  return (
    <AbsoluteFill>
      {/* 背景视频 */}
      <BackgroundVideo />

      {/* 背景音乐 */}
      <Audio src="/music/background.mp3" />

      {/* 叠加视频（画中画） */}
      <PictureInPicture />

      {/* 标题叠加层 */}
      <TitleOverlay />
    </AbsoluteFill>
  );
};

// 背景视频组件
const BackgroundVideo = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
      }}
    >
      {/* 方式1: Video 组件（适合实时预览） */}
      <Video
        src={staticFile('/videos/background.mp4')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.8,
        }}
      />

      {/* 方式2: OffthreadVideo（适合离线渲染，性能更好） */}
      {/* <OffthreadVideo
        src={staticFile('/videos/background.mp4')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.8,
        }}
      /> */}

      {/* 黑色半透明遮罩 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
        }}
      >
        {/* 小视频 */}
        <Video
          src={staticFile('/videos/pip.mp4')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

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
          演示如何使用 Video 和 OffthreadVideo 组件
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
        💡 素材使用技巧
      </div>
      <div
        style={{
          fontSize: 20,
          color: '#f0f0f0',
          lineHeight: 1.6,
        }}
      >
        <div>• 图片/视频放在 public/ 目录</div>
        <div>• 使用 staticFile() 函数引用</div>
        <div>• Video: 实时预览快</div>
        <div>• OffthreadVideo: 离线渲染性能更好</div>
        <div>• Audio: 背景音乐和音效</div>
      </div>
    </div>
  );
};
