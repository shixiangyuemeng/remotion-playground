import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setPixelFormat('yuv420p');
Config.setCodec('h264');

// 设置默认浏览器
Config.setBrowserExecutable(null);

// 并行渲染
Config.setConcurrency(null);

// 日志级别
Config.setLogLevel('info');
