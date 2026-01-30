# Remotion Playground - 完整动画效果展示

> 一个全面的 Remotion 动画效果展示平台，包含 24 个精心设计的动画示例，涵盖文字动画、过渡效果、数据可视化、3D 交互和音频响应。

## 📚 目录

- [项目介绍](#项目介绍)
- [从 0 到 1：完整教程](#从-0-到-1完整教程)
- [快速开始](#快速开始)
- [效果展示](#效果展示)
- [核心概念](#核心概念)
- [常用 API](#常用-api)
- [进阶技巧](#进阶技巧)
- [常见问题](#常见问题)
- [资源链接](#资源链接)

---

## 项目介绍

Remotion 是一个使用 React 创建视频的框架。本项目是一个完整的 Playground，展示了 Remotion 的各种动画效果和交互方式。

### 包含的动画类型

- **文字动画（5个）**：淡入淡出、打字机、逐词显示、颜色循环
- **过渡动画（4个）**：滑动、缩放、旋转、溶解
- **数据可视化（5个）**：进度条、柱状图、圆形进度、数字计数、折线图
- **3D 交互（5个）**：3D 旋转、3D 翻转、鼠标跟随、视差滚动、弹性物理
- **音频响应（4个）**：波形、频谱、节拍检测、音量控制

---

## 从 0 到 1：完整教程

### 第一步：理解 Remotion 是什么

Remotion 是一个让你用 React 代码创建视频的框架。你可以：
- 使用熟悉的 React 组件和 hooks
- 利用 CSS 和 JavaScript 创建动画
- 精确控制每一帧的内容
- 渲染成高质量视频（MP4、GIF 等）

### 第二步：环境准备

#### 1. 安装 Node.js

确保你的电脑安装了 Node.js（推荐 18.x 或更高版本）：

```bash
# 检查 Node.js 版本
node -v
# 应该输出 v18.x.x 或更高
```

如果没有安装，访问 [nodejs.org](https://nodejs.org/) 下载安装。

#### 2. 安装依赖

本项目依赖以下核心包：
- `remotion` - Remotion 核心库
- `react` - React 框架
- `react-dom` - React DOM 渲染器

### 第三步：创建你的第一个 Remotion 项目

#### 方法 1：使用官方脚手架（推荐新手）

```bash
# 使用 Remotion 脚手架创建项目
npx create-video@latest my-video

# 进入项目目录
cd my-video

# 启动开发服务器
npm start
```

#### 方法 2：手动创建（适合学习）

```bash
# 1. 创建项目目录
mkdir my-remotion-project
cd my-remotion-project

# 2. 初始化 npm
npm init -y

# 3. 安装依赖
npm install remotion react react-dom

# 4. 创建项目结构
mkdir -p src/compositions
```

### 第四步：理解项目结构

一个标准的 Remotion 项目结构：

```
my-remotion-project/
├── src/
│   ├── Root.jsx          # 根组件，定义所有 compositions
│   └── compositions/     # 动画组件
│       └── MyVideo.jsx   # 你的视频组件
├── public/               # 静态资源
├── package.json          # 项目配置
└── README.md
```

### 第五步：创建你的第一个视频组件

#### 1. 创建 Root.jsx

这是 Remotion 的入口文件，定义所有可用的视频：

```jsx
// src/Root.jsx
import {Composition} from 'remotion';
import {MyFirstVideo} from './compositions/MyFirstVideo';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MyFirstVideo"           // 视频的唯一标识
        component={MyFirstVideo}    // 使用的组件
        durationInFrames={150}      // 视频长度（帧数）
        fps={30}                    // 帧率
        width={1920}                // 宽度
        height={1080}               // 高度
      />
    </>
  );
};
```

#### 2. 创建视频组件

```jsx
// src/compositions/MyFirstVideo.jsx
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

export const MyFirstVideo = () => {
  const frame = useCurrentFrame(); // 获取当前帧

  // 文字从左到右移动
  const x = interpolate(frame, [0, 150], [0, 1920]);

  // 文字淡入淡出
  const opacity = interpolate(frame, [0, 30, 120, 150], [0, 1, 1, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a2e',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: 'bold',
          color: '#ffffff',
          transform: `translateX(${x}px)`,
          opacity: opacity,
        }}
      >
        你好，Remotion！
      </div>
    </AbsoluteFill>
  );
};
```

#### 3. 配置入口文件

在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "start": "remotion studio",
    "build": "remotion render"
  }
}
```

#### 4. 创建配置文件

创建 `remotion.config.ts`：

```ts
import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
```

#### 5. 设置 HTML 入口

创建 `public/index.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Remotion Video</title>
</head>
<body>
  <div id="root"></div>
  <script src="./src/index.jsx" type="module"></script>
</body>
</html>
```

#### 6. 创建 React 入口

创建 `src/index.jsx`：

```jsx
import {registerRoot} from 'remotion';
import {RemotionRoot} from './Root';

registerRoot(RemotionRoot);
```

### 第六步：启动开发服务器

```bash
npm start
```

浏览器会自动打开 `http://localhost:3000`，你将看到：
- 左侧：所有可用的 compositions 列表
- 右侧：视频预览窗口
- 底部：时间轴控制

### 第七步：制作一个高质量的动画视频

#### 1. 规划你的视频

在开始编码前，先规划：
- **时长**：多少秒？（例如：5秒 = 150帧 @ 30fps）
- **内容**：要展示什么？
- **风格**：颜色、字体、动画类型

#### 2. 使用时间轴工具

Remotion 的时间轴是关键工具：
- **帧数**：从 0 开始
- **当前帧**：`useCurrentFrame()` hook 获取
- **fps**：每秒帧数（通常 30 或 60）

#### 3. 掌握核心 Hooks

##### useCurrentFrame()

```jsx
const frame = useCurrentFrame(); // 0, 1, 2, 3, ...
```

##### useVideoConfig()

```jsx
const {fps, width, height, durationInFrames} = useVideoConfig();
```

##### interpolate()

最重要的动画函数：

```jsx
// 在不同帧之间插值
const value = interpolate(frame, [0, 30], [0, 1]);

// 带限制
const x = interpolate(frame, [0, 100], [0, 500], {
  extrapolateRight: 'clamp', // 不超过 500
});

// 循环
const rotation = interpolate(frame % 60, [0, 60], [0, 360]);
```

##### spring()

弹性动画效果：

```jsx
const scale = spring({
  frame: frame - delay,
  fps: 30,
  config: {
    damping: 10,    // 阻尼（越小弹跳越多）
    stiffness: 100, // 刚度（越大越快）
    mass: 1,        // 质量（越大越重）
  },
});
```

#### 4. 创建分层动画

使用 `<Sequence>` 组织时间轴：

```jsx
<Sequence from={0} durationInFrames={90}>
  <FirstScene />
</Sequence>

<Sequence from={90} durationInFrames={60}>
  <SecondScene />
</Sequence>
```

#### 5. 添加过渡效果

```jsx
// 淡入淡出
const opacity = interpolate(frame, [0, 30], [0, 1]);

// 滑动
const x = interpolate(frame, [0, 30], [-1920, 0]);

// 缩放
const scale = spring({frame, fps: 30, config: {stiffness: 100}});

// 旋转
const rotate = interpolate(frame, [0, 60], [0, 360]);
```

#### 6. 使用 CSS 动画

```jsx
<div
  style={{
    transition: 'all 0.3s ease',
    transform: `scale(${scale})`,
    opacity: opacity,
  }}
>
  内容
</div>
```

### 第八步：渲染和导出视频

#### 1. 预览和调试

在开发服务器中：
- 点击播放按钮预览
- 拖动时间轴到特定帧
- 检查每一帧的渲染效果

#### 2. 渲染视频

```bash
# 渲染为 MP4
npm run build

# 或者使用 Remotion CLI
npx remotion render MyFirstVideo out/video.mp4

# 指定参数
npx remotion render MyFirstVideo out/video.mp4 \
  --frames=0-150 \
  --jpeg-quality=90
```

#### 3. 优化渲染质量

```jsx
// 在 remotion.config.ts 中
Config.setVideoImageFormat('jpeg');
Config.setPixelFormat('yuv420p');
Config.setCodec('h264');
```

### 第九步：高级技巧

#### 1. 使用音频

```jsx
import {Audio, useAudioData} from 'remotion';

export const MyVideo = () => {
  return (
    <>
      <Audio src="/music.mp3" />
      <VisualContent />
    </>
  );
};
```

#### 2. 音频可视化

```jsx
import {useAudioData, visualizeAudio} from 'remotion';

export const AudioVisualizer = () => {
  const audioData = useAudioData();

  if (!audioData) {
    return null;
  }

  return (
    <div>
      {visualizeAudio({
        audioData,
        frame: useCurrentFrame(),
        fps: 30,
      }).map((v, i) => (
        <div key={i} style={{height: v * 100}} />
      ))}
    </div>
  );
};
```

#### 3. 使用静态资源

```jsx
import {staticFile} from 'remotion';

<img src={staticFile('images/logo.png')} />
```

#### 4. 3D 效果

```jsx
<div
  style={{
    transform: `rotateX(${x}deg) rotateY(${y}deg)`,
    transformStyle: 'preserve-3d',
    perspective: 1000,
  }}
>
  3D 内容
</div>
```

### 第十步：性能优化

#### 1. 避免重复计算

```jsx
// ❌ 不好
export const MyComp = () => {
  const frame = useCurrentFrame();
  return <div style={{opacity: expensiveFunc(frame)}} />;
};

// ✅ 好
const memoizedValue = useMemo(() => expensiveFunc(frame), [frame]);
```

#### 2. 使用 useMemo

```jsx
const animatedValue = useMemo(() => {
  return interpolate(frame, [0, 30], [0, 1]);
}, [frame]);
```

#### 3. 避免过度渲染

```jsx
const MemoizedComponent = React.memo(({value}) => {
  return <div>{value}</div>;
});
```

---

## 快速开始

### 安装

```bash
# 克隆或下载本项目
cd ~/Desktop/remotion-playground

# 安装依赖（如果还没有安装）
npm install
```

### 运行

```bash
# 启动开发服务器
npm start
```

访问 `http://localhost:3000` 查看所有动画示例。

---

## 效果展示

### 文字动画

| 效果 | 描述 | 关键 API |
|------|------|----------|
| FadeInFadeOut | 淡入淡出 | `interpolate` + `opacity` |
| Typewriter | 打字机效果 | `frame` + `slice` |
| WordByWord | 逐词显示 | `map` + `spring` |
| ColorCycle | 颜色循环 | `hsl` + `interpolate` |

### 过渡动画

| 效果 | 描述 | 关键 API |
|------|------|----------|
| SlideTransition | 滑动切换 | `translate` + `Sequence` |
| ScaleTransition | 缩放过渡 | `scale` + `spring` |
| RotateTransition | 旋转切换 | `rotate` + `interpolate` |
| Dissolve | 溶解效果 | `opacity` + `Sequence` |

### 数据可视化

| 效果 | 描述 | 关键 API |
|------|------|----------|
| ProgressBar | 进度条 | `spring` + `width` |
| BarChart | 柱状图 | `svg` + `spring` |
| CircularProgress | 圆形进度 | `stroke-dashoffset` |
| CounterAnimation | 数字计数 | `interpolate` + `Math.round` |
| LineChart | 折线图 | `svg path` + `stroke-dasharray` |

### 3D 交互

| 效果 | 描述 | 关键 API |
|------|------|----------|
| RotatingCard | 3D 旋转卡片 | `rotateY` + `perspective` |
| ThreeDFlip | 3D 翻转 | `rotateX` + `spring` |
| MouseFollow | 鼠标跟随 | `interpolate` + `Math.sin` |
| Parallax | 视差滚动 | 多层 `translate` |
| SpringPhysics | 弹性物理 | `spring` 配置参数 |

### 音频响应

| 效果 | 描述 | 关键 API |
|------|------|----------|
| AudioWaveform | 音频波形 | `Math.sin` + 模拟数据 |
| AudioSpectrum | 音频频谱 | 频率分布 + 镜像布局 |
| BeatDetection | 节拍检测 | BPM 计算 + 脉冲效果 |
| VolumeControl | 音量控制 | `interpolate` + 音量条 |

---

## 核心概念

### 帧（Frames）

Remotion 中的一切都是基于帧的：
- 30 fps = 每秒 30 帧
- 60 fps = 每秒 60 帧
- 使用 `useCurrentFrame()` 获取当前帧号

### Composition

Composition 是一个独立的视频单元：
```jsx
<Composition
  id="MyVideo"
  component={MyComponent}
  durationInFrames={150}  // 5秒 @ 30fps
  fps={30}
  width={1920}
  height={1080}
/>
```

### 时间控制

- `useCurrentFrame()` - 当前帧
- `Sequence` - 时间序列
- `interpolate()` - 值插值
- `spring()` - 弹性动画

---

## 常用 API

### interpolate()

在两个值之间插值：

```jsx
const x = interpolate(
  frame,           // 当前帧
  [0, 30, 60],     // 输入帧
  [0, 0.5, 1],     // 输出值
  {
    extrapolateRight: 'clamp',  // 限制最大值
    extrapolateLeft: 'clamp',   // 限制最小值
  }
);
```

### spring()

创建弹性动画：

```jsx
const scale = spring({
  frame,
  fps: 30,
  config: {
    damping: 10,     // 阻尼：越小弹跳越多
    stiffness: 100,  // 刚度：越大越快
    mass: 1,         // 质量：越大越重
  },
});
```

### Sequence()

时间序列组件：

```jsx
<Sequence from={30} durationInFrames={60}>
  {/* 这个组件只在第 30-90 帧显示 */}
  <MyComponent />
</Sequence>
```

### AbsoluteFill()

全屏容器：

```jsx
<AbsoluteFill style={{backgroundColor: 'red'}}>
  {/* 内容占满整个屏幕 */}
</AbsoluteFill>
```

---

## 进阶技巧

### 1. 使用 CSS 变换

```jsx
<div
  style={{
    transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`,
  }}
>
  内容
</div>
```

### 2. 创建可复用的动画组件

```jsx
const AnimatedText = ({text, delay}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return <div style={{opacity}}>{text}</div>;
};
```

### 3. 组合多个动画

```jsx
const x = interpolate(frame, [0, 60], [0, 100]);
const y = spring({frame, fps: 30});
const rotate = interpolate(frame, [0, 60], [0, 360]);

return (
  <div style={{transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`}}>
    内容
  </div>
);
```

### 4. 使用 SVG 创建复杂图形

```jsx
<svg width="100%" height="100%">
  <path
    d={pathData}
    stroke="white"
    strokeWidth="3"
    fill="none"
  />
</svg>
```

---

## 常见问题

### Q: 如何调整视频长度？

A: 修改 `durationInFrames`：
```jsx
<Composition
  durationInFrames={300}  // 10秒 @ 30fps
  ...
/>
```

### Q: 如何改变视频尺寸？

A: 修改 `width` 和 `height`：
```jsx
<Composition
  width={1920}
  height={1080}
  ...
/>
```

### Q: 如何添加背景音乐？

A: 使用 `<Audio>` 组件：
```jsx
<Audio src="/music.mp3" />
```

### Q: 动画太卡怎么办？

A: 尝试以下优化：
- 减少 DOM 元素数量
- 使用 `React.memo` 避免重渲染
- 使用 `useMemo` 缓存计算结果
- 降低 fps 或分辨率

### Q: 如何导出高质量视频？

A: 在 `remotion.config.ts` 中配置：
```ts
Config.setVideoImageFormat('jpeg');
Config.setPixelFormat('yuv420p');
Config.setCodec('h264');
```

---

## 资源链接

- [Remotion 官方文档](https://www.remotion.dev/docs)
- [Remotion GitHub](https://github.com/remotion-dev/remotion)
- [Remotion Discord 社区](https://discord.gg/6VdNDdDqVy)
- [Remotion 示例画廊](https://www.remotion.dev/gallery)

---

## 许可证

MIT License - 自由使用和修改

---

**提示**: 每个动画组件的顶部都有详细的中文提示词，你可以直接复制使用，快速创建类似的动画效果！
