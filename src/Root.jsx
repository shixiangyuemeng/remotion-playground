import {Composition} from 'remotion';
import {Welcome} from './compositions/Welcome.jsx';

// 导入所有文字动画示例
import {FadeInFadeOut} from './compositions/TextAnimations/FadeInFadeOut.jsx';
import {Typewriter} from './compositions/TextAnimations/Typewriter.jsx';
import {WordByWord} from './compositions/TextAnimations/WordByWord.jsx';
import {ColorCycle} from './compositions/TextAnimations/ColorCycle.jsx';

// 导入所有过渡动画示例
import {SlideTransition} from './compositions/Transitions/SlideTransition.jsx';
import {ScaleTransition} from './compositions/Transitions/ScaleTransition.jsx';
import {RotateTransition} from './compositions/Transitions/RotateTransition.jsx';
import {Dissolve} from './compositions/Transitions/Dissolve.jsx';

// 导入所有数据可视化示例
import {ProgressBar} from './compositions/DataViz/ProgressBar.jsx';
import {BarChart} from './compositions/DataViz/BarChart.jsx';
import {CircularProgress} from './compositions/DataViz/CircularProgress.jsx';
import {CounterAnimation} from './compositions/DataViz/CounterAnimation.jsx';
import {LineChart} from './compositions/DataViz/LineChart.jsx';

// 导入所有 3D 和交互示例
import {RotatingCard} from './compositions/ThreeD/RotatingCard.jsx';
import {ThreeDFlip} from './compositions/ThreeD/ThreeDFlip.jsx';
import {MouseFollow} from './compositions/ThreeD/MouseFollow.jsx';
import {Parallax} from './compositions/ThreeD/Parallax.jsx';
import {SpringPhysics} from './compositions/ThreeD/SpringPhysics.jsx';

// 导入所有音频响应示例
import {AudioWaveform} from './compositions/Audio/AudioWaveform.jsx';
import {AudioSpectrum} from './compositions/Audio/AudioSpectrum.jsx';
import {BeatDetection} from './compositions/Audio/BeatDetection.jsx';
import {VolumeControl} from './compositions/Audio/VolumeControl.jsx';

export const RemotionRoot = () => {
  return (
    <>
      {/* 欢迎页面 */}
      <Composition
        id="Welcome"
        component={Welcome}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{title: 'Remotion Playground'}}
      />

      {/* 文字动画系列 */}
      <Composition
        id="FadeInFadeOut"
        component={FadeInFadeOut}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Typewriter"
        component={Typewriter}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="WordByWord"
        component={WordByWord}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="ColorCycle"
        component={ColorCycle}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 过渡动画系列 */}
      <Composition
        id="SlideTransition"
        component={SlideTransition}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="ScaleTransition"
        component={ScaleTransition}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="RotateTransition"
        component={RotateTransition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Dissolve"
        component={Dissolve}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 数据可视化系列 */}
      <Composition
        id="ProgressBar"
        component={ProgressBar}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="BarChart"
        component={BarChart}
        durationInFrames={200}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="CircularProgress"
        component={CircularProgress}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="CounterAnimation"
        component={CounterAnimation}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="LineChart"
        component={LineChart}
        durationInFrames={200}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 3D 和交互系列 */}
      <Composition
        id="RotatingCard"
        component={RotatingCard}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="ThreeDFlip"
        component={ThreeDFlip}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="MouseFollow"
        component={MouseFollow}
        durationInFrames={200}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Parallax"
        component={Parallax}
        durationInFrames={200}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="SpringPhysics"
        component={SpringPhysics}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 音频响应系列 */}
      <Composition
        id="AudioWaveform"
        component={AudioWaveform}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="AudioSpectrum"
        component={AudioSpectrum}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="BeatDetection"
        component={BeatDetection}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="VolumeControl"
        component={VolumeControl}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
