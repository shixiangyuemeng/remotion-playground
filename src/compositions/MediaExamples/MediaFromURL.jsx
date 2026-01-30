import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个从 URL 加载素材的示例，要求：
 * - 从网络加载图片（Unsplash 等）
 * - 从网络加载视频
- - 显示加载状态
 * - 错误处理和备用方案
 * - 响应式布局
 *
 * 【效果说明】
 * 演示如何从 URL 直接使用网络素材。
 * 无需下载到本地，直接在 Remotion 中引用。
 */

export const MediaFromURL = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a2e',
      }}
    >
      {/* 主标题 */}
      <Title />

      {/* 网络图片展示 */}
      <NetworkImages />

      {/* 使用说明 */}
      <Instructions />
    </AbsoluteFill>
  );
};

const Title = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const y = interpolate(frame, [0, 30], [-50, 80], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: opacity,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: '#ffffff',
          textShadow: '0 0 20px rgba(52, 152, 219, 0.8)',
        }}
      >
        🌐 网络素材示例
      </div>
      <div
        style={{
          fontSize: 28,
          color: '#8888aa',
          marginTop: 15,
        }}
      >
        直接使用 URL 加载图片和视频
      </div>
    </div>
  );
};

const NetworkImages = () => {
  const frame = useCurrentFrame();

  // 使用 Unsplash API 获取随机图片
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      title: '山脉',
      category: '自然',
    },
    {
      url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
      title: '城市',
      category: '建筑',
    },
    {
      url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
      title: '森林',
      category: '自然',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        marginTop: 250,
        flexWrap: 'wrap',
        padding: '0 100px',
      }}
    >
      {images.map((image, index) => (
        <ImageCard
          key={index}
          {...image}
          delay={index * 10}
          frame={frame}
        />
      ))}
    </div>
  );
};

const ImageCard = ({url, title, category, delay, frame}) => {
  const relativeFrame = frame - delay;

  // 入场动画
  const scale = interpolate(relativeFrame, [0, 20], [0.8, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const opacity = interpolate(relativeFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const y = interpolate(relativeFrame, [0, 20], [50, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 悬浮效果
  const floatY = Math.sin((relativeFrame * 0.03) * Math.PI * 2) * 10;

  return (
    <div
      style={{
        position: 'relative',
        width: 300,
        opacity: opacity,
        transform: `translateY(${y + floatY}px) scale(${scale})`,
      }}
    >
      {/* 图片容器 */}
      <div
        style={{
          width: '100%',
          height: 400,
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
          border: '4px solid #ffffff',
        }}
      >
        {/* 直接使用 URL */}
        <img
          src={url}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* 渐变遮罩 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 150,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
          }}
        />

        {/* 文字信息 */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: '#3498db',
              fontWeight: 'bold',
              marginBottom: 8,
              textTransform: 'uppercase',
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#ffffff',
              fontWeight: 'bold',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
            }}
          >
            {title}
          </div>
        </div>
      </div>

      {/* URL 显示 */}
      <div
        style={{
          marginTop: 15,
          fontSize: 14,
          color: '#888',
          textAlign: 'center',
          fontFamily: 'monospace',
          wordBreak: 'break-all',
        }}
      >
        {url.length > 50 ? url.substring(0, 50) + '...' : url}
      </div>
    </div>
  );
};

const Instructions = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        left: 100,
        right: 100,
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        border: '2px solid #3498db',
        borderRadius: 15,
        padding: '30px 40px',
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: '#3498db',
          marginBottom: 20,
        }}
      >
        📖 使用网络素材的方法
      </div>

      <div
        style={{
          fontSize: 22,
          color: '#e0e0e0',
          lineHeight: 1.8,
        }}
      >
        <div>
          <span style={{color: '#3498db', fontWeight: 'bold'}}>1. 本地素材：</span>
          <code style={{backgroundColor: '#2a2a4e', padding: '5px 10px', borderRadius: 5, marginLeft: 10}}>
            public/images/photo.jpg
          </code>
        </div>

        <div style={{marginTop: 15}}>
          <span style={{color: '#3498db', fontWeight: 'bold'}}>2. 网络素材：</span>
          <code style={{backgroundColor: '#2a2a4e', padding: '5px 10px', borderRadius: 5, marginLeft: 10}}>
            https://example.com/image.jpg
          </code>
        </div>

        <div style={{marginTop: 15}}>
          <span style={{color: '#3498db', fontWeight: 'bold'}}>3. 推荐：</span>
          <span style={{color: '#aaa', marginLeft: 10}}>
            本地素材渲染更快，网络素材需要下载
          </span>
        </div>

        <div style={{marginTop: 15}}>
          <span style={{color: '#3498db', fontWeight: 'bold'}}>4. 素材网站：</span>
          <span style={{color: '#aaa', marginLeft: 10}}>
            Unsplash, Pexels, Pixabay（免费商用）
          </span>
        </div>
      </div>
    </div>
  );
};
