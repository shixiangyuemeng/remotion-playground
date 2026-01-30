import {AbsoluteFill, useCurrentFrame, interpolate, Sequence} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个产品展示宣传片，要求：
 * - 360度产品旋转
 * - 多角度展示
 * - 特写镜头
 * - 功能点强调
 * - 价格揭晓动画
 * - 号召行动
 * 电商风格
 *
 * 【效果说明】
 * 演示如何创建产品展示类宣传片。
 * 适合电商、产品发布等场景。
 */

export const ProductShowcase = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#0a0a0a'}}>
      {/* 开场 */}
      <Sequence from={0} durationInFrames={60}>
        <OpeningScene />
      </Sequence>

      {/* 产品旋转 */}
      <Sequence from={40} durationInFrames={120}>
        <ProductRotation />
      </Sequence>

      {/* 特写镜头 */}
      <Sequence from={130} durationInFrames={90}>
        <CloseUpShot />
      </Sequence>

      {/* 功能点 */}
      <Sequence from={180} durationInFrames={120}>
        <FeatureHighlights />
      </Sequence>

      {/* 价格揭晓 */}
      <Sequence from={250} durationInFrames={90}>
        <PriceReveal />
      </Sequence>

      {/* CTA */}
      <Sequence from={300} durationInFrames={60}>
        <CallToAction />
      </Sequence>
    </AbsoluteFill>
  );
};

// 开场场景
const OpeningScene = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [0, 40], [0.5, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        opacity: opacity,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(circle, #1a1a2e 0%, #000000 100%)',
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: 'bold',
          color: '#ffffff',
          transform: `scale(${scale})`,
          textShadow: '0 0 40px rgba(52, 152, 219, 0.8)',
          marginBottom: 30,
        }}
      >
        NEW PRODUCT
      </div>

      <div
        style={{
          fontSize: 36,
          color: '#3498db',
          fontWeight: 'bold',
        }}
      >
        即将发布
      </div>
    </div>
  );
};

// 产品旋转展示
const ProductRotation = () => {
  const frame = useCurrentFrame();

  const rotation = interpolate(frame, [0, 120], [0, 360], {
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [0, 30, 90, 120], [0.5, 1, 1, 0.5], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const opacity = interpolate(frame, [0, 20, 100, 120], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        opacity: opacity,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 产品占位符（实际使用时替换为产品图片） */}
      <div
        style={{
          width: 500,
          height: 500,
          transform: `scale(${scale})`,
          position: 'relative',
        }}
      >
        {/* 360度旋转环 */}
        {[0, 1, 2, 3].map((i) => {
          const delay = i * 10;
          const ringProgress = interpolate(frame - delay, [0, 60], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          });

          const ringRotation = frame * 2 + i * 45;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 400 + i * 50,
                height: 400 + i * 50,
                borderRadius: '50%',
                border: `3px solid ${i % 2 === 0 ? '#3498db' : '#e74c3c'}`,
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${ringRotation}deg)`,
                opacity: ringProgress * 0.3,
              }}
            />
          );
        })}

        {/* 产品中心 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            height: 300,
            backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20',
            boxShadow: '0 20px 60px rgba(102, 126, 234, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 48,
            color: '#ffffff',
            fontWeight: 'bold',
          }}
        >
          PRODUCT
        </div>
      </div>

      {/* 角度标识 */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          fontSize: 36,
          color: '#ffffff',
          opacity: 0.7,
        }}
      >
        360° View
      </div>
    </div>
  );
};

// 特写镜头
const CloseUpShot = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 45, 90], [1, 1.5, 1], {
    extrapolateRight: 'clamp',
  });

  const panX = interpolate(frame, [0, 45, 90], [0, 100, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#1a1a2e',
      }}
    >
      <div
        style={{
          width: 800,
          height: 500,
          backgroundColor: '#2a2a4e',
          borderRadius: 20,
          transform: `scale(${scale})`,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* 特写内容 */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#3498db',
              marginBottom: 20,
            }}
          >
            Premium Quality
          </div>

          <div
            style={{
              fontSize: 36,
              color: '#cccccc',
              textAlign: 'center',
              maxWidth: 600,
            }}
          >
            采用优质材料制作，精工细作，品质保证
          </div>
        </div>

        {/* 扫光效果 */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: panX * 2,
            width: 100,
            height: 700,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)',
            transform: 'rotate(15deg)',
          }}
        />
      </div>
    </div>
  );
};

// 功能亮点
const FeatureHighlights = () => {
  const frame = useCurrentFrame();

  const features = [
    {icon: '⚡', title: '超快速度', desc: '性能提升300%', color: '#f39c12'},
    {icon: '🎨', title: '精美设计', desc: '全新视觉体验', color: '#e74c3c'},
    {icon: '🔒', title: '安全可靠', desc: '企业级安全', color: '#2ecc71'},
    {icon: '💎', title: '高端品质', desc: '精工制作', color: '#3498db'},
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 60,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: 40,
        }}
      >
        产品特点
      </div>

      <div
        style={{
          display: 'flex',
          gap: 40,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} delay={index * 10} frame={frame} />
        ))}
      </div>
    </div>
  );
};

// 功能卡片
const FeatureCard = ({icon, title, desc, color, delay, frame}) => {
  const scale = interpolate(frame - delay, [0, 20], [0.8, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const y = interpolate(frame - delay, [0, 20], [50, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        width: 250,
        padding: 40,
        backgroundColor: '#2a2a4e',
        borderRadius: 20,
        transform: `translateY(${y}px) scale(${scale})`,
        opacity: opacity,
        textAlign: 'center',
        border: `3px solid ${color}`,
        boxShadow: `0 10px 30px ${color}40`,
      }}
    >
      <div
        style={{
          fontSize: 64,
          marginBottom: 20,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: color,
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 18,
          color: '#aaaaaa',
        }}
      >
        {desc}
      </div>
    </div>
  );
};

// 价格揭晓
const PriceReveal = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 40, 60], [0, 1.2, 1], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        opacity: opacity,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(circle, #1a1a2e 0%, #000000 100%)',
      }}
    >
      <div
        style={{
          fontSize: 48,
          color: '#888888',
          marginBottom: 30,
        }}
      >
        特别优惠
      </div>

      <div
        style={{
          fontSize: 120,
          fontWeight: 'bold',
          color: '#e74c3c',
          transform: `scale(${scale})`,
          textShadow: '0 0 40px rgba(231, 76, 60, 0.6)',
          marginBottom: 30,
        }}
      >
        ¥999
      </div>

      <div
        style={{
          fontSize: 36,
          color: '#ffffff',
          backgroundColor: '#e74c3c',
          padding: '15px 40px',
          borderRadius: 30,
          fontWeight: 'bold',
        }}
      >
        限时优惠
      </div>
    </div>
  );
};

// 行动号召
const CallToAction = () => {
  const frame = useCurrentFrame();

  const pulse = interpolate(frame % 30, [0, 15, 30], [1, 1.1, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: 40,
          textAlign: 'center',
        }}
      >
        立即购买
      </div>

      <div
        style={{
          fontSize: 48,
          color: '#ffffff',
          backgroundColor: '#ffffff',
          color: '#667eea',
          padding: '20px 60px',
          borderRadius: 50,
          fontWeight: 'bold',
          transform: `scale(${pulse})`,
          cursor: 'pointer',
        }}
      >
        SHOP NOW
      </div>

      <div
        style={{
          fontSize: 24,
          color: '#ffffff',
          marginTop: 40,
          opacity: 0.8,
        }}
      >
        免费配送 · 7天退换 · 终身质保
      </div>
    </div>
  );
};
