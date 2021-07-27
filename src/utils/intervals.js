export default function getTimeInterval(
  currentFrameIndex = 0,
  totalFrames = 1
) {
  const equalPercentage = 100 / (totalFrames || 1);
  return totalFrames === 1 || totalFrames === 0
    ? 100
    : Math.round((currentFrameIndex + 1) * equalPercentage * 10) / 10;
}
