import {AbsoluteFill, useCurrentFrame, interpolate, spring} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个逐词显示动画，要求：
 * - 文字按单词逐个显示
 * - 每个单词出现时有弹跳效果
 * - 单词从不同角度飞入
 * - 支持中英文混合
 * - 单词之间有适当的间距
 *
 * 【效果说明】
 * 演示如何将句子分割成单词，并逐个显示。
 * 每个单词都有独立的动画时间轴，使用 spring 实现弹跳效果。
 */

export const WordByWord = () => {
  const sentence = '每个单词 都有 独立的 动画 效果';
  const words = sentence.split(' ');
  const delayPerWord = 20; // 每个单词之间的延迟帧数

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#2c3e50',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 30,
          maxWidth: 1600,
        }}
      >
        {words.map((word, index) => (
          <AnimatedWord
            key={index}
            word={word}
            delay={index * delayPerWord}
            index={index}
          />
        ))}
      </div>

      <div
        style={{
          marginTop: 100,
          fontSize: 36,
          color: '#ecf0f1',
          opacity: 0.7,
        }}
      >
        使用 split 和 map 处理单词数组
      </div>
    </AbsoluteFill>
  );
};

const AnimatedWord = ({word, delay, index}) => {
  const frame = useCurrentFrame();

  // Spring 动画
  const springData = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 8,
      stiffness: 80,
      mass: 0.5,
    },
  });

  const scale = springData;
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 每个单词不同的飞入方向
  const directions = [
    {x: -100, y: 0},
    {x: 100, y: 0},
    {x: 0, y: -100},
    {x: 0, y: 100},
    {x: -70, y: -70},
  ];

  const direction = directions[index % directions.length];
  const x = interpolate(springData, [0, 1], [direction.x, 0]);
  const y = interpolate(springData, [0, 1], [direction.y, 0]);

  // 旋转效果
  const rotation = interpolate(springData, [0, 1], [index % 2 === 0 ? -30 : 30, 0]);

  // 不同颜色
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
  const color = colors[index % colors.length];

  return (
    <div
      style={{
        opacity: opacity,
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
        fontSize: 72,
        fontWeight: 'bold',
        color: color,
      }}
    >
      {word}
    </div>
  );
};
