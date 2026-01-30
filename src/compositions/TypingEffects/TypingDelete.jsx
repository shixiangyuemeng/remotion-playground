import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

/**
 * 【中文提示词】
 * 创建一个打字机+删除动画效果，要求：
 * - 文字逐字打出
 - 停顿后逐字删除
 - 循环播放多个句子
 - 光标闪烁效果
 - 打字机音效提示
 *
 * 【效果说明】
 * 演示如何创建打字机删除循环效果。
 * 使用 frame 计算控制文字的添加和删除。
 */

export const TypingDelete = () => {
  const frame = useCurrentFrame();

  const sentences = [
    '欢迎来到 Remotion Playground',
    '探索无限动画可能',
    '创建令人惊叹的视频',
    '让代码动起来',
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1e1e1e',
        fontFamily: 'Courier New, monospace',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 背景装饰 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(90deg, rgba(52, 152, 219, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(52, 152, 219, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* 打字机效果 */}
      <TypingAnimation sentences={sentences} frame={frame} />

      {/* 标题 */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          fontSize: 48,
          fontWeight: 'bold',
          color: '#3498db',
        }}
      >
        打字机删除循环
      </div>

      {/* 说明 */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          fontSize: 24,
          color: '#888',
        }}
      >
        使用帧计算控制文字的添加和删除
      </div>
    </AbsoluteFill>
  );
};

const TypingAnimation = ({sentences, frame}) => {
  // 每个字符的帧数
  const charSpeed = 3;
  const pauseDuration = 60; // 打完后的停顿帧数
  const deleteSpeed = 2; // 删除速度

  // 计算当前应该显示的句子和文字
  let totalChars = 0;
  let currentSentenceIndex = 0;
  let currentText = '';
  let isDeleting = false;
  let showCursor = true;

  // 计算当前帧在哪个句子
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const typeFrames = sentence.length * charSpeed;
    const deleteFrames = sentence.length * deleteSpeed;

    if (frame < totalChars + typeFrames) {
      // 正在打字
      currentSentenceIndex = i;
      const charsTyped = Math.floor((frame - totalChars) / charSpeed);
      currentText = sentence.slice(0, charsTyped + 1);
      break;
    } else if (frame < totalChars + typeFrames + pauseDuration) {
      // 停顿
      currentSentenceIndex = i;
      currentText = sentence;
      break;
    } else if (frame < totalChars + typeFrames + pauseDuration + deleteFrames) {
      // 删除
      currentSentenceIndex = i;
      isDeleting = true;
      const deleteProgress = frame - (totalChars + typeFrames + pauseDuration);
      const charsDeleted = Math.floor(deleteProgress / deleteSpeed);
      currentText = sentence.slice(0, sentence.length - charsDeleted);
      break;
    }

    totalChars += typeFrames + pauseDuration + deleteFrames;
  }

  // 光标闪烁
  const cursorOpacity = interpolate(frame % 30, [0, 15, 30], [1, 0, 1], {
    extrapolateRight: 'clamp',
  });

  // 文字颜色循环
  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12'];
  const color = colors[currentSentenceIndex % colors.length];

  return (
    <div
      style={{
        fontSize: 64,
        fontWeight: 'bold',
        color: color,
        textAlign: 'center',
        maxWidth: 1400,
        minHeight: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textShadow: `0 0 20px ${color}80`,
      }}
    >
      {currentText}
      <span
        style={{
          display: 'inline-block',
          width: 4,
          height: 64,
          backgroundColor: color,
          marginLeft: 8,
          opacity: cursorOpacity,
          animation: 'blink 1s step-end infinite',
        }}
      >
        |
      </span>
    </div>
  );
};
