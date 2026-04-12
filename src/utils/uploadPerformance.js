import { logPerformance } from './log';

let tryTimes = 0;

export default function upload() {
  if (window.performance) {
    const timing = performance.timing || {};
    const endTime = timing.domContentLoadedEventEnd;
    if (!endTime && tryTimes === 0) {
      logPerformance({
        method: 'performance 0',
        timeOrigin: performance.timeOrigin,
        timing,
      });
    }
    if (!endTime && tryTimes < 10) {
      tryTimes += 1;
      setTimeout(() => {
        upload();
      }, 1000);
      return;
    }
    const domLoadTime = endTime - timing.requestStart;
    logPerformance({
      method: 'performance 1',
      over2000: domLoadTime > 2000,
      domLoadTime,
      timeOrigin: performance.timeOrigin,
      timing,
    });
  }
}
