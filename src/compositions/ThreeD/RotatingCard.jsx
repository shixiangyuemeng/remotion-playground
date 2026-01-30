import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个 3D 旋转卡片动画，要求：
 * - 卡片在 3D 空间中旋转
 * - 使用 CSS 3D transforms
 * - 支持绕 X、Y、Z 轴旋转
 * - 添加透视效果
 * - 双面卡片显示不同内容
 *
 * 【效果说明】
 * 演示如何使用 CSS 3D transforms 创建旋转效果。
 * 关键是设置 perspective 和 transformStyle。
 */

export const RotatingCard = () => {
  const frame = useCurrentFrame();

  // Y 轴旋转
  const rotateY = interpolate(frame, [0, 150], [0, 360], {
    extrapolateRight: 'loop',
  });

  // X 轴轻微摆动
  const rotateX = interpolate(frame, [0, 150], [0, 20], {
    extrapolateRight: 'loop',
  });

  // Z 轴缩放脉冲
  const scale = interpolate(frame % 60, [0, 30, 60], [1, 1.1, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a2e',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1000, // 3D 透视
      }}
    >
      {/* 3D 卡片容器 */}
      <div
        style={{
          width: 600,
          height: 400,
          position: 'relative',
          transformStyle: 'preserve-3d', // 保持 3D 空间
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transition: 'transform 0.1s',
        }}
      >
        {/* 卡片正面 */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden', // 背面不可见
            backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: 20,
            }}
          >
            正面
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#ffffff',
              opacity: 0.9,
            }}
          >
            3D 旋转效果
          </div>
        </div>

        {/* 卡片背面 */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'rotateY(180deg)', // 背面旋转 180 度
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: 20,
            }}
          >
            背面
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#ffffff',
              opacity: 0.9,
            }}
          >
            使用 rotateY
          </div>
        </div>
      </div>

      {/* 说明文字 */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
                          fontSize: 32,
          color: '#888',
          textAlign: 'center',
        }}
      >
        使用 CSS 3D transforms 创建旋转效果
      </div>
    </AbsoluteFill>
  );
};
