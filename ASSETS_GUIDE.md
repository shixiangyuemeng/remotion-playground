# Remotion 素材使用完整指南

## 📁 项目素材目录结构

```
remotion-playground/
├── public/                      # 静态资源目录（素材放这里）
│   ├── images/                  # 图片文件夹
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   ├── logo.png
│   │   └── background.jpg
│   ├── videos/                  # 视频文件夹
│   │   ├── background.mp4
│   │   ├── intro.mp4
│   │   └── pip.mp4
│   ├── music/                   # 音频文件夹
│   │   ├── background.mp3
│   │   ├── effect.wav
│   │   └── voiceover.mp3
│   └── index.html
├── src/
│   └── compositions/
│       └── MediaExamples/       # 素材使用示例
└── ASSETS_GUIDE.md             # 本文件
```

## 🖼️ 使用图片素材

### 1. 本地图片（推荐）

```jsx
import {Img, staticFile} from 'remotion';

// 方式1: 使用 Img 组件（推荐）
<Img
  src={staticFile('/images/photo.jpg')}
  style={{width: '100%', objectFit: 'cover'}}
/>

// 方式2: 使用普通 img 标签
<img
  src={staticFile('/images/photo.jpg')}
  style={{width: '100%'}}
/>

// 方式3: 相对路径（不推荐，可能有兼容性问题）
<img src="/images/photo.jpg" />
```

### 2. 网络图片

```jsx
// 直接使用 URL
<img src="https://images.unsplash.com/photo-xxx?w=800" />

// 或者使用 Unsplash API
<img src={`https://source.unsplash.com/1920x1080/?nature`} />
```

### 3. 最佳实践

```jsx
const MyImage = () => {
  return (
    <div style={{position: 'relative'}}>
      {/* 使用 Img 组件获得更好的性能 */}
      <Img
        src={staticFile('/images/my-photo.jpg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',  // 关键：控制图片填充方式
          objectPosition: 'center',  // 对齐方式
        }}
      />

      {/* 叠加层 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)'
      }} />
    </div>
  );
};
```

## 🎬 使用视频素材

### 1. Video 组件（实时预览）

```jsx
import {Video, staticFile} from 'remotion';

<Video
  src={staticFile('/videos/my-video.mp4')}
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }}
/>
```

**适用场景：**
- 开发调试时
- 短视频（< 10 秒）
- 需要快速预览

### 2. OffthreadVideo 组件（离线渲染）

```jsx
import {OffthreadVideo, staticFile} from 'remotion';

<OffthreadVideo
  src={staticFile('/videos/my-video.mp4')}
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }}
/>
```

**适用场景：**
- 渲染最终视频时
- 长视频（> 10 秒）
- 需要更好的性能
- 4K 或高分辨率视频

### 3. 视频属性

```jsx
<Video
  src={staticFile('/video.mp4')}
  muted={false}           // 是否静音
  startFrom={0}           // 从第几秒开始
  endAt={10}              // 在第几秒结束
  playbackRate={1}        // 播放速度（0.5 = 慢一半，2 = 快一倍）
  style={{...}}
/>
```

## 🎵 使用音频素材

### 1. 背景音乐

```jsx
import {Audio, staticFile} from 'remotion';

<Audio
  src={staticFile('/music/background.mp3')}
  muted={false}
  volume={1}  // 音量（0-1）
/>
```

### 2. 音频可视化

```jsx
import {useAudioData, visualizeAudio} from 'remotion';
import {Audio} from 'remotion';

const AudioVisualizer = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  return (
    <>
      <Audio src={staticFile('/music/music.mp3')} />
      <AudioVizFrame frame={frame} fps={fps} />
    </>
  );
};

const AudioVizFrame = ({frame, fps}) => {
  const audioData = useAudioData();

  if (!audioData) {
    return null;
  }

  // 获取音频数据
  const amplitude = visualizeAudio({
    audioData,
    frame,
    fps,
    numberOfSamples: 32,  // 采样数（必须是 2 的幂）
  });

  return (
    <div style={{display: 'flex', gap: 5}}>
      {amplitude.map((amp, i) => (
        <div
          key={i}
          style={{
            height: amp * 200,  // 振幅高度
            width: 20,
            backgroundColor: '#3498db',
          }}
        />
      ))}
    </div>
  );
};
```

## 🌐 从网络加载素材

### 图片示例

```jsx
// Unsplash（免费高质量图片）
const images = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920',
];

// 使用
<img src={images[0]} alt="风景" />
```

### 视频示例

```jsx
// Pexels（免费视频）
const videos = [
  'https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcab73e525c4481c876d9111145099c83939&profile_id=164&oauth2_token_id=57447761',
];

// 使用
<Video src={videos[0]} />
```

## 📦 素材格式支持

### 图片格式
- ✅ JPG / JPEG
- ✅ PNG
- ✅ GIF
- ✅ SVG
- ✅ WebP
- ✅ BMP

### 视频格式
- ✅ MP4（推荐，H.264 编码）
- ✅ WebM
- ✅ MOV
- ⚠️ AVI（可能需要转换）

### 音频格式
- ✅ MP3
- ✅ WAV
- ✅ AAC
- ✅ OGG
- ✅ M4A

## 🎨 图片 objectFit 属性

```jsx
// cover: 填满整个容器（可能裁剪）
<img style={{objectFit: 'cover'}} />

// contain: 完整显示图片（可能有留白）
<img style={{objectFit: 'contain'}} />

// fill: 拉伸填满（可能变形）
<img style={{objectFit: 'fill'}} />

// none: 原始尺寸
<img style={{objectFit: 'none'}} />

// scale-down: 缩小到合适尺寸
<img style={{objectFit: 'scale-down'}} />
```

## ⚡ 性能优化技巧

### 1. 预加载素材

```jsx
// 在组件外部预加载
const preloadedImage = new Image();
preloadedImage.src = staticFile('/images/large-image.jpg');

const MyComponent = () => {
  return <Img src={staticFile('/images/large-image.jpg')} />;
};
```

### 2. 使用适当的质量

```jsx
// 开发时使用低质量图片加速预览
const isDevelopment = process.env.NODE_ENV === 'development';

<Img
  src={staticFile(`/images/photo${isDevelopment ? '-low' : ''}.jpg`)}
/>
```

### 3. 视频截取

```jsx
// 只使用需要的片段
<OffthreadVideo
  src={staticFile('/long-video.mp4')}
  startFrom={10}  // 从第 10 秒开始
  endAt={20}       // 到第 20 秒结束
/>
```

## 🔍 常见问题

### Q1: 素材路径找不到？

**A:** 确保素材在 `public/` 目录下，并使用 `staticFile()` 函数：

```jsx
// ✅ 正确
<Img src={staticFile('/images/photo.jpg')} />

// ❌ 错误
<Img src="./public/images/photo.jpg" />
<Img src={'/images/photo.jpg'} />
```

### Q2: 视频预览很慢？

**A:** 使用 `OffthreadVideo` 代替 `Video`：

```jsx
// 渲染时使用 OffthreadVideo
const isRendering = /* 判断是否在渲染 */;

return isRendering
  ? <OffthreadVideo src={...} />
  : <Video src={...} />;
```

### Q3: 如何从视频截图？

**A:** Remotion 会自动处理，或者使用工具：

```bash
# 使用 ffmpeg
ffmpeg -i video.mp4 -ss 00:00:05 -vframes 1 thumbnail.jpg
```

### Q4: 音频不同步？

**A:** 确保 Audio 组件在根级别，并且 fps 设置正确：

```jsx
<Audio src={staticFile('/music.mp3')} />
<Video fps={30} />  // 确保 fps 一致
```

## 📚 推荐素材网站

### 免费图片
- [Unsplash](https://unsplash.com) - 高质量摄影
- [Pexels](https://pexels.com) - 图片和视频
- [Pixabay](https://pixabay.com) - 多种素材
- [Burst](https://burst.shopify.com) - 免费商用图片

### 免费视频
- [Pexels Videos](https://pexels.com/videos/)
- [Pixabay Videos](https://pixabay.com/videos/)
- [Coverr](https://coverr.co)

### 免费音频
- [FreeSound](https://freesound.org)
- [Zapsplat](https://zapsplat.com)
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)

## 🚀 下一步

1. 在 `public/` 目录创建 `images/` 和 `videos/` 文件夹
2. 添加一些测试素材
3. 查看 `src/compositions/MediaExamples/` 中的示例
4. 尝试创建自己的视频项目！

---

💡 **提示**: 就像 Flash 一样，Remotion 让你用代码创作视频。但现在用的是 React 和现代技术！
