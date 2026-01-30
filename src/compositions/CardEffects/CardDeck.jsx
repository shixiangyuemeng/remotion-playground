import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个卡片牌组效果，要求：
 * - 多张卡片堆叠
 - 逐张展开显示
 - 3D 翻转效果
 - 悬浮动画
 - 不同的卡片设计
 *
 * 【效果说明】
 * 演示如何创建卡片堆叠和展开效果。
 * 使用 3D 变换和弹性动画创建流畅的卡片展示。
 */

export const CardDeck = () => {
  const frame = useCurrentFrame();

  const cards = [
    {
      title: '设计',
      icon: '🎨',
      color: '#e74c3c',
      description: '创意设计',
      delay: 0,
    },
    {
      title: '开发',
      icon: '💻',
      color: '#3498db',
      description: '前端开发',
      delay: 15,
    },
    {
      title: '动画',
      icon: '✨',
      color: '#2ecc71',
      description: '动效设计',
      delay: 30,
    },
    {
      title: '测试',
      icon: '🔍',
      color: '#f39c12',
      description: '质量保证',
      delay: 45,
    },
    {
      title: '部署',
      icon: '🚀',
      color: '#9b59b6',
      description: '产品发布',
      delay: 60,
    },
  ];

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
          top: 80,
          fontSize: 64,
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        卡片牌组
      </div>

      {/* 卡片容器 */}
      <div
        style={{
          position: 'relative',
          width: 1400,
          height: 600,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            {...card}
            frame={frame}
            index={index}
            total={cards.length}
          />
        ))}
      </div>

      {/* 说明 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          fontSize: 28,
          color: '#888',
        }}
      >
        使用 3D 变换和弹性动画创建卡片展开效果
      </div>
    </AbsoluteFill>
  );
};

const Card = ({title, icon, color, description, delay, frame, index, total}) => {
  // 计算卡片位置（展开时平均分布）
  const totalWidth = 1200;
  const cardWidth = 200;
  const spacing = (totalWidth - cardWidth * total) / (total - 1);
  const targetX = -(totalWidth / 2) + index * (cardWidth + spacing);

  // Spring 动画
  const springValue = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const progress = Math.min(Math.max(springValue, 0), 1);

  // 从堆叠位置移动到展开位置
  const x = interpolate(progress, [0, 1], [0, targetX]);

  // 缩放
  const scale = interpolate(progress, [0, 0.5, 1], [0.8, 1.1, 1]);

  // 旋转
  const rotation = interpolate(progress, [0, 1], [(index - 2) * 5, 0]);

  // 3D 翻转
  const rotateY = interpolate(progress, [0, 1], [-90, 0]);

  // 悬浮动画
  const floatY = Math.sin((frame * 0.03 + index * 0.5) * Math.PI * 2) * 10;

  // 透明度
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 层级（后面的卡片在下层）
  const zIndex = index;

  return (
    <div
      style={{
        position: 'absolute',
        width: 200,
        height: 280,
        transform: `
          translateX(${x}px)
          translateY(${floatY}px)
          scale(${scale})
          rotate(${rotation}deg)
          rotateY(${rotateY}deg)
        `,
        opacity: opacity,
        zIndex: zIndex,
        perspective: 1000,
      }}
    >
      {/* 卡片正面 */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: color,
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: `
            0 10px 30px rgba(0, 0, 0, 0.3),
            0 0 20px ${color}80
          `,
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 图标 */}
        <div
          style={{
            fontSize: 72,
            marginBottom: 20,
          }}
        >
          {icon}
        </div>

        {/* 标题 */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 10,
          }}
        >
          {title}
        </div>

        {/* 描述 */}
        <div
          style={{
            fontSize: 20,
            color: '#ffffff',
            opacity: 0.9,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};
