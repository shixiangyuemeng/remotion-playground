# 视频素材目录

将你的视频文件放在这个目录下。

## 使用方法

```jsx
import {Video, OffthreadVideo, staticFile} from 'remotion';

// 开发时使用 Video（快速预览）
<Video
  src={staticFile('/videos/your-video.mp4')}
  style={{width: '100%'}}
/>

// 渲染时使用 OffthreadVideo（性能更好）
<OffthreadVideo
  src={staticFile('/videos/your-video.mp4')}
  style={{width: '100%'}}
/>
```

## 支持的格式

- MP4（推荐，H.264 编码）
- WebM
- MOV

## 推荐的视频设置

- 分辨率: 1920x1080 (Full HD) 或更高
- 编码: H.264
- 帧率: 30fps 或 60fps
- 码率: 5-10 Mbps

## 免费视频素材网站

- Pexels Videos: https://pexels.com/videos/
- Pixabay Videos: https://pixabay.com/videos/
- Coverr: https://coverr.co
