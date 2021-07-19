export default function getTimeInterval(currentFrameIndex, totalFrames) {
  const equalPercentage = 100 / totalFrames;
  return totalFrames === 1
    ? 100
    : Math.round((currentFrameIndex + 1) * equalPercentage * 10) / 10;
}
