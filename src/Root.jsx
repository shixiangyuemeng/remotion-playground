import {Composition} from 'remotion';
import {Welcome} from './compositions/Welcome';

// 原有效果
import {FadeInFadeOut} from './compositions/TextAnimations/FadeInFadeOut';
import {Typewriter} from './compositions/TextAnimations/Typewriter';
import {WordByWord} from './compositions/TextAnimations/WordByWord';
import {ColorCycle} from './compositions/TextAnimations/ColorCycle';

import {SlideTransition} from './compositions/Transitions/SlideTransition';
import {ScaleTransition} from './compositions/Transitions/ScaleTransition';
import {RotateTransition} from './compositions/Transitions/RotateTransition';
import {Dissolve} from './compositions/Transitions/Dissolve';

import {ProgressBar} from './compositions/DataViz/ProgressBar';
import {BarChart} from './compositions/DataViz/BarChart';
import {CircularProgress} from './compositions/DataViz/CircularProgress';
import {CounterAnimation} from './compositions/DataViz/CounterAnimation';
import {LineChart} from './compositions/DataViz/LineChart';

import {RotatingCard} from './compositions/ThreeD/RotatingCard';
import {ThreeDFlip} from './compositions/ThreeD/ThreeDFlip';
import {MouseFollow} from './compositions/ThreeD/MouseFollow';
import {Parallax} from './compositions/ThreeD/Parallax';
import {SpringPhysics} from './compositions/ThreeD/SpringPhysics';

import {AudioWaveform} from './compositions/Audio/AudioWaveform';
import {AudioSpectrum} from './compositions/Audio/AudioSpectrum';
import {BeatDetection} from './compositions/Audio/BeatDetection';
import {VolumeControl} from './compositions/Audio/VolumeControl';

// ✨ 新增效果
import {StarrySky} from './compositions/Particles/StarrySky';
import {PathDraw} from './compositions/PathAnimations/PathDraw';
import {Spinners} from './compositions/LoadingAnimations/Spinners';
import {NeonText} from './compositions/TextEffects/NeonText';
import {Wave} from './compositions/WaveAnimations/Wave';
import {CardDeck} from './compositions/CardEffects/CardDeck';
import {TypingDelete} from './compositions/TypingEffects/TypingDelete';
import {AnalogClock} from './compositions/ClockAnimations/AnalogClock';

// 📺 素材使用示例
import {ImageSlideshow} from './compositions/MediaExamples/ImageSlideshow';
import {VideoOverlay} from './compositions/MediaExamples/VideoOverlay';
import {MediaFromURL} from './compositions/MediaExamples/MediaFromURL';

export const RemotionRoot = () => {
  return (
    <>
      {/* Welcome */}
      <Composition id="Welcome" component={Welcome} durationInFrames={180} fps={30} width={1920} height={1080} defaultProps={{title: 'Remotion Playground'}} />

      {/* 文字动画 */}
      <Composition id="FadeInFadeOut" component={FadeInFadeOut} durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="Typewriter" component={Typewriter} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="WordByWord" component={WordByWord} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="ColorCycle" component={ColorCycle} durationInFrames={180} fps={30} width={1920} height={1080} />

      {/* 过渡动画 */}
      <Composition id="SlideTransition" component={SlideTransition} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="ScaleTransition" component={ScaleTransition} durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="RotateTransition" component={RotateTransition} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="Dissolve" component={Dissolve} durationInFrames={120} fps={30} width={1920} height={1080} />

      {/* 数据可视化 */}
      <Composition id="ProgressBar" component={ProgressBar} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="BarChart" component={BarChart} durationInFrames={200} fps={30} width={1920} height={1080} />
      <Composition id="CircularProgress" component={CircularProgress} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="CounterAnimation" component={CounterAnimation} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="LineChart" component={LineChart} durationInFrames={200} fps={30} width={1920} height={1080} />

      {/* 3D 交互 */}
      <Composition id="RotatingCard" component={RotatingCard} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="ThreeDFlip" component={ThreeDFlip} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="MouseFollow" component={MouseFollow} durationInFrames={200} fps={30} width={1920} height={1080} />
      <Composition id="Parallax" component={Parallax} durationInFrames={200} fps={30} width={1920} height={1080} />
      <Composition id="SpringPhysics" component={SpringPhysics} durationInFrames={180} fps={30} width={1920} height={1080} />

      {/* 音频响应 */}
      <Composition id="AudioWaveform" component={AudioWaveform} durationInFrames={300} fps={30} width={1920} height={1080} />
      <Composition id="AudioSpectrum" component={AudioSpectrum} durationInFrames={300} fps={30} width={1920} height={1080} />
      <Composition id="BeatDetection" component={BeatDetection} durationInFrames={300} fps={30} width={1920} height={1080} />
      <Composition id="VolumeControl" component={VolumeControl} durationInFrames={300} fps={30} width={1920} height={1080} />

      {/* ✨ 新增效果 */}
      <Composition id="StarrySky" component={StarrySky} durationInFrames={300} fps={30} width={1920} height={1080} />
      <Composition id="PathDraw" component={PathDraw} durationInFrames={300} fps={30} width={1920} height={1080} />
      <Composition id="Spinners" component={Spinners} durationInFrames={300} fps={30} width={1920} height={1080} />
      <Composition id="NeonText" component={NeonText} durationInFrames={240} fps={30} width={1920} height={1080} />
      <Composition id="Wave" component={Wave} durationInFrames={300} fps={30} width={1920} height={1080} />
      <Composition id="CardDeck" component={CardDeck} durationInFrames={240} fps={30} width={1920} height={1080} />
      <Composition id="TypingDelete" component={TypingDelete} durationInFrames={600} fps={30} width={1920} height={1080} />
      <Composition id="AnalogClock" component={AnalogClock} durationInFrames={900} fps={30} width={1920} height={1080} />

      {/* 📺 素材使用示例 */}
      <Composition id="ImageSlideshow" component={ImageSlideshow} durationInFrames={270} fps={30} width={1920} height={1080} />
      <Composition id="VideoOverlay" component={VideoOverlay} durationInFrames={300} fps={30} width={1920} height={1080} />
      <Composition id="MediaFromURL" component={MediaFromURL} durationInFrames={300} fps={30} width={1920} height={1080} />
    </>
  );
};
