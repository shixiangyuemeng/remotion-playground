# 音频素材目录

将你的音频文件放在这个目录下。

## 使用方法

```jsx
import {Audio, staticFile} from 'remotion';

<Audio
  src={staticFile('/music/your-music.mp3')}
  volume={1}
  muted={false}
/>
```

## 支持的格式

- MP3（推荐）
- WAV
- AAC
- OGG
- M4A

## 音频用途

- 背景音乐（Background Music）
- 音效（Sound Effects）
- 旁白（Voiceover）
- 环境音（Ambient Sound）

## 音频可视化

Remotion 支持音频可视化，可以：

- 显示音频波形
- 创建频谱分析
- 根据音频节拍同步动画

## 免费音频素材网站

- FreeSound: https://freesound.org
- Zapsplat: https://zapsplat.com
- YouTube Audio Library: https://www.youtube.com/audiolibrary
- Bensound: https://www.bensound.com
